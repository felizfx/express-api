import "dotenv/config";
import app from "./src/app.js";
import chalk from "chalk";
import http from "http";

const PORT = 8000;
const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
	console.log(chalk.blue(`[server] server listening on port ${PORT}`));
});

export { httpServer };