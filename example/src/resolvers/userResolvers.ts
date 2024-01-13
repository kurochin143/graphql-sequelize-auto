import { GraphQLResolveInfo } from "graphql";
import {
	GetUsersOutput,
	MutationAddUsersArgs,
	MutationEditUsersArgs,
	MutationRemoveUsersArgs,
	QueryGetUsersArgs,
} from "../generated/gsa/graphql.generated";
import gsaService from "../services/gsaService";
import userService from "../services/userService";
import { AddUsersOutput } from "../../../test/generated/graphql";
const userResolvers = {
	getUsers: async (
		args: QueryGetUsersArgs,
		_context: unknown,
		graphqlResolveInfo: GraphQLResolveInfo,
	): Promise<GetUsersOutput> => {
		return gsaService.getGsa().getAll(args, graphqlResolveInfo);
	},

	addUsers: async (
		args: MutationAddUsersArgs,
		_context: unknown,
		graphqlResolveInfo: GraphQLResolveInfo,
	): Promise<AddUsersOutput | null> => {
		return await userService.insertAll(args.input.inputs, graphqlResolveInfo);
	},

	editUsers: async (
		args: MutationEditUsersArgs,
		_context: unknown,
		graphqlResolveInfo: GraphQLResolveInfo,
	): Promise<number> => {
		await gsaService.getGsa().editAll(args, graphqlResolveInfo);
		return 1;
	},

	removeUsers: async (
		args: MutationRemoveUsersArgs,
		_context: unknown,
		graphqlResolveInfo: GraphQLResolveInfo,
	): Promise<number> => {
		await gsaService.getGsa().removeAll(args, graphqlResolveInfo);
		return 1;
	},
};

export default userResolvers;
