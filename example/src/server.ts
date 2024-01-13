import env from "./env";
import db from "./db";
import gsaService from "./services/gsaService";
import { createExpressApp } from "./app";

void (async () => {
	const app = await createExpressApp();

	const server = app.listen(env.PORT, async () => {
		await db.start(true);
		gsaService.init();

		console.info(`HTTP server listening at http://localhost:${env.PORT}`);
	});

	const shutDown = async () => {
		console.info("Shutting down server");

		server.close(async (err) => {
			if (err) {
				console.error("HTTP server shutdown failed, exiting");
				console.error(err);
				process.exit(1);
			} else {
				await db.stop();

				console.info("HTTP server shutdown successfully");
				console.info("Shutting down web socket server");
			}
		});
	};

	process.on("SIGTERM", shutDown);
	process.on("SIGINT", shutDown);
})();
