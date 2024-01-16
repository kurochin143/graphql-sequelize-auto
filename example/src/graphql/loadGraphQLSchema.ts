import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import path from "path";
import { gsaResolvers } from "graphql-sequelize-auto-generator";

const loadGraphQLSchema = () => {
	const schema = loadSchemaSync(
		[
			path.resolve(__dirname, "../nonCode/generated/gsa/schema.generated.gql"),
			path.resolve(__dirname, "../nonCode/schema.gql"),
		],
		{
			loaders: [new GraphQLFileLoader()],
		},
	);

	return addResolversToSchema({
		schema,
		resolvers: gsaResolvers,
	});
};

export default loadGraphQLSchema;
