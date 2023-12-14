import "dotenv/config";
import app from "./src/app.js";
import chalk from "chalk";
import http from "http";
import { Server } from "socket.io";

const PORT = 8000;
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
	cors: {
		origin: "*",
	},
});

httpServer.listen(PORT, () => {
	console.log(chalk.blue(`[server] server listening on port ${PORT}`));
});

export { io, httpServer };