import { AssociatedFieldInfo, PrimaryFieldInfo, TableInfo, TableInfoObjectMap } from "./types";

/**
 * Map<T, U> to { [key: T]: U }
 */
const mapToObjectMap = (
	aliasName_tableName_map: Map<string, string>,
	tableName_tableInfo_map: Map<string, TableInfo>,
) => {
	const aliasName_tableName_objectMap: { [aliasName: string]: string } = {};
	const tableName_tableInfo_objectMap: { [tableName: string]: TableInfoObjectMap } = {};

	// sort to reduce git changes
	const aliasNamesSorted = [...aliasName_tableName_map.keys()].sort((a, b) => {
		if (a > b) {
			return 1;
		} else if (a < b) {
			return -1;
		} else {
			return 0;
		}
	});

	for (const aliasName of aliasNamesSorted) {
		aliasName_tableName_objectMap[aliasName] = aliasName_tableName_map.get(aliasName)!;
	}

	// sort to reduce git changes
	const tableNamesSorted = [...tableName_tableInfo_map.keys()].sort((a, b) => {
		if (a > b) {
			return 1;
		} else if (a < b) {
			return -1;
		} else {
			return 0;
		}
	});

	for (const tableName of tableNamesSorted) {
		const tableInfo = tableName_tableInfo_map.get(tableName)!;

		// sort to reduce git changes
		const primaryFieldNamesSorted = [...tableInfo.fieldName_primaryField_map.keys()].sort(
			(a, b) => {
				if (a > b) {
					return 1;
				} else if (a < b) {
					return -1;
				} else {
					return 0;
				}
			},
		);

		// sort to reduce git changes
		const associatedFieldNamesSorted = [...tableInfo.fieldName_associatedField_map.keys()].sort(
			(a, b) => {
				if (a > b) {
					return 1;
				} else if (a < b) {
					return -1;
				} else {
					return 0;
				}
			},
		);

		const tableInfoCertain: TableInfoObjectMap = {
			tableName: tableInfo.tableName,
			modelName: tableInfo.modelName,
			tableConfig: tableInfo.tableConfig,
			primaryKeys: tableInfo.primaryKeys,
			fieldName_primaryField_map: primaryFieldNamesSorted.reduce<{
				[fieldName: string]: PrimaryFieldInfo;
			}>((fieldName_primaryField_map, primaryFieldName) => {
				const primaryField = tableInfo.fieldName_primaryField_map.get(primaryFieldName)!;

				return {
					...fieldName_primaryField_map,
					[primaryFieldName]: primaryField,
				};
			}, {}),
			fieldName_associatedField_map: associatedFieldNamesSorted.reduce<{
				[fieldName: string]: AssociatedFieldInfo;
			}>((fieldName_associatedField_map, associatedFieldName) => {
				const associatedField = tableInfo.fieldName_associatedField_map.get(associatedFieldName)!;

				return {
					...fieldName_associatedField_map,
					[associatedFieldName]: associatedField,
				};
			}, {}),
		};
		tableName_tableInfo_objectMap[tableName] = tableInfoCertain;
	}

	return {
		aliasName_tableName_objectMap,
		tableName_tableInfo_objectMap,
	};
};

export default mapToObjectMap;
