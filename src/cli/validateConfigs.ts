import {
	AddAssociatedFieldConfig,
	AddConfig,
	AddInputConfig,
	AddOrEditOrRemoveAssociatedFieldConfig,
	EditConfig,
	EditInputConfig,
	FilterFieldConfig,
	GetAssociatedFieldConfig,
	GetConfig,
	OutputPrimaryFieldsConfig,
	InputPrimaryFieldsConfig,
	SortByFieldConfig,
	TableConfig,
	TableInfo,
} from "./types";

/**
 * Validate user defined configs using the database rawModels
 */
const validateConfigs = (
	tableConfigs: TableConfig[],
	tableName_tableInfo_map: Map<string, TableInfo>,
): {
	aliasName_tableName_map: Map<string, string>;
} => {
	const aliasName_tableName_map = new Map<string, string>();

	for (const tableConfig of tableConfigs) {
		const tableInfo = tableName_tableInfo_map.get(tableConfig.name);

		if (!tableInfo) {
			throw Error(`Table ${tableConfig.name} does not exist`);
		}

		for (const aliasConfig of tableConfig.aliasConfigs) {
			const foundTableName = aliasName_tableName_map.get(aliasConfig.name);
			if (foundTableName !== undefined) {
				throw Error(
					`Duplicate alias ${aliasConfig.name} on tables ${tableConfig.name} and ${foundTableName}`,
				);
			}
			aliasName_tableName_map.set(aliasConfig.name, tableConfig.name);
		}
	}

	for (const tableConfig of tableConfigs) {
		const tableInfo = tableName_tableInfo_map.get(tableConfig.name);

		if (!tableInfo) {
			throw Error(`Table ${tableConfig.name} does not exist`);
		}

		try {
			for (const aliasConfig of tableConfig.aliasConfigs) {
				try {
					if (aliasConfig.get) {
						validateGetConfig(
							tableName_tableInfo_map,
							aliasName_tableName_map,
							tableInfo,
							aliasConfig.get,
						);
					}
					if (aliasConfig.add) {
						validateAddConfig(
							tableName_tableInfo_map,
							aliasName_tableName_map,
							tableInfo,
							aliasConfig.add,
						);
					}
					if (aliasConfig.edit) {
						validateEditConfig(tableName_tableInfo_map, tableInfo, aliasConfig.edit);
					}
				} catch (err) {
					throw Error(`${err} of alias ${aliasConfig.name}`);
				}
			}
		} catch (err) {
			throw Error(`${err} on table ${tableInfo.tableName}`);
		}
	}

	return {
		aliasName_tableName_map,
	};
};

// get
const validateGetConfig = (
	tableName_tableInfo_map: Map<string, TableInfo>,
	aliasName_tableName_map: Map<string, string>,
	tableInfo: TableInfo,
	getConfig: GetConfig,
) => {
	try {
		// primary fields
		if (getConfig.output.primaryFields) {
			validatePrimaryFieldsConfig(tableInfo, getConfig.output.primaryFields);
		}

		// associated fields
		if (getConfig.output.associatedFields) {
			validateGetAssociatedFieldsConfigs(
				aliasName_tableName_map,
				tableInfo,
				getConfig.output.associatedFields,
			);
		}

		if (getConfig.input) {
			// filter fields
			if (getConfig.input.filterFields) {
				validateFilterFieldConfigs(
					tableName_tableInfo_map,
					tableInfo,
					getConfig.input.filterFields,
				);
			}

			// sort by fields
			if (getConfig.input.sortByFields) {
				validateSortByFieldConfigs(
					tableName_tableInfo_map,
					tableInfo,
					getConfig.input.sortByFields,
				);
			}
		}
	} catch (err) {
		throw Error(err + ` on getConfig`);
	}
};

