import { ColumnDescription, Utils } from "sequelize";
import _, { upperFirst } from "lodash";
import { TableInfo } from "./getTableInfos";
import { tabs } from "./utils";
import {
	AddAssociatedFieldConfig,
	AddConfig,
	AddInputConfig,
	AddOrEditOrRemoveAssociatedFieldConfig,
	InputCustomFieldConfig,
	EditConfig,
	EditInputConfig,
	FilterFieldConfig,
	InputPrimaryFieldsConfig,
	SortByFieldConfig,
	TableConfig,
} from ".";

const generateGraphQLSchema = (
	tableName_tableInfo_map: Map<string, TableInfo>,
	tableConfigs: TableConfig[],
) => {
	const queriesStrArr: string[] = [];
	const mutationsStrArr: string[] = [];
	// type or input
	const typesStrArr: string[] = [];

	queriesStrArr.push("type Query {\n");
	mutationsStrArr.push("type Mutation {\n");

	for (const tableConfig of tableConfigs) {
		const { name: tableName, aliasConfigs } = tableConfig;
		const tableInfo = tableName_tableInfo_map.get(tableName)!;

		typesStrArr.push(`# ${tableConfig.name}\n`);

		for (const aliasConfig of aliasConfigs) {
			const {
				name: aliasName,
				get: aliasGet,
				add: aliasAdd,
				edit: aliasEdit,
				remove: aliasRemove,
			} = aliasConfig;
			const pluralAliasName =
				aliasConfig.pluralName !== undefined ? aliasConfig.pluralName : Utils.pluralize(aliasName);

			if (aliasName === pluralAliasName) {
				throw Error(`aliasName ${aliasName} cannot be equal pluralAliasName ${pluralAliasName}`);
			}

			if (aliasGet) {
				// get
				if (!aliasGet.output.primaryFields && !aliasGet.output.associatedFields) {
					throw Error(
						`table ${tableName}, alias ${aliasName}, get requires primaryFields or associatedFields`,
					);
				}

				queriesStrArr.push(`${tabs(1)}# ${tableName}\n`);

				queriesStrArr.push(`${tabs(1)}# ${pluralAliasName}\n`);
				typesStrArr.push(`# ${aliasName} get\n`);

				// output type
				typesStrArr.push(`type ${aliasName} {\n`);

				if (aliasGet.output.primaryFields) {
					for (const primaryFieldName of aliasGet.output.primaryFields.include) {
						const rawPrimaryField = tableInfo.fieldName_primaryField_map.get(primaryFieldName)!;
						typesStrArr.push(
							`${tabs(1)}${primaryFieldName}: ${dbToGraphqlType(
								rawPrimaryField.columnDescription,
								true,
							)}\n`,
						);
					}
				}

				if (aliasGet.output.associatedFields) {
					for (const associatedField of aliasGet.output.associatedFields) {
						const rawAssociatedField = tableInfo.fieldName_associatedField_map.get(
							associatedField.name,
						)!;

						let type: string | undefined;
						if (rawAssociatedField.isArray) {
							type = `[${associatedField.aliasName}!]!`;
						} else {
							type = `${associatedField.aliasName}${rawAssociatedField.isNullable ? "" : "!"}`;
						}

						typesStrArr.push(`${tabs(1)}${associatedField.name}: ${type}\n`);
					}
				}
				typesStrArr.push("}\n\n");

				// get output
				typesStrArr.push(`type Get${pluralAliasName}Output {\n`);
				typesStrArr.push(`${tabs(1)}count: Int!\n`);
				typesStrArr.push(`${tabs(1)}rows: [${aliasName}!]!\n`);
				typesStrArr.push("}\n\n");

				if (aliasGet.input) {
					if (aliasGet.input.filterFields) {
						// get filter fields
						const filterFieldsStrArrArr: string[][] = [];
						generateGraphQLFilterFields(
							`Get${pluralAliasName}`,
							filterFieldsStrArrArr,
							tableName_tableInfo_map,
							tableInfo,
							aliasGet.input.filterFields,
						);

						for (const filterFieldsStrArr of filterFieldsStrArrArr) {
							for (const filterFieldsStr of filterFieldsStrArr) {
								typesStrArr.push(filterFieldsStr);
							}
						}

						// get filter
						typesStrArr.push(`input Get${pluralAliasName}Filter {\n`);
						typesStrArr.push(`${tabs(1)}fields: Get${pluralAliasName}FilterFields\n`);
						typesStrArr.push(`${tabs(1)}and: [Get${pluralAliasName}Filter!]\n`);
						typesStrArr.push(`${tabs(1)}or: [Get${pluralAliasName}Filter!]\n`);
						typesStrArr.push(`}\n\n`);
					}

					// get sort by
					if (aliasGet.input.sortByFields) {
						typesStrArr.push(`enum Get${pluralAliasName}SortByNames {\n`);
						generateGraphQLSortByNames(
							"",
							typesStrArr,
							aliasGet.input.sortByFields,
							tableName_tableInfo_map,
							tableInfo,
						);
						typesStrArr.push(`}\n\n`);

						typesStrArr.push(`input Get${pluralAliasName}SortBy {\n`);
						typesStrArr.push(`${tabs(1)}name: Get${pluralAliasName}SortByNames!\n`);
						typesStrArr.push(`${tabs(1)}isDesc: Boolean\n`);
						typesStrArr.push(`}\n\n`);
					}

					// get custom fields
					if (aliasGet.input.customFields) {
						const customFieldsStrArrArr: string[][] = [];
						generatedGraphQLInputCustomFields(
							`Get${pluralAliasName}`,
							customFieldsStrArrArr,
							aliasGet.input.customFields.fields,
						);
						for (const customFieldsStrArr of customFieldsStrArrArr) {
							for (const customFieldsStr of customFieldsStrArr) {
								typesStrArr.push(customFieldsStr);
							}
						}
					}
				}

				if (!aliasGet.isTypeOnly) {
					// get input
					if (
						aliasGet.input?.filterFields ||
						aliasGet.input?.sortByFields ||
						aliasGet.input?.canPaginate !== false ||
						aliasGet.input.customFields
					) {
						typesStrArr.push(`input Get${pluralAliasName}Input {\n`);
						if (aliasGet.input?.filterFields) {
							typesStrArr.push(`${tabs(1)}filter: Get${pluralAliasName}Filter\n`);
						}
						if (aliasGet.input?.sortByFields) {
							typesStrArr.push(`${tabs(1)}sortBys: [Get${pluralAliasName}SortBy!]\n`);

							if (
								isAnySortByFieldAJsonField(
									aliasGet.input.sortByFields,
									tableName_tableInfo_map,
									tableInfo,
								)
							) {
								typesStrArr.push(`${tabs(1)}jsonFieldSortBys: [JsonFieldSortBy!]\n`);
							}
						}
						if (aliasGet.input?.canPaginate !== false) {
							typesStrArr.push(`${tabs(1)}pagination: Pagination\n`);
						}
						if (aliasGet.input?.customFields) {
							typesStrArr.push(
								`${tabs(1)}customFields: Get${pluralAliasName}CustomFields${
									aliasGet.input.customFields.isOptional ? "" : "!"
								}\n`,
							);
						}
						typesStrArr.push("}\n\n");

						queriesStrArr.push(
							`${tabs(
								1,
							)}get${pluralAliasName}(input: Get${pluralAliasName}Input): Get${pluralAliasName}Output!\n`,
						);
					} else {
						queriesStrArr.push(`${tabs(1)}get${pluralAliasName}: Get${pluralAliasName}Output!\n`);
					}
				}
			}
			queriesStrArr.push("\n");

			// mutations
			if (aliasAdd || aliasEdit || aliasRemove) {
				mutationsStrArr.push(`${tabs(1)}# ${tableName}\n`);

				// add
				if (aliasAdd) {
					typesStrArr.push(`# ${aliasName} add\n`);
					// add input
					if (aliasAdd.input) {
						if (aliasAdd.input.primaryFields || aliasAdd.input.associatedFields) {
							const addStrArrArr: string[][] = [];
							generateGraphQLAdd(
								`Add${aliasName}`,
								addStrArrArr,
								tableName_tableInfo_map,
								tableInfo,
								aliasAdd,
							);

							for (const addStrArr of addStrArrArr) {
								for (const addStr of addStrArr) {
									typesStrArr.push(addStr);
								}
							}
						}
					}

					// add output
					if (aliasAdd.output) {
						typesStrArr.push(`type Added${aliasName} {\n`);

						if (aliasAdd.output.primaryFields) {
							for (const primaryFieldName of aliasAdd.output.primaryFields.include) {
								const rawPrimaryField = tableInfo.fieldName_primaryField_map.get(primaryFieldName)!;
								typesStrArr.push(
									`${tabs(1)}${primaryFieldName}: ${dbToGraphqlType(
										rawPrimaryField.columnDescription,
										true,
									)}\n`,
								);
							}
						}

						if (aliasAdd.output.associatedFields) {
							for (const associatedField of aliasAdd.output.associatedFields) {
								const rawAssociatedField = tableInfo.fieldName_associatedField_map.get(
									associatedField.name,
								)!;

								let type: string | undefined;
								if (rawAssociatedField.isArray) {
									type = `[${associatedField.aliasName}!]!`;
								} else {
									type = `${associatedField.aliasName}${rawAssociatedField.isNullable ? "" : "!"}`;
								}

								typesStrArr.push(`${tabs(1)}${associatedField.name}: ${type}\n`);
							}
						}
						typesStrArr.push("}\n\n");

						typesStrArr.push(`type Add${pluralAliasName}Output {\n`);
						typesStrArr.push(`${tabs(1)}rows: [Added${aliasName}!]!\n`);
						typesStrArr.push("}\n\n");
					}

					if (aliasAdd.input?.primaryFields || aliasAdd.input?.associatedFields) {
						// add inputs
						typesStrArr.push(`input Add${pluralAliasName}Input {\n`);
						typesStrArr.push(`${tabs(1)}inputs: [Add${aliasName}Input!]!\n`);
						typesStrArr.push("}\n\n");

						mutationsStrArr.push(
							`${tabs(1)}add${pluralAliasName}(input: Add${pluralAliasName}Input!): ${
								aliasAdd.output ? `Add${pluralAliasName}Output!` : "Int!"
							}\n`,
						);
					} else {
						mutationsStrArr.push(
							`${tabs(1)}add${aliasName}${
								aliasAdd.output ? `Add${pluralAliasName}Output!` : "Int!"
							}\n`,
						);
					}
				}

				// edit
				if (aliasEdit) {
					typesStrArr.push(`# ${aliasName} edit\n`);

					// edit input
					const editStrArrArr: string[][] = [];
					generateGraphQLEdit(
						`Edit${aliasName}`,
						editStrArrArr,
						tableName_tableInfo_map,
						tableInfo,
						aliasEdit,
					);

					for (const editStrArr of editStrArrArr) {
						for (const editStr of editStrArr) {
							typesStrArr.push(editStr);
						}
					}

					// edit inputs
					typesStrArr.push(`input Edit${pluralAliasName}Input {\n`);
					typesStrArr.push(`${tabs(1)}inputs: [Edit${aliasName}Input!]!\n`);
					typesStrArr.push("}\n\n");

					mutationsStrArr.push(
						`${tabs(1)}edit${pluralAliasName}(input: Edit${pluralAliasName}Input!): Int!\n`,
					);
				}

				// remove
				if (aliasRemove?.isEnabled) {
					typesStrArr.push(`# ${aliasName} remove\n`);

					// remove filter fields
					const removeStrArrArr: string[][] = [];
					generateGraphQLRemove(`Remove${pluralAliasName}`, removeStrArrArr, tableInfo);

					for (const editStrArr of removeStrArrArr) {
						for (const editStr of editStrArr) {
							typesStrArr.push(editStr);
						}
					}

					// remove inputs
					typesStrArr.push(`input Remove${pluralAliasName}Input {\n`);
					typesStrArr.push(`${tabs(1)}primaryKeysList: [Remove${pluralAliasName}PrimaryKeys!]!\n`);
					typesStrArr.push("}\n\n");

					mutationsStrArr.push(
						`${tabs(1)}remove${pluralAliasName}(input: Remove${pluralAliasName}Input!): Int!\n\n`,
					);
				}
			}
		}
	}

	queriesStrArr.push("}\n\n");
	mutationsStrArr.push("}\n\n");

	const genericsStrArr: string[] = [];
	genericsStrArr.push("scalar NullableString\n");
	genericsStrArr.push("scalar NullableInt\n");
	genericsStrArr.push("scalar NullableFloat\n");
	genericsStrArr.push("scalar NullableBoolean\n");
	genericsStrArr.push("scalar NullableDate\n\n");

	genericsStrArr.push("scalar Date\n");

	genericsStrArr.push("scalar UnknownTypeStringified\n\n");

	genericsStrArr.push("scalar Json\n\n");
	genericsStrArr.push("scalar NullableJson\n\n");

	genericsStrArr.push("scalar BigInt\n\n");
	genericsStrArr.push("scalar NullableBigInt\n");

	genericsStrArr.push("enum FilterOperators {\n");
	genericsStrArr.push(`${tabs(1)}EQUAL\n`);
	genericsStrArr.push(`${tabs(1)}NOT_EQUAL\n`);
	genericsStrArr.push(`${tabs(1)}GREATER_THAN\n`);
	genericsStrArr.push(`${tabs(1)}GREATER_THAN_OR_EQUAL\n`);
	genericsStrArr.push(`${tabs(1)}LESS_THAN\n`);
	genericsStrArr.push(`${tabs(1)}LESS_THAN_OR_EQUAL\n`);
	genericsStrArr.push(`${tabs(1)}LIKE\n`);
	genericsStrArr.push(`${tabs(1)}I_LIKE\n`);
	genericsStrArr.push("}\n\n");

	genericsStrArr.push("input StringFilter {\n");
	genericsStrArr.push(`${tabs(1)}val: String!\n`);
	genericsStrArr.push(`${tabs(1)}op: FilterOperators!\n`);
	genericsStrArr.push("}\n\n");

	genericsStrArr.push("input NullableStringFilter {\n");
	genericsStrArr.push(`${tabs(1)}val: NullableString\n`);
	genericsStrArr.push(`${tabs(1)}op: FilterOperators!\n`);
	genericsStrArr.push("}\n\n");

	genericsStrArr.push("input IntFilter {\n");
	genericsStrArr.push(`${tabs(1)}val: Int!\n`);
	genericsStrArr.push(`${tabs(1)}op: FilterOperators!\n`);
	genericsStrArr.push("}\n\n");

	genericsStrArr.push("input NullableIntFilter {\n");
	genericsStrArr.push(`${tabs(1)}val: NullableInt\n`);
	genericsStrArr.push(`${tabs(1)}op: FilterOperators!\n`);
	genericsStrArr.push("}\n\n");

	genericsStrArr.push("input FloatFilter {\n");
	genericsStrArr.push(`${tabs(1)}val: Float!\n`);
	genericsStrArr.push(`${tabs(1)}op: FilterOperators!\n`);
	genericsStrArr.push("}\n\n");

	genericsStrArr.push("input NullableFloatFilter {\n");
	genericsStrArr.push(`${tabs(1)}val: NullableFloat\n`);
	genericsStrArr.push(`${tabs(1)}op: FilterOperators!\n`);
	genericsStrArr.push("}\n\n");

	genericsStrArr.push("input BooleanFilter {\n");
	genericsStrArr.push(`${tabs(1)}val: Boolean!\n`);
	genericsStrArr.push(`${tabs(1)}op: FilterOperators!\n`);
	genericsStrArr.push("}\n\n");

	genericsStrArr.push("input NullableBooleanFilter {\n");
	genericsStrArr.push(`${tabs(1)}val: NullableBoolean\n`);
	genericsStrArr.push(`${tabs(1)}op: FilterOperators!\n`);
	genericsStrArr.push("}\n\n");

	genericsStrArr.push("input DateFilter {\n");
	genericsStrArr.push(`${tabs(1)}val: Date!\n`);
	genericsStrArr.push(`${tabs(1)}op: FilterOperators!\n`);
	genericsStrArr.push("}\n\n");

	genericsStrArr.push("input NullableDateFilter {\n");
	genericsStrArr.push(`${tabs(1)}val: NullableDate\n`);
	genericsStrArr.push(`${tabs(1)}op: FilterOperators!\n`);
	genericsStrArr.push("}\n\n");

	genericsStrArr.push("input JsonFilter {\n");
	genericsStrArr.push(`${tabs(1)}name: String!\n`);
	genericsStrArr.push(`${tabs(1)}# Must be json parsable\n`);
	genericsStrArr.push(`${tabs(1)}val: String!\n`);
	genericsStrArr.push(`${tabs(1)}op: FilterOperators!\n`);
	genericsStrArr.push("}\n\n");

	genericsStrArr.push("input BigIntFilter {\n");
	genericsStrArr.push(`${tabs(1)}val: BigInt!\n`);
	genericsStrArr.push(`${tabs(1)}op: FilterOperators!\n`);
	genericsStrArr.push("}\n\n");

	genericsStrArr.push("input NullableBigIntFilter {\n");
	genericsStrArr.push(`${tabs(1)}val: NullableBigInt\n`);
	genericsStrArr.push(`${tabs(1)}op: FilterOperators!\n`);
	genericsStrArr.push("}\n\n");

	genericsStrArr.push("input Pagination {\n");
	genericsStrArr.push(`${tabs(1)}offset: Int\n`);
	genericsStrArr.push(`${tabs(1)}limit: Int\n`);
	genericsStrArr.push("}\n\n");

	genericsStrArr.push("# Will be merged with sortBy\n");
	genericsStrArr.push("input JsonFieldSortBy {\n");
	genericsStrArr.push(`${tabs(1)}sortByName: String!\n`);
	genericsStrArr.push(`${tabs(1)}jsonFieldName: String!\n`);
	genericsStrArr.push(`${tabs(1)}isDesc: Boolean\n`);
	genericsStrArr.push(`${tabs(1)}# Will be inserted to this index during merge with sortBy\n`);
	genericsStrArr.push(`${tabs(1)}index: Int!\n`);
	genericsStrArr.push("}\n\n");

	// no queries
	if (queriesStrArr.length === 2) {
		queriesStrArr.splice(0, queriesStrArr.length);
	}

	// no mutations
	if (mutationsStrArr.length === 2) {
		mutationsStrArr.splice(0, mutationsStrArr.length);
	}

	return [...queriesStrArr, ...mutationsStrArr, ...genericsStrArr, ...typesStrArr].join("");
};

