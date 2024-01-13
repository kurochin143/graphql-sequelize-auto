# Graphql Sequelize Auto (GSA)

Config based GraphQL schema generator.

Automatically generate GraphQL CRUD queries and provides a service that processes GraphQL resolvers input that automatically queries the database.

## Prerequisite Knowledge

In order to use this tool, you must know how to use these first.

- [`GraphQL`](https://graphql.org/) 
- [`Sequelize`](https://sequelize.org/)

## How To Use

### Using the source code directly

Create folder `scripts/gsa` in your project root, and copy `src` content to it.

Create a `gsa.config.ts` file in your project root

`gsa.config.ts`
```typescript
import { GsaConfig } from "./scripts/gsa/src";

const config: GsaConfig = {
	// generated sequelize models and codes dir
	codeFilesDir: "./src/generated/gsa",
	// generated GraphQL schema and non code files
	nonCodeFilesDir: "./src/nonCode/generated/gsa",
	// custom GraphQL schema
	additionalGqlSchemas: ["./src/nonCode/schema.gql"],
	// database host
	host: process.env.DB_HOST!,
	// database port
	port: parseInt(process.env.DB_PORT!),
	// database name
	database: process.env.DB_NAME!,
	// database username
	username: process.env.DB_USER!,
	// database password
	password: process.env.DB_PASS!,
	// database type
	dialect: "postgres",
	// tables to skip generating sequelize models
	skipTables: ["public.sequelize_migrations"],
	// see example gsa.config.ts file's tableConfigs
	tableConfigs: []
}
```

### npm (TBD)


## Example Project

See example project at [`example`](./example)

See generated GraphQL schema at [`schema`](./example/src/nonCode/generated/gsa/schema.generated.gql)