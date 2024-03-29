# Graphql Sequelize Auto Generator (GSA)

Config based GraphQL schema generator.

Generates GraphQL CRUD queries based on database schema and configuration. It also provides a service that will query the database based on the GraphQL query.

## Prerequisite Knowledge

In order to use this tool, you must know how to use

- [`GraphQL`](https://graphql.org/) 
- [`Sequelize`](https://sequelize.org/)
- [`TypeScript`](https://www.typescriptlang.org/)

## Peer Dependencies

See [`peer dependencies`](https://github.com/kurochin143/graphql-sequelize-auto/tree/main/package.json)

## How To Use

### npm package

Install package [`graphql-sequelize-auto-generator`](https://www.npmjs.com/package/graphql-sequelize-auto-generator)
```
$npm install graphql-sequelize-auto-generator
```

#### Config

Follow the [config](#config) tutorial.

#### Scripts
```json
{
  "gsa": "gsa -c ./gsa.config.ts"
}
```

#### Generate
```
$npm run gsa
```

#### Code Usage

Follow the [code usage](#code_usage) tutorial.

## Config<a name="config"></a>

Create a `gsa.config.ts` file in your project root.

`gsa.config.ts`
```typescript
import { GsaConfig } from "graphql-sequelize-auto-generator";
import { FilterOperators } from "graphql-sequelize-auto-generator/build/cli/enums";

const config: GsaConfig = {
	// Generated sequelize models and codes dir
	codeFilesDir: "./src/generated/gsa",
	// Generated GraphQL schema and non code files
	nonCodeFilesDir: "./src/nonCode/generated/gsa",
	// Custom GraphQL schema
	additionalGqlSchemas: ["./src/nonCode/schema.gql"],
	// Database host
	host: process.env.DB_HOST!,
	// Database port
	port: parseInt(process.env.DB_PORT!),
	// Database name
	database: process.env.DB_NAME!,
	// Database username
	username: process.env.DB_USER!,
	// Database password
	password: process.env.DB_PASS!,
	// Database type
	dialect: "postgres",
	// Tables to skip generating sequelize models
	skipTables: ["public.sequelize_migrations"],
	// See Table Config section
	tableConfigs: []
}
```

### Table Config
```typescript
{
	// Name of the database table including the schema
	name: "public.users",
	// You can create multiple alias of one table such as User, PublicUser, PrivateUser
	aliasConfigs: [
		{
			// Name of the GraphQL type that will be generated
			name: "User",
			// Read
			get: {
				input: {
					// Exposed filter fields
					filterFields: [
						{	// Primary field filter
							// Name of the field from the generated sequelize model in <codeFilesDir>/sequelize/Users.ts
							name: "id",
							// Allowed operators
							operators: [FilterOperators.Equal],
						},
						{
							name: "username",
							operators: [FilterOperators.Like],
						},
						{	// Associated field filter
							// This is an associated table
							name: "userUserRoles",
							filterFields: [
								{
									// Associated table of the one above
									name: "role",
									filterFields: [
										{
											name: "rolePermissions",
											filterFields: [
												{
													name: "permission",
													filterFields: [
														{
															// The actual field that will be filtered for this nested filter
															name: "id",
															operators: [FilterOperators.Equal],
														},
														{
															name: "name",
															operators: [FilterOperators.Like],
														},
													],
												},
											],
										},
									],
								},
							],
						},
					],
					// Exposed sort fields
					sortByFields: [
						{	// Simple sort field
							name: "id",
						},
						{
							name: "username",
						},
						{	// Associated sort field
							name: "userUserRoles",
							sortByFields: [{
								name: "role",
								sortByFields: [{
									// The actual field that will be sorted for this nested sorting
									name: "code",
								}, {
									name: "name",
								}],
							}],
						},
					],
				},
				output: {
					// Exposed primary output fields
					primaryFields: {
						include: ["id", "username"],
					},
					// Exposed associated output fields
					associatedFields: [
						{
							name: "userUserRoles",
							// The name of the GraphQL type, this is defined in the aliasConfigs array element
							aliasName: "UserRole",
						},
					],
				},
			},
			// Create
			add: {
				input: {
					// Exposed primary input fields when adding
					primaryFields: {
						include: ["username", "password"],
					},
					// Exposed primary output fields when adding
					associatedFields: [
						{
							name: "userUserRoles",
							isOptional: false,
							input: {
								primaryFields: {
									isOptional: false,
									include: ["roleId"],
								},
							},
						},
					],
				},
				output: {
					primaryFields: {
						include: ["id"],
					},
				},
			},
			// Update
			edit: {
				input: {
					primaryFields: {
						include: ["firstName", "lastName"],
					},
					associatedFields: [
						{
							name: "userUserRoles",
							isOptional: false,
							input: {
								primaryFields: {
									include: ["roleId"],
								},
							},
						},
					],
				},
			},
			// Delete
			remove: {
				// Generates remove mutation
				isEnabled: true,
			},
		},
	],
},
```

## Code Usage<a name="code_usage"></a>

Creating a `gsa` object.
```typescript
import { GraphQLSequelizeAuto } from "graphql-sequelize-auto-generator";
import { initModels } from "../generated/gsa/sequelize/init-models";

initModels(sequelize);  // Your sequelize object

const gsa = new GraphQLSequelizeAuto(
	sequelize,
	path.resolve(__dirname, "./nonCode/generated/gsa/mappings.generated.json"), // This is generated by gsa in the nonCode dir
);
```

Using the `gsa` object in the resolver.
```typescript
import {
	GetUsersOutput,
	QueryGetUsersArgs,
} from "../generated/gsa/graphql.generated";

// This is using Apollo GraphQL server resolver. But as long as the library you're using has GraphQLResolveInfo then it should work
getUsers: async (
	args: QueryGetUsersArgs,
	_context: unknown,
	graphqlResolveInfo: GraphQLResolveInfo,
): Promise<GetUsersOutput> => {
	return gsa.getAll(args, graphqlResolveInfo);
},
```

## Scalar Resolvers

You can resolve the generated scalars yourself or use `gsaResolvers` like in the [`example`](https://github.com/kurochin143/graphql-sequelize-auto/tree/main/example/src/graphql/loadGraphQLSchema.ts).
```
import { gsaResolvers } from "graphql-sequelize-auto-generator";
```

## Example Project

See example project at [`example`](https://github.com/kurochin143/graphql-sequelize-auto/tree/main/example).

See a full config example at [`gsa.config.ts`](https://github.com/kurochin143/graphql-sequelize-auto/tree/main/example/gsa.config.ts).

See the generated GraphQL schema at [`schema.generated.gql`](https://github.com/kurochin143/graphql-sequelize-auto/tree/main/example/src/nonCode/generated/gsa/schema.generated.gql).

## Database Support

The goal is to support all databases that `sequelize` supports.

Currently only tested `PostgreSQL` and `SQL Server`.
