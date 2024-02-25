import { ColumnDescription } from "sequelize";
import { FilterOperators, GsaGraphQLTypes } from "./enums";

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
	 * For mysql, include the database name eg. mydb.users
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
	skipTables?: string[];
	/**
	 * Warning instead of error
	 */
	isOneToOneWarning?: boolean;
	/**
	 * Warning instead of error
	 */
	isManyToManyWarning?: boolean;
	tableConfigs: TableConfig[];
}

// ---------------------------------------------- getTableInfos

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

// ---------------------------------------------- generateMappings

export interface GsaMappings {
	aliasName_tableName_objectMap: { [aliasName: string]: string };
	tableName_tableInfo_objectMap: { [tableName: string]: TableInfoObjectMap };
}
