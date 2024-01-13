import { Sequelize } from "sequelize";
import env, { EnvTypes } from "../env";
import { initModels } from "../generated/gsa/sequelize/init-models";
import KnownError from "../classes/KnownError";
import { wait } from "../utils/Utils";

let _sequelize: Sequelize | undefined;

const db = {
	start: async (shouldRetry: boolean) => {
		try {
			console.info("Connecting to db");

			_sequelize = new Sequelize({
				host: env.DB_HOST,
				database: env.DB_NAME,
				username: env.DB_USER,
				password: env.DB_PASS,
				port: env.DB_PORT,
				dialect: "postgres",
				logging: (sql) => {
					if (env.NODE_ENV === EnvTypes.Development) {
						console.info(sql);
					}
				},
			});

			await _sequelize.authenticate();

			initModels(_sequelize);

			console.info("Succesfully connected to db");
		} catch (err) {
			console.error("Failed to connect to db");
			console.error(err);

			await _sequelize?.close();
			_sequelize = undefined;

			if (shouldRetry) {
				console.info("Retrying to connect to db");
				await wait(1000);
				await db.start(shouldRetry);
			} else {
				throw err;
			}
		}
	},

	stop: async () => {
		console.info("Stopping db");

		await _sequelize?.close();
		_sequelize = undefined;

		console.info("db stopped");
	},
	getSequelize: () => {
		if (_sequelize) return _sequelize;

		throw new KnownError("DB has not started", 500);
	},
};

export default db;