const validateGetAssociatedFieldsConfigs = (
	aliasName_tableName_map: Map<string, string>,
	tableInfo: TableInfo, // the table the @param associatedFields belong to
	associatedFields: GetAssociatedFieldConfig[],
) => {
	for (const associatedField of associatedFields) {
		const rawAssociatedField = tableInfo.fieldName_associatedField_map.get(associatedField.name);
		if (!rawAssociatedField) {
			throw Error(`Invalid associatedField ${associatedField.name}`);
		}

		const aliasTableName = aliasName_tableName_map.get(associatedField.aliasName);
		if (aliasTableName === undefined) {
			throw Error(`Invalid aliasName ${associatedField.aliasName}`);
		}

		if (aliasTableName !== rawAssociatedField.tableName) {
			throw Error(
				`Invalid aliasName, ${associatedField.aliasName} is derived from tableName ${aliasTableName} but associatedField's tableName is ${rawAssociatedField.tableName}`,
			);
		}
	}
};

// add
const validateAddConfig = (
	tableName_tableInfo_map: Map<string, TableInfo>,
	aliasName_tableName_map: Map<string, string>,
	tableInfo: TableInfo,
	addConfig: AddConfig,
) => {
	try {
		if (addConfig.input) {
			validateAddFields(tableName_tableInfo_map, tableInfo, addConfig.input);
		}

		if (addConfig.output) {
			// associated fields
			if (addConfig.output.associatedFields) {
				validateGetAssociatedFieldsConfigs(
					aliasName_tableName_map,
					tableInfo,
					addConfig.output.associatedFields,
				);
			}
		}
	} catch (err) {
		throw Error(err + ` on addConfig`);
	}
};

const validateAddFields = (
	tableName_tableInfo_map: Map<string, TableInfo>,
	tableInfo: TableInfo,
	input?: AddInputConfig,
) => {
	if (input?.primaryFields) {
		validatePrimaryFieldsConfig(tableInfo, input.primaryFields);
	}
	if (input?.associatedFields) {
		validateAddAssociatedFieldConfigs(tableName_tableInfo_map, tableInfo, input.associatedFields);
	}
};

const validateAddAssociatedFieldConfigs = (
	tableName_tableInfo_map: Map<string, TableInfo>,
	tableInfo: TableInfo, // the table the @param associatedFields belong to
	associatedFields: AddAssociatedFieldConfig[],
) => {
	for (const associatedField of associatedFields) {
		const rawAssociatedField = tableInfo.fieldName_associatedField_map.get(associatedField.name);
		if (!rawAssociatedField) {
			throw Error(`Invalid associatedField ${associatedField.name}`);
		}

		const associatedTableInfo = tableName_tableInfo_map.get(rawAssociatedField.tableName)!;

		try {
			validateAddFields(tableName_tableInfo_map, associatedTableInfo, associatedField.input);
		} catch (err) {
			throw Error(err + ` on associatedField ${rawAssociatedField.fieldName}`);
		}
	}
};

// edit
const validateEditConfig = (
	tableName_tableInfo_map: Map<string, TableInfo>,
	tableInfo: TableInfo,
	editConfig: EditConfig,
) => {
	try {
		if (editConfig.input) {
			validateEditFields(tableName_tableInfo_map, tableInfo, editConfig.input);
		}
	} catch (err) {
		throw Error(err + ` on editConfig`);
	}
};

const validateEditFields = (
	tableName_tableInfo_map: Map<string, TableInfo>,
	tableInfo: TableInfo,
	input?: EditInputConfig,
) => {
	if (input?.primaryFields) {
		validatePrimaryFieldsConfig(tableInfo, input.primaryFields);
	}
	if (input?.associatedFields) {
		validateEditAssociatedFieldConfigs(tableName_tableInfo_map, tableInfo, input.associatedFields);
	}
};

