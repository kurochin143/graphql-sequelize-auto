import express from "express";
import apolloServer from "./middlewares/apolloServer";

export const GRAPHQL_PATH = "/api/graphql";

export const createExpressApp = async () => {
	const app = express();

	app.use(GRAPHQL_PATH, await apolloServer(app));

	return app;
};
