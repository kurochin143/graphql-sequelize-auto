import supertest from "supertest";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { GRAPHQL_PATH, createExpressApp } from "../src/app";
import { Express } from "express";
import { print } from "graphql/language/printer";
import testEnv from "./testEnv";

class TestApp {
	private _app!: Express;
	private _token: string | undefined;

	async init() {
		this._app = await createExpressApp();
	}

	getApp = () => {
		return this._app;
	};

	getToken = () => {
		return this._token;
	};

	setToken = (token: string | undefined) => {
		this._token = token;
	};

	getHeaders = () => {
		const headers: {
			Authorization?: string;
		} = {};

		if (this._token !== undefined) {
			headers.Authorization = "Bearer " + this._token;
		}

		return headers;
	};

	static documentNodeToBody = <TResult, TVariables>(
		documentNode: TypedDocumentNode<TResult, TVariables>,
		variables?: TVariables,
	) => {
		return {
			query: print(documentNode),
			variables,
		};
	};

	appSupertest = () => {
		return supertest(this._app);
	};

	supertestGet = (
		url: string,
		options?: {
			isAuthenticated: boolean;
		},
	) => {
		let s = this.appSupertest().get(url);
		if (options?.isAuthenticated ?? true) {
			s = s.set(this.getHeaders());
		}

		return s;
	};

	supertestPost = (
		url: string,
		options?: {
			isAuthenticated: boolean;
		},
	) => {
		let s = this.appSupertest().post(url);
		if (options?.isAuthenticated ?? true) {
			s = s.set(this.getHeaders());
		}

		return s;
	};

	// create other supertest http verb here if it's missing

	gqlSupertest = async <TResult, TVariables>(
		documentNode: TypedDocumentNode<TResult, TVariables>,
		variables?: TVariables,
		options?: {
			expectStatus?: number;
			isAuthenticated?: boolean;
		},
	): Promise<TResult> => {
		const body = TestApp.documentNodeToBody(documentNode, variables);
		let s = this.appSupertest().post(GRAPHQL_PATH).send(body);
		if (options?.isAuthenticated ?? true) {
			s = s.set(this.getHeaders());
		}

		const res = await s.expect(options?.expectStatus ?? 200);
		expect(res.body.errors).toBeUndefined();
		return res.body.data;
	};

	shorten = () => {
		return {
			supertestPost: this.supertestPost,
			supertestGet: this.supertestGet,
			gqlSupertest: this.gqlSupertest,
		};
	};
}

export default TestApp;