const validateEditAssociatedFieldConfigs = (
	tableName_tableInfo_map: Map<string, TableInfo>,
	tableInfo: TableInfo, // the table the @param associatedFields belong to
	associatedFields: AddOrEditOrRemoveAssociatedFieldConfig[],
) => {
	for (const associatedField of associatedFields) {
		const rawAssociatedField = tableInfo.fieldName_associatedField_map.get(associatedField.name);
		if (!rawAssociatedField) {
			throw Error(`Invalid associatedField ${associatedField.name}`);
		}

		const associatedTableInfo = tableName_tableInfo_map.get(rawAssociatedField.tableName)!;

		try {
			validateEditFields(tableName_tableInfo_map, associatedTableInfo, associatedField.input);
		} catch (err) {
			throw Error(err + ` on associatedField ${rawAssociatedField.fieldName}`);
		}
	}
};

const validatePrimaryFieldsConfig = (
	tableInfo: TableInfo, // the table the @param primaryFields belong to
	primaryFields: OutputPrimaryFieldsConfig | InputPrimaryFieldsConfig,
) => {
	for (const primaryFieldName of primaryFields.include) {
		const rawPrimaryField = tableInfo.fieldName_primaryField_map.get(primaryFieldName);
		if (!rawPrimaryField) {
			throw Error(`Invalid primaryField ${primaryFieldName}`);
		}
	}
};

const validateFilterFieldConfigs = (
	tableName_tableInfo_map: Map<string, TableInfo>,
	tableInfo: TableInfo, // the table the @param filterFields belong to
	filterFields: FilterFieldConfig[],
) => {
	for (const filterField of filterFields) {
		if (filterField.operators) {
			const rawPrimaryField = tableInfo.fieldName_primaryField_map.get(filterField.name);
			if (!rawPrimaryField) {
				throw Error(`Invalid filterField ${filterField.name}`);
			}
		} else if (filterField.filterFields) {
			const rawAssociatedField = tableInfo.fieldName_associatedField_map.get(filterField.name);
			if (!rawAssociatedField) {
				throw Error(`Invalid filterField ${filterField.name}`);
			}
			const associatedTableInfo = tableName_tableInfo_map.get(rawAssociatedField.tableName)!;
			try {
				validateFilterFieldConfigs(
					tableName_tableInfo_map,
					associatedTableInfo,
					filterField.filterFields,
				);
			} catch (err) {
				throw Error(err + ` on associatedField ${rawAssociatedField.fieldName}`);
			}
		} else {
			const rawPrimaryField = tableInfo.fieldName_primaryField_map.get(filterField.name);
			if (!rawPrimaryField) {
				throw Error(`Invalid filterField ${filterField.name}`);
			}
			if (/^(jsonb)/.test(rawPrimaryField.columnDescription.type.toLowerCase())) {
				continue;
			}

			throw Error(
				"Invalid filterField, must have operators or filterFields, only jsonb can have neither,",
			);
		}
	}
};

const validateSortByFieldConfigs = (
	tableName_tableInfo_map: Map<string, TableInfo>,
	tableInfo: TableInfo, // the table the @param sortByFields belong to
	sortByFields: SortByFieldConfig[],
) => {
	for (const sortByField of sortByFields) {
		if (!sortByField.sortByFields) {
			const rawPrimaryField = tableInfo.fieldName_primaryField_map.get(sortByField.name);
			if (!rawPrimaryField) {
				throw Error(`Invalid sortByField ${sortByField.name}`);
			}
		} else {
			const rawAssociatedField = tableInfo.fieldName_associatedField_map.get(sortByField.name);
			if (!rawAssociatedField) {
				throw Error(`Invalid sortByField ${sortByField.name}`);
			}
			const associatedTableInfo = tableName_tableInfo_map.get(rawAssociatedField.tableName)!;
			try {
				validateSortByFieldConfigs(
					tableName_tableInfo_map,
					associatedTableInfo,
					sortByField.sortByFields,
				);
			} catch (err) {
				throw Error(err + ` on associatedField ${rawAssociatedField.fieldName}`);
			}
		}
	}
};

export default validateConfigs;
