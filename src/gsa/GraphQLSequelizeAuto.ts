import { GraphQLResolveInfo } from "graphql";
import { parseResolveInfo, ResolveTree } from "graphql-parse-resolve-info";
import { AssociatedFieldInfo, PrimaryFieldInfo, TableInfoObjectMap } from "../cli/getTableInfos";
import { IncludeOptions, Op, Order, Sequelize, Transaction, Utils, WhereOptions } from "sequelize";
import { camelCase, snakeCase, upperFirst } from "lodash";
import fse from "fs-extra";
import { GsaMappings } from "../cli/generateMappings";

// @TODO rename to replace GraphQL in types with Gsa

export type GraphQLValueType = string | number | boolean | Date | object | null;

// get
export enum GraphQLFilterOperators {
	Equal = "EQUAL",
	NotEqual = "NOT_EQUAL",
	GreaterThan = "GREATER_THAN",
	GreaterThanOrEqual = "GREATER_THAN_OR_EQUAL",
	LessThan = "LESS_THAN",
	LessThanOrEqual = "LESS_THAN_OR_EQUAL",
	Like = "LIKE",
	ILike = "I_LIKE",
}

export interface GraphQLFilterField {
	val?: GraphQLValueType; // undefined is considered null by sequelize
	op: GraphQLFilterOperators | string; // @TODO string to allow generated ts to be used directly. The best fix would be to generate this file to include the generated ts
}

export interface GraphQLFilterJsonField {
	name: string;
	val: string;
	op: GraphQLFilterOperators | string;
}

export type GraphQLFilterFields = {
	[fieldName: string]: GraphQLFilterField | GraphQLFilterJsonField | GraphQLFilterFields;
};

export interface GraphQLFilter {
	fields?: GraphQLFilterFields;
	and?: GraphQLFilter[];
	or?: GraphQLFilter[];
}

export interface GraphQLSortBy {
	name: string;
	isDesc?: boolean;
}

export interface GraphQLJsonFieldSortBy {
	sortByName: string;
	jsonFieldName: string;
	isDesc?: boolean;
	index: number;
}

export interface GraphQLPagination {
	offset?: number;
	limit?: number;
}

export interface GraphQLGetInput {
	filter?: GraphQLFilter;
	sortBys?: GraphQLSortBy[];
	jsonFieldSortBys?: GraphQLJsonFieldSortBy[];
	pagination?: GraphQLPagination;
}

export interface GraphQLGetArgs {
	input?: GraphQLGetInput;
}

// add
export type GraphQLAddPrimaryFields = {
	[fieldName: string]: GraphQLValueType;
};

export type GraphQLAddAssociatedFields = {
	[fieldName: string]: GraphQLAddInput[] | GraphQLAddInput | null;
};

export interface GraphQLAddInput {
	primaryFields?: GraphQLAddPrimaryFields;
	associatedFields?: GraphQLAddAssociatedFields;
}

export interface GraphQLAddAllInput {
	inputs: GraphQLAddInput[];
}

export interface GraphQLAddAllArgs {
	input: GraphQLAddAllInput;
}

// edit
export type GraphQLEditPrimaryKeys = {
	[fieldName: string]: GraphQLValueType;
};

export type GraphQLEditPrimaryFields = {
	[fieldName: string]: GraphQLValueType;
};

export type GraphQLEditAssociatedFields = {
	[fieldName: string]: GraphQLEditOrAddInput[] | GraphQLEditOrAddInput | null;
};

export interface GraphQLEditInput {
	primaryKeys: GraphQLEditPrimaryKeys;
	primaryFields?: GraphQLEditPrimaryFields;
	associatedFields?: GraphQLEditAssociatedFields;
}

export interface GraphQLEditOrAddInput {
	primaryKeys?: GraphQLEditPrimaryKeys;
	primaryFields?: GraphQLEditPrimaryFields;
	associatedFields?: GraphQLEditAssociatedFields;
}

export interface GraphQLEditAllInput {
	inputs: GraphQLEditInput[];
}

export interface GraphQLEditAllArgs {
	input: GraphQLEditAllInput;
}

// remove
export type GraphQLRemovePrimaryKeys = {
	[fieldName: string]: GraphQLValueType;
};

export interface GraphQLRemoveAllInput {
	primaryKeysList: GraphQLRemovePrimaryKeys[];
}

export interface GraphQLRemoveAllArgs {
	input: GraphQLRemoveAllInput;
}

export type Additionals = {
	[fieldName: string]: Additionals | boolean;
};

export type GraphQLSequelizeInsertAllOutput<T> = {
	rows: T[];
} | null;

/**
 * @NOTE do not use gsaConfig here
 * Does not validate fieldNames etc
 *
 * @TODO
 *  - getEditAll, getRemoveAll
 *  - edit/delete by primaryKeys only (in the generator only, not here)
 * 	- orderByAdditionals
 *  - test getAll 'count' with associated filter
 */
export class GraphQLSequelizeAuto {
	private _sequelize: Sequelize;
	private _aliasName_tableName_objectMap: { [aliasName: string]: string };
	private _tableName_tableInfo_objectMap: { [tableName: string]: TableInfoObjectMap };

