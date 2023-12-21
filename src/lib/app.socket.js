import * as server from "../../server.js";
import { Server } from "socket.io";
// import { emitText } from "./documents/documents.handlers.js";
import { registerDocumentHandlers, insideDocumentHandlers } from "./documents/documents.handlers.js";
import verifyUser from "../middlewares/verifyUser.socket.js";

const io = new Server(server.httpServer, {
	cors: {
		origin: "*",
	},
});

io.of("/start").use(verifyUser);
io.of("/documents").use(verifyUser);

io.of("/start").on("connection", (socket) => {
	registerDocumentHandlers(socket, io.of("/start"));
});

io.of("/documents").on("connection", (socket) => {
	insideDocumentHandlers(socket, io);
});

io.of("/").on("connection", (socket) => {
	console.log("user connected, id:", socket.id);
});