import { TableData } from "sequelize-auto/types";
import { ColumnDescription, Utils } from "sequelize";
import _, { camelCase, upperFirst } from "lodash";
import { TableConfig } from ".";

/*
 * fieldName=camelCase
 * columnName=whatever the db column casing is
 */

export interface PrimaryFieldInfo {
	fieldName: string;
	columnName: string;
	columnDescription: ColumnDescription;
}

export interface AssociatedFieldInfo {
	fieldName: string;
	tableName: string; // schema.table
	modelName: string;
	fieldNameOnChild?: string;
	fieldNameOnParent?: string;
	isArray: boolean;
	isNullable: boolean;
}

export interface TableInfo<
	T = Map<string, PrimaryFieldInfo>,
	U = Map<string, AssociatedFieldInfo>,
> {
	tableName: string; // schema.table
	modelName: string;
	tableConfig?: TableConfig;
	primaryKeys: string[]; // fieldNames
	fieldName_primaryField_map: T;
	fieldName_associatedField_map: U;
}

export type TableInfoObjectMap = TableInfo<
	{ [fieldName: string]: PrimaryFieldInfo },
	{ [fieldName: string]: AssociatedFieldInfo }
>;

const getTableInfos = (data: TableData, tableName_tableConfig_map: Map<string, TableConfig>) => {
	const tableNames = Object.keys(data.tables);

	const tableName_tableInfo_map = new Map<string, TableInfo>();

	for (const tableName of tableNames) {
		tableName_tableInfo_map.set(
			tableName,
			getTableInfo(tableName, data, tableName_tableConfig_map.get(tableName)),
		);
	}

	return tableName_tableInfo_map;
};