	constructor(sequelize: Sequelize, mappingsJsonFilePath: string) {
		this._sequelize = sequelize;

		const mappingsStr = fse.readFileSync(mappingsJsonFilePath).toString();
		const mappings = JSON.parse(mappingsStr) as GsaMappings;

		this._aliasName_tableName_objectMap = mappings.aliasName_tableName_objectMap;
		this._tableName_tableInfo_objectMap = mappings.tableName_tableInfo_objectMap;
	}

	/**
	 * * @additionals eg. pets: { petBreeds: { petId: true }, ownerId: true }. It is used to add an includeable that is not part of "@graphqlResolveInfo"
	 * * @separators Separates query into multiple calls. eg ["userUserRoles.role.rolePermissions", "userUserRoles.role.rolePermissions.permission.rolePermissions"]
	 * * will separate the query to userUserRoles.role and rolePermissions.permission.rolePermissions, and also separate to rolePermissions.permission and rolePermissions,
	 * * separating into 3 queries, (userUserRoles.role., rolePermissions.permission, rolePermissions).
	 * * The first field(userUserRoles) is the field of the main table.
	 * * Only hasMany(array) can be separated(must be at the end of the separation chain).
	 * * Use case is when nesting is too deep it causes error because of max alias length.
	 * * @maxLimit max limit for pagination. Default is 100. 0 means no maxLimit
	 **/
	public async getAll<T>(
		args: GraphQLGetArgs | undefined,
		graphqlResolveInfo: GraphQLResolveInfo,
		options?: {
			transaction?: Transaction;
			additionals?: Additionals;
			separators?: Set<string>;
			maxLimit?: number;
		},
	) {
		return await this._sequelize.transaction(
			{
				transaction: options?.transaction,
			},
			async (t) => {
				return await this.graphqlSequelizeFindAll<T>(args, graphqlResolveInfo, t, {
					additionals: options?.additionals,
					separators: options?.separators,
					maxLimit: options?.maxLimit ?? 100,
				});
			},
		);
	}

	public async addAll<T>(
		args: GraphQLAddAllArgs,
		graphqlResolveInfo: GraphQLResolveInfo,
		options?: {
			transaction?: Transaction;
			additionalPrimaryFieldsOnAdd: GraphQLAddPrimaryFields;
		},
	) {
		return await this._sequelize.transaction(
			{
				transaction: options?.transaction,
			},
			async (t) => {
				return await this.graphqlSequelizeInsertAll<T>(args, graphqlResolveInfo, t, {
					additionalPrimaryFieldsOnAdd: options?.additionalPrimaryFieldsOnAdd,
				});
			},
		);
	}

	public async editAll(
		args: GraphQLEditAllArgs,
		graphqlResolveInfo: GraphQLResolveInfo,
		options?: {
			transaction?: Transaction;
			additionalPrimaryFieldsOnEdit?: GraphQLAddPrimaryFields;
			additionalPrimaryFieldsOnAdd?: GraphQLAddPrimaryFields;
		},
	) {
		return await this._sequelize.transaction(
			{
				transaction: options?.transaction,
			},
			async (t) => {
				return await this.graphqlSequelizeUpdateAll(args, graphqlResolveInfo, t, {
					additionalPrimaryFieldsOnEdit: options?.additionalPrimaryFieldsOnEdit,
					additionalPrimaryFieldsOnAdd: options?.additionalPrimaryFieldsOnAdd,
				});
			},
		);
	}

	public async removeAll(
		args: GraphQLRemoveAllArgs,
		graphqlResolveInfo: GraphQLResolveInfo,
		options?: {
			transaction?: Transaction;
		},
	) {
		return await this._sequelize.transaction(
			{
				transaction: options?.transaction,
			},
			async (t) => {
				await this.graphqlSequelizeDestroyAll(args, graphqlResolveInfo, t);
			},
		);
	}

	/**
	 * Helper function to get all rows to be edited
	 */
	public async getEditAll<T>(
		args: GraphQLEditAllArgs,
		graphqlResolveInfo: GraphQLResolveInfo,
		options?: {
			transaction?: Transaction;
		},
	) {
		return await this._sequelize.transaction(
			{
				transaction: options?.transaction,
			},
			async (t) => {
				return await this.graphqlSequelizeFindAllUpdate<T>(args, graphqlResolveInfo, t);
			},
		);
	}

	/**
	 * Helper function to get all rows to be removed
	 */
	public async getRemoveAll<T>(
		args: GraphQLRemoveAllArgs,
		graphqlResolveInfo: GraphQLResolveInfo,
		options?: {
			transaction?: Transaction;
		},
	) {
		return await this._sequelize.transaction(
			{
				transaction: options?.transaction,
			},
			async (t) => {
				return await this.graphqlSequelizeFindAllDestroy<T>(args, graphqlResolveInfo, t);
			},
		);
	}