const dbToGraphqlType = (columnDesc: ColumnDescription, isRequired: boolean) => {
	const typeLower = columnDesc.type.toLowerCase();
	let graphqlType: string;
	if (isFloat(typeLower)) {
		if (columnDesc.allowNull) {
			graphqlType = "NullableFloat";
		} else {
			graphqlType = "Float" + (isRequired ? "!" : "");
		}
	} else if (isInt(typeLower)) {
		if (columnDesc.allowNull) {
			graphqlType = "NullableInt";
		} else {
			graphqlType = "Int" + (isRequired ? "!" : "");
		}
	} else if (isBoolean(typeLower)) {
		if (columnDesc.allowNull) {
			graphqlType = "NullableBoolean";
		} else {
			graphqlType = "Boolean" + (isRequired ? "!" : "");
		}
	} else if (isDate(typeLower)) {
		if (columnDesc.allowNull) {
			graphqlType = "NullableDate";
		} else {
			graphqlType = "Date" + (isRequired ? "!" : "");
		}
	} else if (isString(typeLower)) {
		if (columnDesc.allowNull) {
			graphqlType = "NullableString";
		} else {
			graphqlType = "String" + (isRequired ? "!" : "");
		}
	} else if (isJsonB(typeLower)) {
		if (columnDesc.allowNull) {
			graphqlType = "NullableJson";
		} else {
			graphqlType = "Json" + (isRequired ? "!" : "");
		}
	} else if (isBigInt(typeLower)) {
		if (columnDesc.allowNull) {
			graphqlType = "NullableBigInt";
		} else {
			graphqlType = "BigInt" + (isRequired ? "!" : "");
		}
	} else {
		graphqlType = "UnknownTypeStringified";
	}

	return graphqlType;
};

