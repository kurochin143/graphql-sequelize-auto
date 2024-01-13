import { loadEnvs } from "load-envs";

const DEFAULT_SHOULD_LOG_LOCALLY = 0;
const DEFAULT_PORT = 5000;

export enum EnvTypes {
	Production = "production",
	Staging = "staging",
	Development = "development",
}

export interface Env {
	NODE_ENV: EnvTypes;
	PORT: number;

	DB_HOST: string;
	DB_NAME: string;
	DB_USER: string;
	DB_PASS: string;
	DB_PORT: number;
}

let env: Env | undefined;

const init = () => {
	if (env) return;

	env = loadEnvs<Env>([
		{
			envKey: "NODE_ENV",
			options: {
				validValues: Object.values(EnvTypes),
			},
		},
		{
			envKey: "PORT",
			options: {
				isNumber: true,
				defaultValue: DEFAULT_PORT,
			},
		},
		{
			envKey: "DB_HOST",
		},
		{
			envKey: "DB_PORT",
			options: {
				isNumber: true,
			},
		},
		{
			envKey: "DB_USER",
		},
		{
			envKey: "DB_PASS",
		},
		{
			envKey: "DB_NAME",
		},
	]);
};

init();

export default env!;