	private graphqlSequelizeFindAll = async <T>(
		args: GraphQLGetArgs | undefined,
		graphqlResolveInfo: GraphQLResolveInfo,
		transaction: Transaction,
		options: {
			additionals?: Additionals;
			separators?: Set<string>;
			maxLimit: number;
		},
	): Promise<{
		count: number;
		rows: T[];
	}> => {
		const parsedResolveInfoFragment = parseResolveInfo(graphqlResolveInfo) as ResolveTree;
		const returnTypeName = Object.keys(parsedResolveInfoFragment.fieldsByTypeName)[0];
		const rowsResolveTree = parsedResolveInfoFragment.fieldsByTypeName[returnTypeName]["rows"] as
			| ResolveTree
			| undefined;
		if (rowsResolveTree) {
			let rowTypeName = Object.keys(rowsResolveTree.fieldsByTypeName)[0];
			const rowTypeResolveTree = rowsResolveTree.fieldsByTypeName[rowTypeName];

			const baseTableName = this._aliasName_tableName_objectMap[rowTypeName];

			let whereAdditionals: Additionals | undefined;
			let whereOptions: WhereOptions<any> | undefined;
			let order: Order | undefined;
			let offset: number | undefined;
			let limit: number | undefined;
			if (args?.input) {
				if (args.input.filter) {
					whereAdditionals = {};
					whereOptions = this.graphqlFilterToSequelizeWhereOptions_Recursive(
						whereAdditionals,
						baseTableName,
						"",
						args.input.filter,
					);
				}

				if (args.input.sortBys || args.input.jsonFieldSortBys) {
					order = this.graphqlResolveInfoToSequelizeOrder(
						args.input.sortBys,
						args.input.jsonFieldSortBys,
					);
				}

				if (args.input.pagination) {
					offset = args.input.pagination.offset;
					if (args.input.pagination.limit !== undefined) {
						if (options.maxLimit !== 0) {
							limit = Math.min(args.input.pagination.limit, options.maxLimit);
						} else {
							if (args.input.pagination.limit !== 0) {
								limit = args.input.pagination.limit;
							} // else no limit
						}
					} else {
						if (options.maxLimit !== 0) {
							limit = options.maxLimit;
						} // else no limit
					}
				} else {
					if (options.maxLimit !== 0) {
						limit = options.maxLimit;
					} // else no limit
				}
			}

			const includes = this.graphqlResolveInfoToSequelizeIncludes_Recursive(
				baseTableName,
				"",
				rowTypeResolveTree,
				whereAdditionals,
				options.additionals,
				options.separators,
			);

			const tableInfo = this._tableName_tableInfo_objectMap[baseTableName];

			const model = this._sequelize.models[tableInfo.modelName];
			const res = (await model.findAndCountAll({
				distinct: true, // correct count for many relations
				...includes,
				where: whereOptions,
				order,
				offset,
				limit,
				transaction,
			})) as {
				count: number;
				rows: T[];
			};

			return res;
		} else {
			throw Error("Must query rows");
		}
	};

	private graphqlResolveInfoToSequelizeIncludes_Recursive = (
		tableName: string,
		depthName: string,
		resolveTrees?: {
			[key: string]: ResolveTree;
		}, // may not exist because it's an additional
		whereAdditionals?: Additionals,
		additionals?: Additionals,
		separators?: Set<string>,
	) => {
		const tableInfo = this._tableName_tableInfo_objectMap[tableName];

		const include: IncludeOptions[] = [];
		const attributes: string[] = [];

		const fieldNames = new Set(resolveTrees ? Object.keys(resolveTrees) : []);

		if (whereAdditionals) {
			GraphQLSequelizeAuto.appendAdditionalsToFieldNames(fieldNames, whereAdditionals);
		}

		if (additionals) {
			GraphQLSequelizeAuto.appendAdditionalsToFieldNames(fieldNames, additionals);
		}

		for (const fieldName of fieldNames) {
			// field eg. user
			const associatedFieldInfo = tableInfo.fieldName_associatedField_map[fieldName] as
				| AssociatedFieldInfo
				| undefined;
			if (associatedFieldInfo) {
				const newDepthName = depthName + (depthName !== "" ? "." : "") + fieldName;

				let newResolveTrees:
					| {
							[key: string]: ResolveTree;
					  }
					| undefined;
				if (resolveTrees) {
					const associatedFieldResolveTrees = resolveTrees[fieldName] as ResolveTree | undefined;
					if (associatedFieldResolveTrees) {
						const associatedFieldAliasName = Object.keys(
							associatedFieldResolveTrees.fieldsByTypeName,
						)[0];
						newResolveTrees =
							associatedFieldResolveTrees.fieldsByTypeName[associatedFieldAliasName];
					}
				}

				const sequelizeModel = this._sequelize.models[associatedFieldInfo.modelName];

				const associatedFieldWhereAdditionals = whereAdditionals?.[fieldName] as
					| Additionals
					| undefined;

				const sequelizeIncludes = this.graphqlResolveInfoToSequelizeIncludes_Recursive(
					associatedFieldInfo.tableName,
					newDepthName,
					newResolveTrees,
					associatedFieldWhereAdditionals,
					additionals?.[fieldName] as Additionals | undefined,
					separators,
				);

				include.push({
					model: sequelizeModel,
					as: fieldName,
					// must be true if included in the where
					// Rationale
					// 	- this is the same as "$tableName.foreign_id$": { [Op.ne]: null }
					// 	- it doesn't make sense to use a where on a null, it will always be false
					// must be false if isArray because it will return null for the base table if there are no associated rows instead of an empty array
					required:
						!!associatedFieldWhereAdditionals &&
						Object.keys(associatedFieldWhereAdditionals).length === 0 &&
						!associatedFieldInfo.isArray,
					...sequelizeIncludes,
					separate: separators?.has(newDepthName),
				});
			} else {
				const primaryFieldInfo = tableInfo.fieldName_primaryField_map[fieldName] as
					| PrimaryFieldInfo
					| undefined;

				if (primaryFieldInfo) {
					attributes.push(fieldName);
				}
			}
		}

		const ret: {
			include?: IncludeOptions[];
			attributes?: string[];
		} = {};

		// not important, this works with empty array, it's just to be consistent with how attributes is set
		if (include.length !== 0) {
			ret.include = include;
		}

		// this is important. attributes need to be inexistent if empty
		// empty attributes will return an undefined array associatedField instead of empty array
		// undefined attributes will throw an error
		if (attributes.length !== 0) {
			ret.attributes = attributes;
		}
		return ret;
	};