const dbToGraphqlFilterType = (columnDesc: ColumnDescription) => {
	const typeLower = columnDesc.type.toLowerCase();
	let graphqlType: string;
	if (isFloat(typeLower)) {
		if (columnDesc.allowNull) {
			graphqlType = "NullableFloatFilter";
		} else {
			graphqlType = "FloatFilter";
		}
	} else if (isInt(typeLower)) {
		if (columnDesc.allowNull) {
			graphqlType = "NullableIntFilter";
		} else {
			graphqlType = "IntFilter";
		}
	} else if (isBoolean(typeLower)) {
		if (columnDesc.allowNull) {
			graphqlType = "NullableBooleanFilter";
		} else {
			graphqlType = "BooleanFilter";
		}
	} else if (isDate(typeLower)) {
		if (columnDesc.allowNull) {
			graphqlType = "NullableDateFilter";
		} else {
			graphqlType = "DateFilter";
		}
	} else if (isString(typeLower)) {
		if (columnDesc.allowNull) {
			graphqlType = "NullableStringFilter";
		} else {
			graphqlType = "StringFilter";
		}
	} else if (isJsonB(typeLower)) {
		graphqlType = "JsonFilter";
	} else if (isBigInt(typeLower)) {
		if (columnDesc.allowNull) {
			graphqlType = "NullableBigIntFilter";
		} else {
			graphqlType = "BigIntFilter";
		}
	} else {
		graphqlType = "UnknownTypeStringified"; // @TODO
	}

	return graphqlType;
};

