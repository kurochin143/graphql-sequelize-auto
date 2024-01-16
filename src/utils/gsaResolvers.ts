import { GraphQLScalarType, Kind } from "graphql";

export const gsaResolvers = {
	Date: new GraphQLScalarType({
		name: "Date",
		parseValue: (v) => {
			if (typeof v !== "string") {
				throw Error(`Expected string got ${typeof v}`);
			}
			// @TODO validate date
			return new Date(v);
		},
		serialize: (v) => {
			if (v === null) {
				throw Error("Expected non-null object got null");
			}

			if (typeof v !== "object") {
				throw Error(`Expected object got ${typeof v}`);
			}

			return (v as Date).toJSON();
		},
		parseLiteral: (ast) => {
			if (ast.kind !== Kind.STRING) {
				throw Error(`Expected ${Kind.STRING} got ${ast.kind}`);
			}
			// @TODO validate date
			return new Date(ast.value);
		},
	}),

	NullableString: new GraphQLScalarType({
		name: "NullableString",
		parseValue: (v) => {
			if (v === null) {
				return null;
			}

			if (typeof v !== "string") {
				throw Error(`Expected string got ${typeof v}`);
			}

			return v;
		},
		serialize: (v) => {
			if (v === null) {
				return null;
			}

			if (typeof v !== "string") {
				throw Error(`Expected string got ${typeof v}`);
			}

			return v;
		},
		parseLiteral: (ast) => {
			if (ast.kind === Kind.NULL) {
				return null;
			}

			if (ast.kind !== Kind.STRING) {
				throw Error(`Expected ${Kind.STRING} got ${ast.kind}`);
			}

			return ast.value;
		},
	}),

	NullableInt: new GraphQLScalarType({
		name: "NullableInt",
		parseValue: (v) => {
			if (v === null) {
				return null;
			}

			if (typeof v !== "number") {
				throw Error(`Expected number got ${typeof v}`);
			}

			if (v % 1 !== 0) {
				throw Error("Expected int got float");
			}

			return v;
		},
		serialize: (v) => {
			if (v === null) {
				return null;
			}

			if (typeof v !== "number") {
				throw Error(`Expected number got ${typeof v}`);
			}

			if (v % 1 !== 0) {
				throw Error("Expected int got float");
			}

			return v;
		},
		parseLiteral: (ast) => {
			if (ast.kind === Kind.NULL) {
				return null;
			}

			if (ast.kind !== Kind.INT) {
				throw Error(`Expected ${Kind.INT} got ${ast.kind}`);
			}

			return ast.value as unknown as number;
		},
	}),

	NullableFloat: new GraphQLScalarType({
		name: "NullableFloat",
		parseValue: (v) => {
			if (v === null) {
				return null;
			}

			if (typeof v !== "number") {
				throw Error(`Expected number got ${typeof v}`);
			}

			return v;
		},
		serialize: (v) => {
			if (v === null) {
				return null;
			}

			if (typeof v !== "number") {
				throw Error(`Expected number got ${typeof v}`);
			}

			return v;
		},
		parseLiteral: (ast) => {
			if (ast.kind === Kind.NULL) {
				return null;
			}

			if (ast.kind !== Kind.FLOAT) {
				throw Error(`Expected ${Kind.FLOAT} got ${ast.kind}`);
			}

			return ast.value as unknown as number;
		},
	}),

	NullableBoolean: new GraphQLScalarType({
		name: "NullableBoolean",
		parseValue: (v) => {
			if (v === null) {
				return null;
			}

			if (typeof v !== "boolean") {
				throw Error(`Expected boolean got ${typeof v}`);
			}

			return v;
		},
		serialize: (v) => {
			if (v === null) {
				return null;
			}

			if (typeof v !== "boolean") {
				throw Error(`Expected boolean got ${typeof v}`);
			}

			return v;
		},
		parseLiteral: (ast) => {
			if (ast.kind === Kind.NULL) {
				return null;
			}

			if (ast.kind !== Kind.BOOLEAN) {
				throw Error(`Expected ${Kind.BOOLEAN} got ${ast.kind}`);
			}

			return ast.value;
		},
	}),

	NullableDate: new GraphQLScalarType({
		name: "NullableDate",
		parseValue: (v) => {
			if (v === null) {
				return null;
			}

			if (typeof v !== "string") {
				throw Error(`Expected string got ${typeof v}`);
			}

			// @TODO validate date
			return new Date(v);
		},
		serialize: (v) => {
			if (v === null) {
				return null;
			}

			if (typeof v !== "object") {
				throw Error(`Expected object got ${typeof v}`);
			}

			return (v as Date).toJSON();
		},
		parseLiteral: (ast) => {
			if (ast.kind === Kind.NULL) {
				return null;
			}

			if (ast.kind !== Kind.STRING) {
				throw Error(`Expected ${Kind.STRING} got ${ast.kind}`);
			}

			return new Date(ast.value);
		},
	}),

	Json: new GraphQLScalarType({
		name: "Json",
		parseValue: (v) => {
			if (v === null) {
				throw Error("Expected non-null object got null");
			}

			if (typeof v !== "object") {
				throw Error(`Expected object got ${typeof v}`);
			}

			return v;
		},
		serialize: (v) => {
			if (v === null) {
				throw Error("Expected non-null object got null");
			}

			if (typeof v !== "object") {
				throw Error(`Expected object got ${typeof v}`);
			}

			return v;
		},
		parseLiteral: (ast) => {
			if (ast.kind !== Kind.OBJECT) {
				throw Error(`Expected object got ${ast.kind}`);
			}

			return (ast as unknown as { value: unknown }).value as object;
		},
	}),

	NullableJson: new GraphQLScalarType({
		name: "NullableJson",
		parseValue: (v) => {
			if (v === null) {
				return null;
			}

			if (typeof v !== "object") {
				throw Error(`Expected object got ${typeof v}`);
			}

			return v;
		},
		serialize: (v) => {
			if (v === null) {
				return null;
			}

			if (typeof v !== "object") {
				throw Error(`Expected object got ${typeof v}`);
			}

			return v;
		},
		parseLiteral: (ast) => {
			if (ast.kind === Kind.NULL) {
				return null;
			}

			if (ast.kind !== Kind.OBJECT) {
				throw Error(`Expected ${Kind.OBJECT} got ${ast.kind}`);
			}

			return (ast as unknown as { value: unknown }).value as object;
		},
	}),

	BigInt: new GraphQLScalarType({
		name: "BigInt",
		parseValue: (v) => {
			if (typeof v !== "string") {
				throw Error(`Expected string got ${typeof v}`);
			}

			return v;
		},
		serialize: (v) => {
			if (typeof v !== "string") {
				throw Error(`Expected string got ${typeof v}`);
			}

			return v;
		},
		parseLiteral: (ast) => {
			if (ast.kind !== Kind.STRING) {
				throw Error(`Expected ${Kind.STRING} got ${ast.kind}`);
			}

			return ast.value;
		},
	}),

	NullableBigInt: new GraphQLScalarType({
		name: "NullableBigInt",
		parseValue: (v) => {
			if (v === null) {
				return null;
			}

			if (typeof v !== "string") {
				throw Error(`Expected string got ${typeof v}`);
			}

			return v;
		},
		serialize: (v) => {
			if (v === null) {
				return null;
			}

			if (typeof v !== "string") {
				throw Error(`Expected string got ${typeof v}`);
			}

			return v;
		},
		parseLiteral: (ast) => {
			if (ast.kind === Kind.NULL) {
				return null;
			}

			if (ast.kind !== Kind.STRING) {
				throw Error(`Expected ${Kind.STRING} got ${ast.kind}`);
			}

			return ast.value;
		},
	}),
};