	private static appendAdditionalsToFieldNames = (
		fieldNames: Set<string>,
		additionals: Additionals,
	) => {
		let additionalFields: string[] = [];
		if (typeof additionals === "boolean") {
			additionalFields.push(additionals);
		} else {
			additionalFields = additionalFields.concat(Object.keys(additionals));
		}

		for (const additionalField of additionalFields) {
			fieldNames.add(additionalField);
		}
	};

	private graphqlFilterToSequelizeWhereOptions_Recursive = (
		whereAdditionals: Additionals,
		tableName: string,
		depthName: string,
		filter: GraphQLFilter,
	): WhereOptions<any> => {
		// fieldsWhere = [
		// 	{
		// 		id: {
		// 			[Op.eq]: 1,
		// 		},
		// 	},
		// 	{
		// 		"$pets.pet_breeds.id$": {
		// 			[Op.eq]: 1,
		// 		},
		// 	},
		// 	{
		// 		"$pets.pet_breeds.breed.name$": {
		// 			[Op.iLike]: "%corgi%",
		// 		},
		// 	},
		// ];

		const where: WhereOptions<any> = {
			[Op.and]: [],
		};

		if (filter.fields) {
			where[Op.and].push(
				this.graphqlFilterFieldsToSequelizeWhereOptions_Recursive(
					whereAdditionals,
					tableName,
					depthName,
					filter.fields,
				),
			);
		}
		if (filter.and) {
			where[Op.and].push({
				[Op.and]: filter.and.map((and) => {
					return this.graphqlFilterToSequelizeWhereOptions_Recursive(
						whereAdditionals,
						tableName,
						depthName,
						and,
					);
				}),
			});
		}
		if (filter.or) {
			where[Op.and].push({
				[Op.or]: filter.or.map((or) => {
					return this.graphqlFilterToSequelizeWhereOptions_Recursive(
						whereAdditionals,
						tableName,
						depthName,
						or,
					);
				}),
			});
		}

		return where;
	};

	private graphqlFilterFieldsToSequelizeWhereOptions_Recursive = (
		whereAdditionals: Additionals,
		tableName: string,
		depthName: string,
		filterFields: GraphQLFilterFields,
	): WhereOptions<any> => {
		const tableInfo = this._tableName_tableInfo_objectMap[tableName];

		const where: WhereOptions<any> = {
			[Op.and]: [],
		};
		const fieldNames = Object.keys(filterFields);
		for (const fieldName of fieldNames) {
			const filterField = filterFields[fieldName];
			// first depthName must be the fieldName $myFieldName.second_field_name$
			const isBase = depthName === "";
			const primaryFieldInfo = tableInfo.fieldName_primaryField_map[fieldName] as
				| PrimaryFieldInfo
				| undefined;
			if (primaryFieldInfo) {
				const fullFieldName = `${depthName}.${snakeCase(fieldName)}`;
				if (/(jsonb)/.test(primaryFieldInfo.columnDescription.type.toLowerCase())) {
					const primaryFilterJsonField = filterField as GraphQLFilterJsonField;
					const parsedVal = JSON.parse(primaryFilterJsonField.val);
					where[Op.and].push({
						[isBase
							? `${fieldName}.${primaryFilterJsonField.name}`
							: `$${fullFieldName}.${primaryFilterJsonField.name}$`]: {
							[this.graphqlFilterOperatorToSequelizeWhereOperator(primaryFilterJsonField.op)]:
								parsedVal,
						},
					});
				} else {
					const primaryFilterField = filterField as GraphQLFilterField;
					where[Op.and].push({
						[isBase ? fieldName : `$${fullFieldName}$`]: {
							[this.graphqlFilterOperatorToSequelizeWhereOperator(primaryFilterField.op)]:
								primaryFilterField.val,
						},
					});
				}
			} else {
				let associatedFieldWhereAdditionals = whereAdditionals[fieldName] as
					| Additionals
					| undefined;
				if (!associatedFieldWhereAdditionals) {
					associatedFieldWhereAdditionals = {};
					whereAdditionals[fieldName] = associatedFieldWhereAdditionals;
				}
				const associatedFieldInfo = tableInfo.fieldName_associatedField_map[fieldName];

				const associatedFilterFields = filterField as GraphQLFilterFields;
				const newDepthName = isBase ? fieldName : `${depthName}.${fieldName}`;
				where[Op.and].push(
					this.graphqlFilterFieldsToSequelizeWhereOptions_Recursive(
						associatedFieldWhereAdditionals,
						associatedFieldInfo.tableName,
						newDepthName,
						associatedFilterFields,
					),
				);
			}
		}

		return where;
	};