const isFloat = (fieldType: string): boolean => {
	return /^(float|money|smallmoney|double|decimal|numeric|real)/.test(fieldType);
};

const isInt = (fieldType: string): boolean => {
	return /^(smallint|mediumint|tinyint|int|oid)/.test(fieldType);
};

const isBigInt = (fieldType: string): boolean => {
	return /^(bigint)/.test(fieldType);
};

const isBoolean = (fieldType: string): boolean => {
	return /^(boolean|bit)/.test(fieldType);
};

const isDate = (fieldType: string): boolean => {
	return /^(datetime|timestamp)/.test(fieldType);
};

const isString = (fieldType: string): boolean => {
	return /^(char|nchar|string|varying|varchar|nvarchar|text|longtext|mediumtext|tinytext|ntext|uuid|uniqueidentifier|date|time|inet|cidr|macaddr)/.test(
		fieldType,
	);
};

const isJsonB = (fieldType: string): boolean => {
	return /^(jsonb)/.test(fieldType);
};

// add
const generateGraphQLAdd = (
	prefix: string,
	addStrArrArr: string[][],
	tableName_tableInfo_map: Map<string, TableInfo>,
	tableInfo: TableInfo,
	addConfig: AddConfig,
) => {
	if (addConfig.input) {
		generateGraphQLAddInput(
			prefix,
			addStrArrArr,
			tableName_tableInfo_map,
			tableInfo,
			addConfig.input,
		);
	}
};

