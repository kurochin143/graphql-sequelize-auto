import { GraphQLResolveInfo } from "graphql";
import { GetPermissionsOutput, QueryGetPermissionsArgs } from "../generated/gsa/graphql.generated";
import gsaService from "../services/gsaService";

const permissionResolvers = {
	getPermissions: async (
		args: QueryGetPermissionsArgs,
		_context: unknown,
		graphqlResolveInfo: GraphQLResolveInfo,
	): Promise<GetPermissionsOutput> => {
		return gsaService.getGsa().getAll(args, graphqlResolveInfo);
	},
};

export default permissionResolvers;
