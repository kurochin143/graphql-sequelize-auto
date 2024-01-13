import path from "path";
import db from "../db";
import KnownError from "../classes/KnownError";
import { GraphQLSequelizeAuto } from "../../scripts/gsa/service/GraphQLSequelizeAuto";

let _gsa: GraphQLSequelizeAuto | undefined;

const gsaService = {
	init: () => {
		_gsa = new GraphQLSequelizeAuto(
			db.getSequelize(),
			path.resolve(__dirname, "../nonCode/generated/gsa/mappings.generated.json"),
		);
	},

	getGsa: () => {
		if (!_gsa) {
			throw new KnownError("GraphQLSequelizeAuo has not initialized", 500);
		}

		return _gsa;
	},
};

export default gsaService;