	private graphqlFilterOperatorToSequelizeWhereOperator = (
		graphqlOperator: GraphQLFilterOperators | string,
	) => {
		switch (graphqlOperator) {
			case GraphQLFilterOperators.Equal: {
				return Op.eq;
			}
			case GraphQLFilterOperators.NotEqual: {
				return Op.ne;
			}
			case GraphQLFilterOperators.GreaterThan: {
				return Op.gt;
			}
			case GraphQLFilterOperators.GreaterThanOrEqual: {
				return Op.gte;
			}
			case GraphQLFilterOperators.LessThan: {
				return Op.lt;
			}
			case GraphQLFilterOperators.LessThanOrEqual: {
				return Op.lte;
			}
			case GraphQLFilterOperators.Like: {
				return Op.like;
			}
			case GraphQLFilterOperators.ILike: {
				return Op.iLike;
			}
			default: {
				throw "Invalid GraphQLFilterOperators";
			}
		}
	};

	private graphqlResolveInfoToSequelizeOrder = (
		sortBys?: GraphQLSortBy[],
		jsonFieldSortBys?: GraphQLJsonFieldSortBy[],
	): Order => {
		const order: any[] = [];
		if (sortBys) {
			for (const sortBy of sortBys) {
				order.push([...sortBy.name.split("_"), sortBy.isDesc ? "desc" : "asc"]);
			}
		}

		if (jsonFieldSortBys) {
			for (const jsonFieldSortBy of jsonFieldSortBys) {
				const jsonFieldSortBySortByNameSplit = jsonFieldSortBy.sortByName.split("_");
				jsonFieldSortBySortByNameSplit[
					jsonFieldSortBySortByNameSplit.length - 1
				] += `.${jsonFieldSortBy.jsonFieldName}`;

				order.splice(jsonFieldSortBy.index, 0, [
					...jsonFieldSortBySortByNameSplit,
					jsonFieldSortBy.isDesc ? "desc" : "asc",
				]);
			}
		}

		return order;
	};

	// insert
	private graphqlSequelizeInsertAll = async <T>(
		args: GraphQLAddAllArgs,
		graphqlResolveInfo: GraphQLResolveInfo,
		transaction: Transaction,
		options?: {
			additionalPrimaryFieldsOnAdd?: GraphQLAddPrimaryFields;
		},
	): Promise<GraphQLSequelizeInsertAllOutput<T>> => {
		const mutationName = graphqlResolveInfo.fieldName;
		const addAliasName = Utils.singularize(mutationName.substring(3, mutationName.length));

		const baseTableName = this._aliasName_tableName_objectMap[addAliasName];
		const baseTableInfo = this._tableName_tableInfo_objectMap[baseTableName];
		const model = this._sequelize.models[baseTableInfo.modelName];

		const sequelizeCreationInput = this.graphqlToSequelizeCreationInput_Recursive(
			baseTableName,
			args.input.inputs,
			{
				additionalPrimaryFieldsOnAdd: options?.additionalPrimaryFieldsOnAdd,
			},
		);

		const parsedResolveInfoFragment = parseResolveInfo(graphqlResolveInfo) as ResolveTree;
		const returnTypeName = Object.keys(parsedResolveInfoFragment.fieldsByTypeName)[0];
		const resolveTrees = parsedResolveInfoFragment.fieldsByTypeName[returnTypeName] as
			| {
					[name: string]: ResolveTree | undefined;
			  }
			| undefined;
		const hasOutput = !!resolveTrees && !!resolveTrees["rows"];

		const rows = await model.bulkCreate(sequelizeCreationInput.creationInputs, {
			include: sequelizeCreationInput.includeOptions,
			transaction,
			returning: hasOutput ? baseTableInfo.primaryKeys : false,
		});

		if (!hasOutput) {
			return null;
		}

		const rowsResolveTree = resolveTrees["rows"]!;

		// get added rows by primaryKeys
		const outRows: any[] = [];

		let rowTypeName = Object.keys(rowsResolveTree.fieldsByTypeName)[0];
		const rowTypeResolveTree = rowsResolveTree.fieldsByTypeName[rowTypeName];

		const includes = this.graphqlResolveInfoToSequelizeIncludes_Recursive(
			baseTableName,
			"",
			rowTypeResolveTree,
		);

		for (const row of rows) {
			let whereOptions = this.graphqlFilterToSequelizeWhereOptions_Recursive(
				{},
				baseTableName,
				"",
				{
					and: baseTableInfo.primaryKeys.map((primaryKey) => {
						return {
							fields: {
								[primaryKey]: {
									val: row[primaryKey],
									op: GraphQLFilterOperators.Equal,
								},
							},
						};
					}),
				},
			);

			const outRow = await model.findOne({
				...includes,
				where: whereOptions,
				transaction,
			});

			outRows.push(outRow);
		}

		return {
			rows: outRows,
		};
	};