const getTableInfo = (tableNameLong: string, data: TableData, tableConfig?: TableConfig) => {
	const tableInfo: TableInfo = {
		tableName: tableNameLong,
		modelName: getSequelizeModelName(tableNameLong),
		tableConfig: tableConfig,
		primaryKeys: [],
		fieldName_primaryField_map: new Map<string, PrimaryFieldInfo>(),
		fieldName_associatedField_map: new Map<string, AssociatedFieldInfo>(),
	};

	const table = data.tables[tableNameLong];

	// current-to-other
	data.relations.forEach((rel) => {
		if (!rel.isM2M) {
			if (rel.childTable === tableNameLong) {
				// child-to-parent
				if (rel.isOne) {
					// one-to-one
					// const parentIdSnake = _.snakeCase(rel.parentId);
					// tableInfo.fieldName_associatedField_map.set(rel.parentProp, {
					// 	fieldName: rel.parentProp,
					// 	tableName: rel.parentTable,
					// 	modelName: getSequelizeModelName(rel.parentTable),
					// 	fieldNameOnChild: rel.parentId,
					// 	fieldNameOnParent: rel.childId,
					// 	isArray: false,
					// 	isNullable: table[parentIdSnake].allowNull,
					// });

					throw Error("@TODO one-to-one not implemented yet for gsa");
				} else {
					// many-to-one
					// current table is a child that belongsTo parent
					const parentIdSnake = _.snakeCase(rel.parentId);
					tableInfo.fieldName_associatedField_map.set(rel.parentProp, {
						fieldName: rel.parentProp,
						tableName: rel.parentTable,
						modelName: getSequelizeModelName(rel.parentTable),
						fieldNameOnChild: rel.parentId,
						fieldNameOnParent: rel.childId,
						isArray: false,
						isNullable: table[parentIdSnake].allowNull,
					});
				}
			} else if (rel.parentTable === tableNameLong) {
				// parent-to-child
				if (rel.isOne) {
					// one-to-one
					// tableInfo.fieldName_associatedField_map.set(rel.childProp, {
					// 	fieldName: rel.childProp,
					// 	tableName: rel.childTable,
					// 	modelName: getSequelizeModelName(rel.childTable),
					// 	fieldNameOnChild: rel.parentId,
					// 	fieldNameOnParent: rel.childId,
					// 	isArray: false,
					// 	isNullable: true,
					// });

					throw Error("@TODO one-to-one not implemented yet for gsa");
				} else {
					// one-to-many
					const lur = Utils.pluralize(rel.childProp);
					tableInfo.fieldName_associatedField_map.set(lur, {
						fieldName: lur,
						tableName: rel.childTable,
						modelName: getSequelizeModelName(rel.childTable),
						fieldNameOnChild: rel.parentId,
						fieldNameOnParent: rel.childId,
						isArray: true,
						isNullable: false,
					});
				}
			}
		} else {
			// rel.isM2M
			if (rel.parentTable === tableNameLong) {
				// many-to-many
				// const isParent = rel.parentTable === tableNameLong;
				// const otherTable = isParent ? rel.childTable : rel.parentTable;
				// const lotherModelPlural = Utils.pluralize(isParent ? rel.childProp : rel.parentProp);
				// // str += `${sp}// ${thisModel} belongsToMany ${otherModel} via ${rel.parentId} and ${rel.childId}\n`;
				// tableInfo.fieldName_associatedField_map.set(lotherModelPlural, {
				// 	fieldName: lotherModelPlural,
				// 	tableName: otherTable,
				// 	modelName: getSequelizeModelName(otherTable),
				// 	isArray: true,
				// 	isNullable: false,
				// });

				throw Error("@TODO many-to-many not implemented yet for gsa");
			}
		}
	});

	for (const columnName of Object.keys(table)) {
		const columnDescription = table[columnName];
		const fieldName = recaseColumnNameToFieldName(columnName);
		tableInfo.fieldName_primaryField_map.set(recaseColumnNameToFieldName(columnName), {
			fieldName,
			columnName,
			columnDescription,
		});
		if (columnDescription.primaryKey) {
			tableInfo.primaryKeys.push(recaseColumnNameToFieldName(columnName));
		}
	}

	if (
		tableConfig &&
		tableConfig.aliasConfigs.some(
			(aliasConfig) => aliasConfig.edit && aliasConfig.remove?.isEnabled === true,
		) &&
		tableInfo.primaryKeys.length === 0
	) {
		throw new Error(
			`Table ${tableNameLong} doesn't have a primary key. A primary key is required for edit and remove`,
		);
	}

	if (tableConfig?.additionalAssociations) {
		for (const additionalAssociation of tableConfig.additionalAssociations) {
			const associatedTable = data.tables[additionalAssociation.name];
			if (table as any) {
				const columnDescription = table[additionalAssociation.foreignKey];
				if (!(columnDescription as any)) {
					throw new Error(
						`Table ${tableNameLong} does not have a fieldName ${additionalAssociation.foreignKey}`,
					);
				}

				const associatedTableColumnDescription =
					associatedTable[additionalAssociation.referenceKey];
				if (!(associatedTableColumnDescription as any)) {
					throw new Error(
						`Table ${associatedTable.name} does not have a fieldName ${additionalAssociation.referenceKey}`,
					);
				}

				// @TODO things like additionalAssociation.isNullable can be omitted because columnDescription already has that info
				tableInfo.fieldName_associatedField_map.set(additionalAssociation.fieldName, {
					fieldName: additionalAssociation.foreignKey,
					tableName: additionalAssociation.name,
					modelName: getSequelizeModelName(additionalAssociation.name),
					fieldNameOnChild: additionalAssociation.foreignKey, // the view is the child
					fieldNameOnParent: additionalAssociation.referenceKey,
					isArray: false, // the view is the child
					isNullable: additionalAssociation.isNullable,
				});
			} else {
				throw new Error(`Table ${associatedTable.name} doesn't exist`);
			}
		}
	}

	return tableInfo;
};

function recaseColumnNameToFieldName(val: string) {
	return _.camelCase(val);
}

function getSequelizeModelName(tableName: string) {
	const tableNameShort = tableName.split(".")[1];
	return upperFirst(camelCase(tableNameShort));
}

export default getTableInfos;