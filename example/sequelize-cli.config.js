module.exports = {
	process_env: {
		dialect: "postgres",
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		database: process.env.DB_NAME,
		migrationStorageTableName: "sequelize_migrations",
		seederStorageTableName: "sequelize_seeds",
	},
};