	private graphqlToSequelizeCreationInput_Recursive = (
		tableName: string,
		inputs: GraphQLAddInput[],
		options: {
			additionalPrimaryFieldsOnAdd?: GraphQLAddPrimaryFields;
		},
	): {
		creationInputs: any[];
		includeOptions: IncludeOptions[];
	} => {
		const tableInfo = this._tableName_tableInfo_objectMap[tableName];

		const sequelizeCreationInputs: any[] = [];
		const includeOptions: IncludeOptions[] = [];

		for (const input of inputs) {
			const sequelizeCreationInput: any = {
				...input.primaryFields,
				...options.additionalPrimaryFieldsOnAdd,
			};
			sequelizeCreationInputs.push(sequelizeCreationInput);
			if (input.associatedFields) {
				const associatedFieldNames = Object.keys(input.associatedFields);
				for (const associatedFieldName of associatedFieldNames) {
					const addInput = input.associatedFields[associatedFieldName];
					const rawAssociatedField = tableInfo.fieldName_associatedField_map[associatedFieldName];
					const model = this._sequelize.models[rawAssociatedField.modelName];
					if (addInput === null) {
						throw Error("An associatedField cannot be null when adding");
					}

					if (rawAssociatedField.isArray) {
						const addInputs = addInput as GraphQLAddInput[];
						const associatedSequelizeCreationInput = this.graphqlToSequelizeCreationInput_Recursive(
							rawAssociatedField.tableName,
							addInputs,
							options,
						);
						sequelizeCreationInput[associatedFieldName] =
							associatedSequelizeCreationInput.creationInputs;
						includeOptions.push({
							model,
							as: associatedFieldName,
							include: associatedSequelizeCreationInput.includeOptions,
							required: true, // @TODO test
						});
					} else {
						const singleAddInput = addInput as GraphQLAddInput;
						const associatedSequelizeCreationInput = this.graphqlToSequelizeCreationInput_Recursive(
							rawAssociatedField.tableName,
							[singleAddInput],
							options,
						);
						sequelizeCreationInput[associatedFieldName] =
							associatedSequelizeCreationInput.creationInputs[0];
						// @TODO one-to-one. child can only be added later
						includeOptions.push({
							model,
							as: associatedFieldName,
							include: associatedSequelizeCreationInput.includeOptions,
							required: true, // @TODO test
						});
					}
				}
			}
		}

		return {
			creationInputs: sequelizeCreationInputs,
			includeOptions,
		};
	};

	private graphqlSequelizeUpdateAll = async (
		args: GraphQLEditAllArgs,
		graphqlResolveInfo: GraphQLResolveInfo,
		transaction: Transaction,
		options?: {
			additionalPrimaryFieldsOnEdit?: GraphQLAddPrimaryFields;
			additionalPrimaryFieldsOnAdd?: GraphQLAddPrimaryFields;
		},
	) => {
		const { editAliasName, baseTableName, baseModel } =
			this.parseEditGraphQLResolveInfo(graphqlResolveInfo);

		for (const input of args.input.inputs) {
			const row = await baseModel.findOne({
				where: {
					...input.primaryKeys,
				},
				transaction,
			});

			if (!row) {
				throw Error(
					`Failed to edit ${editAliasName}, cannot be found with primaryKeys ${JSON.stringify(
						input.primaryKeys,
					)}`,
				);
			}

			await this.graphqlSequelizeUpdateRow_Recursive(baseTableName, input, row, transaction, {
				additionalPrimaryFieldsOnEdit: options?.additionalPrimaryFieldsOnEdit,
				additionalPrimaryFieldsOnAdd: options?.additionalPrimaryFieldsOnAdd,
			});
		}

		// @TODO return
	};

	private parseEditGraphQLResolveInfo = (graphqlResolveInfo: GraphQLResolveInfo) => {
		const EDIT = "edit";
		const mutationName = graphqlResolveInfo.fieldName;
		const editAliasName = Utils.singularize(
			mutationName.substring(EDIT.length, mutationName.length),
		);

		const baseTableName = this._aliasName_tableName_objectMap[editAliasName];

		const tableInfo = this._tableName_tableInfo_objectMap[baseTableName];
		const baseModel = this._sequelize.models[tableInfo.modelName];

		return {
			mutationName,
			editAliasName,
			baseTableName,
			tableInfo,
			baseModel,
		};
	};