const generateGraphQLAddInput = (
	prefix: string,
	addStrArrArr: string[][],
	tableName_tableInfo_map: Map<string, TableInfo>,
	tableInfo: TableInfo,
	input?: AddInputConfig,
) => {
	const addStrArr: string[] = [];
	addStrArr.push(`input ${prefix}Input {\n`);
	if (input?.customFields) {
		generatedGraphQLInputCustomFields(prefix, addStrArrArr, input.customFields.fields);

		addStrArr.push(
			`${tabs(1)}customFields: ${prefix}CustomFields${input.customFields.isOptional ? "" : "!"}\n`,
		);
	}

	if (input?.primaryFields) {
		generatedGraphQLInputPrimaryFields(prefix, addStrArrArr, tableInfo, input.primaryFields);

		addStrArr.push(
			`${tabs(1)}primaryFields: ${prefix}PrimaryFields${
				input.primaryFields.isOptional ? "" : "!"
			}\n`,
		);
	}

	if (input?.associatedFields) {
		generatedGraphQLAddAssociatedFields(
			prefix,
			addStrArrArr,
			tableName_tableInfo_map,
			tableInfo,
			input.associatedFields,
		);

		const isAnyAssociatedFieldNonOptional = input.associatedFields.some((associatedField) => {
			return !associatedField.isOptional;
		});

		addStrArr.push(
			`${tabs(1)}associatedFields: ${prefix}AssociatedFields${
				isAnyAssociatedFieldNonOptional ? "!" : ""
			}\n`,
		);
	}
	addStrArr.push(`}\n\n`);
	addStrArrArr.push(addStrArr);
};

