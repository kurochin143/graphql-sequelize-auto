import { GraphQLResolveInfo } from "graphql";
import { AddUserInput } from "../generated/gsa/graphql.generated";
import gsaService from "./gsaService";
import { Users } from "../generated/gsa/sequelize/Users";
import bcrypt from "bcrypt";

const userService = {
	insertAll: async (
		inputs: AddUserInput[],
		graphqlResolveInfo: GraphQLResolveInfo,
	): Promise<any> => {
		for (const input of inputs) {
			input.primaryFields.password = bcrypt.hashSync(input.primaryFields.password, 10);
		}

		return gsaService.getGsa().addAll<Users>(
			{
				input: {
					inputs,
				},
			},
			graphqlResolveInfo,
		);
	},
};

export default userService;