	private graphqlSequelizeUpdateRow_Recursive = async (
		tableName: string,
		input: GraphQLEditOrAddInput,
		row: any,
		transaction: Transaction,
		options?: {
			additionalPrimaryFieldsOnEdit?: GraphQLAddPrimaryFields;
			additionalPrimaryFieldsOnAdd?: GraphQLAddPrimaryFields;
		},
	) => {
		const tableInfo = this._tableName_tableInfo_objectMap[tableName];

		// edit primaryFields
		if (input.primaryFields) {
			await row.update(
				{
					...input.primaryFields,
					...options?.additionalPrimaryFieldsOnEdit,
				},
				{
					transaction,
				},
			);
		}

		if (input.associatedFields) {
			const associatedFieldNames = Object.keys(input.associatedFields);
			for (const associatedFieldName of associatedFieldNames) {
				const editInput = input.associatedFields[associatedFieldName];
				const rawAssociatedField = tableInfo.fieldName_associatedField_map[associatedFieldName];
				const associatedTableInfo =
					this._tableName_tableInfo_objectMap[rawAssociatedField.tableName];
				const associatedModel = this._sequelize.models[associatedTableInfo.modelName];
				if (rawAssociatedField.isArray) {
					const editInputs = editInput as GraphQLEditOrAddInput[] | null;

					if (editInputs === null) {
						throw new Error("An array associatedField cannot be null when editing");
					}
					const toBeEditedInputs: GraphQLEditInput[] = [];
					const toBeAddedInputs: GraphQLEditOrAddInput[] = [];
					for (const input of editInputs) {
						if (input.primaryKeys) {
							toBeEditedInputs.push(input as GraphQLEditInput);
						} else {
							toBeAddedInputs.push(input);
						}
					}

					const associatedRows = await row[`get${upperFirst(associatedFieldName)}`]({
						attributes: associatedTableInfo.primaryKeys,
						transaction,
					});

					const toBeRemovedRows: any[] = [];
					const toBeEditedRows: any[] = [];
					for (const associatedRow of associatedRows) {
						if (
							toBeEditedInputs.some((toBeEditedInput) =>
								associatedTableInfo.primaryKeys.every(
									(primaryKey) =>
										// @TODO this will not work with date type
										toBeEditedInput.primaryKeys[primaryKey] === associatedRow[primaryKey],
								),
							)
						) {
							toBeEditedRows.push(associatedRow);
						} else {
							toBeRemovedRows.push(associatedRow);
						}
					}

					// remove
					// remove the inputs that are not found
					if (toBeRemovedRows.length !== 0) {
						await associatedModel.destroy({
							where: {
								[Op.or]: toBeRemovedRows.map((associatedRow: any) => {
									return associatedTableInfo.primaryKeys.reduce<WhereOptions<any>>(
										(where, primaryKey) => {
											return {
												...where,
												[primaryKey]: associatedRow[primaryKey],
											};
										},
										{},
									);
								}),
							},
							transaction,
						});
					}

					// edit
					// edit the inputs with filter
					for (const toBeEditedInput of toBeEditedInputs) {
						const toBeEditedRow = toBeEditedRows.find((associatedRow: any) => {
							for (const primaryKey of associatedTableInfo.primaryKeys) {
								if (associatedRow[primaryKey] !== toBeEditedInput.primaryKeys[primaryKey]) {
									return false;
								}
								return true;
							}
						});
						if (!toBeEditedRow) {
							throw Error(
								`Failed to edit ${associatedFieldName}, cannot be found with primaryKeys ${JSON.stringify(
									toBeEditedInput.primaryKeys,
								)}`,
							);
						}
						await this.graphqlSequelizeUpdateRow_Recursive(
							rawAssociatedField.tableName,
							toBeEditedInput,
							toBeEditedRow,
							transaction,
							options,
						);
					}

					// add
					// add the inputs without filter
					if (toBeAddedInputs.length !== 0) {
						const sequelizeCreationInput = this.graphqlToSequelizeCreationInput_Recursive(
							rawAssociatedField.tableName,
							toBeAddedInputs,
							{
								additionalPrimaryFieldsOnAdd: options?.additionalPrimaryFieldsOnAdd,
							},
						);

						for (const creationInput of sequelizeCreationInput.creationInputs) {
							creationInput[rawAssociatedField.fieldNameOnChild!] =
								row[rawAssociatedField.fieldNameOnParent!];
						}

						await associatedModel.bulkCreate(sequelizeCreationInput.creationInputs, {
							include: sequelizeCreationInput.includeOptions,
							transaction,
						});
					}
				} else {
					const singleEditInput = editInput as GraphQLEditOrAddInput | null;
					// remove the input
					if (singleEditInput == null) {
						const toBeDestroyedRow = await row[`get${upperFirst(associatedFieldName)}`]({
							transaction,
						});
						if (!toBeDestroyedRow) {
							throw Error(`Failed to remove ${associatedFieldName}, null data`);
						}
						await row[`set${upperFirst(associatedFieldName)}`](null, {
							transaction,
						});
						await toBeDestroyedRow.destroy({
							transaction,
						});
					} else if (singleEditInput.primaryKeys) {
						// edit the input
						const toBeEditedRow = (await row[`get${upperFirst(associatedFieldName)}`]({
							// attributes: associatedTableInfo.primaryKeys, @TODO associated keys must also be included
							transaction,
						})) as any | null;

						if (
							!toBeEditedRow ||
							associatedTableInfo.primaryKeys.some(
								(primaryKey) =>
									singleEditInput.primaryKeys![primaryKey] !== toBeEditedRow[primaryKey],
							)
						) {
							throw Error(
								`Failed to edit ${associatedFieldName}, cannot be found with primaryKeys ${JSON.stringify(
									singleEditInput.primaryKeys,
								)}`,
							);
						}
						await this.graphqlSequelizeUpdateRow_Recursive(
							rawAssociatedField.tableName,
							singleEditInput,
							toBeEditedRow,
							transaction,
							options,
						);
					} else {
						// add the input
						const sequelizeCreationInput = this.graphqlToSequelizeCreationInput_Recursive(
							rawAssociatedField.tableName,
							[singleEditInput],
							{
								additionalPrimaryFieldsOnAdd: options?.additionalPrimaryFieldsOnAdd,
							},
						);

						const newParent = await associatedModel.create(
							sequelizeCreationInput.creationInputs[0],
							{
								include: sequelizeCreationInput.includeOptions,
								transaction,
							},
						);

						await row[`set${upperFirst(associatedFieldName)}`](newParent, {
							transaction,
						});
					}
				}
			}
		}
	};