const generatedGraphQLAddAssociatedFields = (
	prefix: string,
	addStrArrArr: string[][],
	tableName_tableInfo_map: Map<string, TableInfo>,
	tableInfo: TableInfo,
	associatedFields: AddAssociatedFieldConfig[],
) => {
	const addStrArr: string[] = [];
	addStrArr.push(`input ${prefix}AssociatedFields {\n`);
	for (const associatedField of associatedFields) {
		const rawAssociatedField = tableInfo.fieldName_associatedField_map.get(associatedField.name)!;

		const associatedTableInfo = tableName_tableInfo_map.get(rawAssociatedField.tableName)!;

		const newPrefix = `${prefix}With${upperFirst(associatedField.name)}`;

		const inputName = `${newPrefix}Input`;
		addStrArr.push(
			`${tabs(1)}${associatedField.name}: ${
				rawAssociatedField.isArray ? `[${inputName}!]` : inputName
			}${associatedField.isOptional ? "" : "!"}\n`,
		);
		generateGraphQLAddInput(
			newPrefix,
			addStrArrArr,
			tableName_tableInfo_map,
			associatedTableInfo,
			associatedField.input,
		);
	}
	addStrArr.push(`}\n\n`);
	addStrArrArr.push(addStrArr);
};

// edit
const generateGraphQLEdit = (
	prefix: string,
	editStrArrArr: string[][],
	tableName_tableInfo_map: Map<string, TableInfo>,
	tableInfo: TableInfo,
	editConfig: EditConfig,
) => {
	if (editConfig.input) {
		generateGraphQLEditInput(
			true,
			prefix,
			editStrArrArr,
			tableName_tableInfo_map,
			tableInfo,
			editConfig.input,
		);
	}
};

