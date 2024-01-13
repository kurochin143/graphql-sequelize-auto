import { GraphQLResolveInfo } from "graphql";
import {
	AddRolesOutput,
	GetRolesOutput,
	MutationAddRolesArgs,
	MutationEditRolesArgs,
	MutationRemoveRolesArgs,
	QueryGetRolesArgs,
} from "../generated/gsa/graphql.generated";
import gsaService from "../services/gsaService";
import { Roles } from "../generated/gsa/sequelize/Roles";

const roleResolvers = {
	getRoles: async (
		args: QueryGetRolesArgs,
		_context: unknown,
		graphqlResolveInfo: GraphQLResolveInfo,
	): Promise<GetRolesOutput> => {
		return gsaService.getGsa().getAll(args, graphqlResolveInfo);
	},

	addRoles: async (
		args: MutationAddRolesArgs,
		_context: unknown,
		graphqlResolveInfo: GraphQLResolveInfo,
	): Promise<AddRolesOutput | null> => {
		return gsaService.getGsa().addAll<Roles>(args, graphqlResolveInfo);
	},

	editRoles: async (
		args: MutationEditRolesArgs,
		_context: unknown,
		graphqlResolveInfo: GraphQLResolveInfo,
	): Promise<number> => {
		await gsaService.getGsa().editAll(args, graphqlResolveInfo);

		return 1;
	},

	removeRoles: async (
		args: MutationRemoveRolesArgs,
		_context: unknown,
		graphqlResolveInfo: GraphQLResolveInfo,
	): Promise<number> => {
		await gsaService.getGsa().removeAll(args, graphqlResolveInfo);

		return 1;
	},
};

export default roleResolvers;
