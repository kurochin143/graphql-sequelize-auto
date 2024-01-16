import { parse } from "graphql";
import * as typescriptPlugin from "@graphql-codegen/typescript";
import * as typescriptResolversPlugin from "@graphql-codegen/typescript-resolvers";
import { codegen } from "@graphql-codegen/core";

const generateGraphQLTypes = async (schemaStr: string, outputFile: string) => {
	return codegen({
		documents: [],
		config: {
			maybeValue: "T | undefined",
		},
		// used by a plugin internally, although the 'typescript' plugin currently
		// returns the string output, rather than writing to a file
		filename: outputFile,
		schema: parse(schemaStr),
		plugins: [
			// Each plugin should be an object
			{
				typescript: {
					maybeValue: "T | undefined",
					strictScalars: "true",
					scalars: {
						Date: "Date",
						NullableString: "string | null",
						NullableInt: "number | null",
						NullableFloat: "number | null",
						NullableBoolean: "boolean | null",
						NullableDate: "Date | null",
						UnknownTypeStringified: "string | null",
						Json: "object",
						NullableJson: "object | null",
						BigInt: "number",
						NullableBigInt: "number | null",
					},
				}, // Here you can pass configuration to the plugin
			},
		],
		pluginMap: {
			typescript: typescriptPlugin,
			typescriptResolvers: typescriptResolversPlugin,
		},
	});
};

export default generateGraphQLTypes;
