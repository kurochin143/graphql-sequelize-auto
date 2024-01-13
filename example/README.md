# Example GSA Project

## Prerequisites

- PostgresQL database connection string

## How To Run

### Env file

Create `.env` file in the root and copy envs below and fill it out with your db connection string

```
DB_HOST=
DB_NAME=
DB_USER=
DB_PASS=
DB_PORT=
```

### Commands

```
// Run database migrations from ./migrations dir
$npm run dbm:up

// Run GraphQL Sequelize Auto to generate GraphQL schema and Sequelize models
// Already generated for the sake of seeing the generated files in the repo
$npm run gsa

// Run the app
$npm run dev
```
