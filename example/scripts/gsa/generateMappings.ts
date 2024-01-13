import { TableInfoObjectMap } from "./getTableInfos";

export interface GsaMappings {
	aliasName_tableName_objectMap: { [aliasName: string]: string };
	tableName_tableInfo_objectMap: { [tableName: string]: TableInfoObjectMap };
}

const generateMappings = (
	aliasName_tableName_objectMap: { [aliasName: string]: string },
	tableName_tableInfo_objectMap: { [tableName: string]: TableInfoObjectMap },
) => {
	const mappings: GsaMappings = {
		aliasName_tableName_objectMap,
		tableName_tableInfo_objectMap,
	};

	return JSON.stringify(mappings);
};

export default generateMappings;