	// get edit
	private graphqlSequelizeFindAllUpdate = async <T>(
		args: GraphQLEditAllArgs,
		graphqlResolveInfo: GraphQLResolveInfo,
		transaction: Transaction,
	): Promise<T[]> => {
		const { baseModel } = this.parseEditGraphQLResolveInfo(graphqlResolveInfo);

		const foundRows = await baseModel.findAll({
			where: {
				[Op.or]: args.input.inputs.map((input) => {
					return input.primaryKeys;
				}),
			},
			transaction,
		});

		for (const input of args.input.inputs) {
			const foundRow = foundRows.find((foundRow) => {
				return Object.keys(input.primaryKeys).every((primaryKey) => {
					return foundRow[primaryKey] === input.primaryKeys[primaryKey];
				});
			});
			if (!foundRow) {
				throw Error(
					`Failed to find ${
						graphqlResolveInfo.fieldName
					}, cannot be found with primaryKeys ${JSON.stringify(input.primaryKeys)}`,
				);
			}
		}

		return foundRows as T[];
	};

	// delete
	private graphqlSequelizeDestroyAll = async (
		args: GraphQLRemoveAllArgs,
		graphqlResolveInfo: GraphQLResolveInfo,
		transaction: Transaction,
	) => {
		const { removeAliasName, tableInfo, model } =
			this.parseRemoveGraphQLResolveInfo(graphqlResolveInfo);

		const where = {
			[Op.or]: args.input.primaryKeysList.map((primaryKeys) => {
				return primaryKeys;
			}),
		};

		const toBeRemovedRows = await model.findAll({
			where,
			transaction,
		});

		for (const primaryKeys of args.input.primaryKeysList) {
			const toBeRemovedRow = toBeRemovedRows.find((toBeRemovedRow) => {
				return tableInfo.primaryKeys.every((primaryKey) => {
					return toBeRemovedRow[primaryKey] === primaryKeys[primaryKey];
				});
			});
			if (!toBeRemovedRow) {
				throw Error(
					`Failed to find ${removeAliasName}, cannot be found with primaryKeys ${JSON.stringify(
						primaryKeys,
					)}`,
				);
			}
		}

		await model.destroy({
			where,
			transaction,
		});
	};

	private parseRemoveGraphQLResolveInfo = (graphqlResolveInfo: GraphQLResolveInfo) => {
		const REMOVE = "remove";
		const mutationName = graphqlResolveInfo.fieldName;
		const removeAliasName = Utils.singularize(
			mutationName.substring(REMOVE.length, mutationName.length),
		);

		const baseTableName = this._aliasName_tableName_objectMap[removeAliasName];
		const tableInfo = this._tableName_tableInfo_objectMap[baseTableName];

		const model = this._sequelize.models[tableInfo.modelName];

		return {
			mutationName,
			removeAliasName,
			baseTableName,
			tableInfo,
			model,
		};
	};

	private graphqlSequelizeFindAllDestroy = async <T>(
		args: GraphQLRemoveAllArgs,
		graphqlResolveInfo: GraphQLResolveInfo,
		transaction: Transaction,
	): Promise<T[]> => {
		const { model } = this.parseRemoveGraphQLResolveInfo(graphqlResolveInfo);

		const foundRows = await model.findAll({
			where: {
				[Op.or]: args.input.primaryKeysList.map((primaryKeys) => {
					return primaryKeys;
				}),
			},
			transaction,
		});

		for (const primaryKeys of args.input.primaryKeysList) {
			const foundRow = foundRows.find((foundRow) => {
				return Object.keys(primaryKeys).every((primaryKey) => {
					return foundRow[primaryKey] === primaryKeys[primaryKey];
				});
			});
			if (!foundRow) {
				throw Error(
					`Failed to find ${
						graphqlResolveInfo.fieldName
					}, cannot be found with primaryKeys ${JSON.stringify(primaryKeys)}`,
				);
			}
		}

		return foundRows as T[];
	};

	/**
	 * @NOTE this works fine but AssociatedFieldInfo.fieldNameOnParent is preferred
	 */
	private static getFieldNameOnParent = (
		childTableInfo: TableInfoObjectMap,
		fieldNameOnChild: string,
	) => {
		const columnDescriptionAny: any =
			childTableInfo.fieldName_primaryField_map[fieldNameOnChild].columnDescription;
		return camelCase(columnDescriptionAny.foreignKey.foreignSources.target_column);

		// other way
		// const associationKeys = Object.keys(childAssociatedModel.associations);
		// for (const associationKey of associationKeys) {
		// 	const association = childAssociatedModel.associations[associationKey];
		// 	const targetTableName = association.target._schema + "." + association.target.tableName;
		// 	if (targetTableName === tableName && association.foreignKey === fieldNameOnChild) {
		// 		return association.targetKey as string;
		// 	}
		// }
	};
}