const generateGraphQLEditInput = (
	isBaseTable: boolean,
	prefix: string,
	editStrArrArr: string[][],
	tableName_tableInfo_map: Map<string, TableInfo>,
	tableInfo: TableInfo,
	input?: EditInputConfig,
) => {
	const editStrArr: string[] = [];

	editStrArr.push(`input ${prefix}Input {\n`);

	generateGraphQLPrimaryKeys(prefix, editStrArrArr, tableInfo);

	editStrArr.push(`${tabs(1)}primaryKeys: ${prefix}PrimaryKeys${isBaseTable ? "!" : ""}\n`);

	if (input?.customFields) {
		generatedGraphQLInputCustomFields(prefix, editStrArrArr, input.customFields.fields);

		editStrArr.push(
			`${tabs(1)}customFields: ${prefix}CustomFields${input.customFields.isOptional ? "" : "!"}\n`,
		);
	}

	if (input?.primaryFields) {
		generatedGraphQLInputPrimaryFields(prefix, editStrArrArr, tableInfo, input.primaryFields);

		editStrArr.push(
			`${tabs(1)}primaryFields: ${prefix}PrimaryFields${
				input.primaryFields.isOptional !== undefined
					? input.primaryFields.isOptional
						? ""
						: "!"
					: isAnyInputPrimaryFieldsNonNullable(tableInfo, input.primaryFields)
					? "!"
					: ""
			}\n`,
		);
	}

	if (input?.associatedFields) {
		generatedGraphQLEditAssociatedFields(
			prefix,
			editStrArrArr,
			tableName_tableInfo_map,
			tableInfo,
			input.associatedFields,
		);

		const isAnyAssociatedFieldNonOptional = input.associatedFields.some((associatedField) => {
			return !associatedField.isOptional;
		});

		editStrArr.push(
			`${tabs(1)}associatedFields: ${prefix}AssociatedFields${
				isAnyAssociatedFieldNonOptional ? "!" : ""
			}\n`,
		);
	}
	editStrArr.push(`}\n\n`);
	editStrArrArr.push(editStrArr);
};

const isAnyInputPrimaryFieldsNonNullable = (
	tableInfo: TableInfo,
	primaryFields: InputPrimaryFieldsConfig,
) => {
	for (const primaryFieldName of primaryFields.include) {
		const rawPrimaryField = tableInfo.fieldName_primaryField_map.get(primaryFieldName)!;
		if (!rawPrimaryField.columnDescription.allowNull) {
			return true;
		}
	}

	return false;
};

const generatedGraphQLEditAssociatedFields = (
	prefix: string,
	editStrArrArr: string[][],
	tableName_tableInfo_map: Map<string, TableInfo>,
	tableInfo: TableInfo,
	associatedFields: AddOrEditOrRemoveAssociatedFieldConfig[],
) => {
	const editStrArr: string[] = [];
	editStrArr.push(`input ${prefix}AssociatedFields {\n`);
	for (const associatedField of associatedFields) {
		const rawAssociatedField = tableInfo.fieldName_associatedField_map.get(associatedField.name)!;

		const associatedTableInfo = tableName_tableInfo_map.get(rawAssociatedField.tableName)!;

		const newPrefix = `${prefix}With${upperFirst(associatedField.name)}`;

		const inputName = `${newPrefix}Input`;
		editStrArr.push(
			`${tabs(1)}${associatedField.name}: ${
				rawAssociatedField.isArray ? `[${inputName}!]` : inputName
			}${associatedField.isOptional ? "" : "!"}\n`,
		);
		generateGraphQLEditInput(
			false,
			newPrefix,
			editStrArrArr,
			tableName_tableInfo_map,
			associatedTableInfo,
			associatedField.input,
		);
	}
	editStrArr.push(`}\n\n`);
	editStrArrArr.push(editStrArr);
};

// remove
const generateGraphQLRemove = (
	prefix: string,
	removeStrArrArr: string[][],
	tableInfo: TableInfo,
) => {
	generateGraphQLPrimaryKeys(prefix, removeStrArrArr, tableInfo);
};

// -----------------------------------
const generatedGraphQLInputCustomFields = (
	prefix: string,
	strArrArr: string[][],
	customFields: InputCustomFieldConfig[],
) => {
	const strArr: string[] = [];
	strArr.push(`input ${prefix}CustomFields {\n`);
	for (const customField of customFields) {
		strArr.push(
			`${tabs(1)}${customField.name}: ${customField.type}${customField.isOptional ? "" : "!"}\n`,
		);
	}
	strArr.push(`}\n\n`);
	strArrArr.push(strArr);
};

const generatedGraphQLInputPrimaryFields = (
	prefix: string,
	strArrArr: string[][],
	tableInfo: TableInfo,
	primaryFields: InputPrimaryFieldsConfig,
) => {
	const strArr: string[] = [];
	strArr.push(`input ${prefix}PrimaryFields {\n`);
	for (const primaryFieldName of primaryFields.include) {
		const rawPrimaryField = tableInfo.fieldName_primaryField_map.get(primaryFieldName)!;
		strArr.push(
			`${tabs(1)}${primaryFieldName}: ${dbToGraphqlType(
				rawPrimaryField.columnDescription,
				!(
					rawPrimaryField.columnDescription.autoIncrement ||
					rawPrimaryField.columnDescription.defaultValue ||
					rawPrimaryField.columnDescription.defaultValue === ""
				),
			)}\n`,
		);
	}
	strArr.push(`}\n\n`);
	strArrArr.push(strArr);
};

