import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import { Express } from "express";
import loadGraphQLSchema from "../graphql/loadGraphQLSchema";
import resolvers from "../resolvers";
import { expressMiddleware } from "@apollo/server/express4";

const apolloServer = async (app: Express) => {
	const httpServer = http.createServer(app);

	const server = new ApolloServer({
		schema: loadGraphQLSchema(),
		rootValue: resolvers,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});

	await server.start();

	return expressMiddleware(server);
};

export default apolloServer;
