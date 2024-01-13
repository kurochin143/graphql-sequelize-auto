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

export enum GsaGraphQLTypes {
	String = "String",
	Int = "Int",
	Float = "Float",
	Boolean = "Boolean",
	Date = "Date",
	NullableString = "NullableString", // generates (string | null) type
	NullableInt = "NullableInt",
	NullableFloat = "NullableFloat",
	NullableBoolean = "NullableBoolean",
	NullableDate = "NullableDate",
}

export interface InputCustomFieldConfig {
	name: string;
	type: GsaGraphQLTypes | string;
	// @TODO validate, XNullable cannot be isOptional false. Others, such as String, can be isOptional true/false
	isOptional: boolean; // generates (xtype | undefined)
}

export interface InputCustomFieldsConfig {
	isOptional: boolean;
	fields: InputCustomFieldConfig[];
}

export interface OutputPrimaryFieldsConfig {
	include: string[];
	// exclude?: string[]; // @TODO
}

export interface InputPrimaryFieldsConfig {
	/**
	 * * If undefined, will use primaryFields nullability to determine whether primaryFields is optional,
	 * * If any of the primaryFields is non-nullable, then primaryFields is not optional
	 */
	isOptional?: boolean;

	include: string[];
	// exclude?: string[]; // @TODO
}

export enum FilterOperators {
	Equal = "EQUAL",
	NotEqual = "NOT_EQUAL",
	GreaterThan = "GREATER_THAN",
	GreaterThanOrEqual = "GREATER_THAN_OR_EQUAL",
	LessThan = "LESS_THAN",
	LessThanOrEqual = "LESS_THAN_OR_EQUAL",
	Like = "LIKE",
	ILike = "I_LIKE",
}

// @NOTE is not using "[fieldName: string]: Config" to prevent fieldName conflict
/**
 * * `operators` and `filterFields` must be undefined for dynamic json field filter (postgres only)
 * * @TODO static json field filter
 */
export interface FilterFieldConfig {
	name: string;

	/**
	 * * If defined, implies that `FilterFieldConfig` is for a `primaryField`
	 */
	operators?: FilterOperators[];

	/**
	 * * If defined, implies that `FilterFieldConfig` is for an `associatedField`
	 */
	filterFields?: FilterFieldConfig[];
}

export interface SortByFieldConfig {
	name: string;
	sortByFields?: SortByFieldConfig[];
}

export interface GetInputConfig {
	filterFields?: FilterFieldConfig[];
	sortByFields?: SortByFieldConfig[];

	/**
	 * true if `undefined`
	 */
	canPaginate?: boolean;

	customFields?: InputCustomFieldsConfig;
}

export interface GetOutputConfig {
	primaryFields?: OutputPrimaryFieldsConfig;
	associatedFields?: GetAssociatedFieldConfig[];
}

export interface GetAssociatedFieldConfig {
	name: string;
	/**
	 * GraphQL type name from `TableAliasConfig.name`
	 */
	aliasName: string;
}

export interface AddAssociatedFieldConfig {
	name: string;
	isOptional: boolean;
	input?: AddInputConfig;
}

export interface AddOrEditOrRemoveAssociatedFieldConfig {
	name: string;
	isOptional: boolean;
	input?: EditInputConfig;
}

export interface AddInputConfig {
	customFields?: InputCustomFieldsConfig;
	primaryFields?: InputPrimaryFieldsConfig;
	associatedFields?: AddAssociatedFieldConfig[];
}

export interface AddOutputConfig {
	primaryFields?: OutputPrimaryFieldsConfig;
	associatedFields?: GetAssociatedFieldConfig[];
}

export interface EditInputConfig {
	customFields?: InputCustomFieldsConfig;
	primaryFields?: InputPrimaryFieldsConfig;
	associatedFields?: AddOrEditOrRemoveAssociatedFieldConfig[];
}

export interface EditOutputConfig {
	// @TODO
}

export interface GetConfig {
	/**
	 * * Will not create a query
	 * * Used for when you only want this for other alias' `get`.`output`.`associatedFields`.`aliasName`
	 */
	isTypeOnly?: boolean;

	input?: GetInputConfig;
	output: GetOutputConfig;
}

export interface AddConfig {
	input?: AddInputConfig;

	/**
	 * Will return an Int! if undefined
	 */
	output?: AddOutputConfig;
}

export interface EditConfig {
	input?: EditInputConfig;

	/**
	 * Will return an Int! if undefined
	 */
	output?: EditOutputConfig;
}

export interface RemoveConfig {
	isEnabled: boolean;
}

// @TODO def
/**
 * Currently always treats the associated table as a parent
 */
export interface AdditionalAssociationConfig {
	/**
	 * * The associated table name
	 * * Table name from the db including schema eg. public.users
	 */
	name: string;

	// @TODO this can be auto generate like sequelize-auto
	/**
	 * * The name in the graphql type
	 */
	fieldName: string;

	/**
	 * * Column name
	 */
	foreignKey: string;

	/**
	 * * Column name
	 */
	referenceKey: string;

	isNullable: boolean;
}

export interface TableAliasConfig {
	/**
	 * Will be used as the GraphQL `type` name. Preferably PascalCase
	 */
	name: string;

	/**
	 * * Will be used for CRUD naming eg. `Users = getUsers`. Will use a pluralize function if undefined
	 * * Note that words like sheep doesn't have a different pluralize form
	 * */
	pluralName?: string;

	get?: GetConfig;
	add?: AddConfig;
	edit?: EditConfig;
	remove?: RemoveConfig;
}

export interface TableConfig {
	/**
	 * Table name from the db including schema eg. public.users
	 */
	name: string;
	aliasConfigs: TableAliasConfig[]; // @TODO rename all the word "alias" to graphqlType because it's ambiguous with db alias
	additionalAssociations?: AdditionalAssociationConfig[];
}

export interface GsaConfig {
	database: string;
	username: string;
	password: string;
	host: string;
	port: string | number;
	/**
	 * * Dir where ts/js files will be created to
	 * * path.resolve
	 */
	codeFilesDir: string;
	/**
	 * * Dir where gql and json files will be created to
	 * * path.resolve
	 */
	nonCodeFilesDir: string;
	/**
	 * * path.resolve
	 */
	additionalGqlSchemas?: string[];
	dialect: "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql";
	tableConfigs: TableConfig[];
	skipTables?: string[];
}

interface Options {
	configFilePath: string;
}

const parseOptions = () => {
	program.requiredOption("-c, --configFilePath <string>", "config file path relative to cwd");
	program.parse();
	return program.opts<Options>();
};

const SEQUELIZE_AUTO_DIR = "sequelize";

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