// deepest associatedFilter added first
const generateGraphQLFilterFields = (
	prefix: string,
	filterFieldsStrArrArr: string[][],
	tableName_tableInfo_map: Map<string, TableInfo>,
	tableInfo: TableInfo,
	filterFields: FilterFieldConfig[],
) => {
	const filterFieldsStrArr: string[] = [`input ${prefix}FilterFields {\n`];
	for (const filterField of filterFields) {
		if (filterField.filterFields) {
			const rawAssociatedField = tableInfo.fieldName_associatedField_map.get(filterField.name)!;
			const associatedTableInfo = tableName_tableInfo_map.get(rawAssociatedField.tableName)!;
			const newPrefix = `${prefix}By${upperFirst(filterField.name)}`;
			filterFieldsStrArr.push(`${tabs(1)}${filterField.name}: ${newPrefix}FilterFields\n`);
			generateGraphQLFilterFields(
				newPrefix,
				filterFieldsStrArrArr,
				tableName_tableInfo_map,
				associatedTableInfo,
				filterField.filterFields!,
			);
		} else {
			// also json filter

			const rawPrimaryField = tableInfo.fieldName_primaryField_map.get(filterField.name)!;
			filterFieldsStrArr.push(
				`${tabs(1)}${filterField.name}: ${dbToGraphqlFilterType(
					rawPrimaryField.columnDescription,
				)}\n`,
			);
		}
	}
	filterFieldsStrArr.push(`}\n\n`);
	filterFieldsStrArrArr.push(filterFieldsStrArr);
};

const generateGraphQLSortByNames = (
	prefix: string,
	typesStrArr: string[],
	sortByFields: SortByFieldConfig[],
	tableName_tableInfo_map: Map<string, TableInfo>,
	tableInfo: TableInfo,
) => {
	for (const sortByField of sortByFields) {
		if (!sortByField.sortByFields) {
			typesStrArr.push(`${tabs(1)}${prefix.length !== 0 ? `${prefix}_` : ""}${sortByField.name}\n`);
		} else {
			const rawAssociatedField = tableInfo.fieldName_associatedField_map.get(sortByField.name)!;
			const associatedTableInfo = tableName_tableInfo_map.get(rawAssociatedField.tableName)!;
			const newPrefix = `${prefix.length !== 0 ? `${prefix}_` : ""}${sortByField.name}`;
			generateGraphQLSortByNames(
				newPrefix,
				typesStrArr,
				sortByField.sortByFields,
				tableName_tableInfo_map,
				associatedTableInfo,
			);
		}
	}
};

const isAnySortByFieldAJsonField = (
	sortByFields: SortByFieldConfig[],
	tableName_tableInfo_map: Map<string, TableInfo>,
	tableInfo: TableInfo,
): boolean => {
	for (const sortByField of sortByFields) {
		if (!sortByField.sortByFields) {
			const rawPrimaryField = tableInfo.fieldName_primaryField_map.get(sortByField.name)!;
			if (isJsonB(rawPrimaryField.columnDescription.type.toLowerCase())) {
				return true;
			}
		} else {
			const rawAssociatedField = tableInfo.fieldName_associatedField_map.get(sortByField.name)!;
			const associatedTableInfo = tableName_tableInfo_map.get(rawAssociatedField.tableName)!;
			if (
				isAnySortByFieldAJsonField(
					sortByField.sortByFields,
					tableName_tableInfo_map,
					associatedTableInfo,
				)
			) {
				return true;
			}
		}
	}

	return false;
};

const generateGraphQLPrimaryKeys = (
	prefix: string,
	strArrArr: string[][],
	tableInfo: TableInfo,
) => {
	const strArr: string[] = [];
	strArr.push(`input ${prefix}PrimaryKeys {\n`);
	for (const primaryKey of tableInfo.primaryKeys) {
		const rawPrimaryField = tableInfo.fieldName_primaryField_map.get(primaryKey)!;
		strArr.push(
			`${tabs(1)}${primaryKey}: ${dbToGraphqlType(rawPrimaryField.columnDescription, true)}\n`,
		);
	}
	strArr.push(`}\n\n`);
	strArrArr.push(strArr);
};

export default generateGraphQLSchema;
