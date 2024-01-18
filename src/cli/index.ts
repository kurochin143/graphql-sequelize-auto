#!/usr/bin/env node

import SequelizeAuto from "sequelize-auto";
import fse from "fs-extra";
import generateGraphQLTypes from "./generateGraphQLTypes";
import generateGraphQLSchema from "./generateGraphQLSchema";
import getTableInfos from "./getTableInfos";
import path from "path";
import generateMappings from "./generateMappings";
import addAdditionalRelations from "./addAdditionalAssociations";
import validateConfigs from "./validateConfigs";
import mapToObjectMap from "./mapToObjectMap";
import { program } from "commander";
import * as tsNode from "ts-node";
import { GsaConfig, TableConfig } from "./types";

interface Options {
	configFilePath: string;
}

const parseOptions = () => {
	program.requiredOption("-c, --configFilePath <string>", "config file path relative to cwd");
	program.parse();
	return program.opts<Options>();
};

const SEQUELIZE_AUTO_DIR = "sequelize";

tsNode.register();

(() => {
	const options = parseOptions();

	const gsaConfig: GsaConfig = require(path.resolve(options.configFilePath)).default;

	const codeFilesDir = path.resolve(gsaConfig.codeFilesDir);
	const sequelizeAutoDir = path.join(codeFilesDir, SEQUELIZE_AUTO_DIR);

	const auto = new SequelizeAuto(gsaConfig.database, gsaConfig.username, gsaConfig.password, {
		host: gsaConfig.host,
		port: typeof gsaConfig.port === "number" ? gsaConfig.port : parseInt(gsaConfig.port),
		dialect: gsaConfig.dialect,
		directory: sequelizeAutoDir,
		caseModel: "p", // snake to pascal
		caseFile: "p", // snake to pascal
		caseProp: "c", // snake to camel
		lang: "ts", // typescript
		spaces: false,
		indentation: 1,
		singularize: false,
		typeOverrides: {
			nullableFieldType: "NULL",
		},
		useDefine: true,
		additional: {
			timestamps: false, // include createdAt and updatedAt in initModel
		},
		views: true,
		skipTables: gsaConfig.skipTables,
	});

	void auto.run().then(async (data) => {
		try {
			const nonCodeFilesDir = path.resolve(gsaConfig.nonCodeFilesDir);

			const tableName_tableConfig_map = new Map<string, TableConfig>();
			for (const tableConfig of gsaConfig.tableConfigs) {
				tableName_tableConfig_map.set(tableConfig.name, tableConfig);
			}

			const tableName_tableInfo_map = getTableInfos(data, tableName_tableConfig_map);
			const validateRes = validateConfigs(gsaConfig.tableConfigs, tableName_tableInfo_map);

			// uncertainMap to certainMap
			const { aliasName_tableName_objectMap, tableName_tableInfo_objectMap } = mapToObjectMap(
				validateRes.aliasName_tableName_map,
				tableName_tableInfo_map,
			);

			// schema
			const graphqlSchemaStr = generateGraphQLSchema(
				tableName_tableInfo_map,
				gsaConfig.tableConfigs,
			);
			fse.outputFileSync(nonCodeFilesDir + "/schema.generated.gql", graphqlSchemaStr);

			// graphql ts
			const graphqlTsDir = path.join(codeFilesDir, "./graphql.generated.ts");
			const schemaStrs: string[] = [graphqlSchemaStr];
			if (gsaConfig.additionalGqlSchemas) {
				for (const additionalGqlSchema of gsaConfig.additionalGqlSchemas) {
					const additionalGqlSchemaFull = path.resolve(additionalGqlSchema);
					const additionalGqlSchemaStr = fse.readFileSync(additionalGqlSchemaFull).toString();
					schemaStrs.push(additionalGqlSchemaStr);
				}
			}
			fse.outputFileSync(
				graphqlTsDir,
				await generateGraphQLTypes(schemaStrs.join("\n"), graphqlTsDir),
			);

			// mappings
			const mappingsStr = generateMappings(
				aliasName_tableName_objectMap,
				tableName_tableInfo_objectMap,
			);
			fse.outputFileSync(nonCodeFilesDir + "/mappings.generated.json", mappingsStr);

			addAdditionalRelations(sequelizeAutoDir, gsaConfig.tableConfigs);
		} catch (err) {
			console.error(err);
		}
	});
})();
