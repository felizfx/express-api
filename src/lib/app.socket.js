import * as server from "../../server.js";
import { Server } from "socket.io";
import { emitText } from "./documents/documents.handlers.js";

const io = new Server(server.httpServer, {
	cors: {
		origin: "*",
	},
});

io.on("connection", (socket) => {
	console.log("user connected, id:", socket.id);

	socket.on("disconnect", (reason) => {
		console.log(`user of id ${socket.id} disconnected`);
		console.log(reason);
	});
	socket.on("txt-writing", emitText);
	socket.on("document:select", (name) => {
		socket.join(name);
		console.log(io.sockets.adapter.rooms);
	});
});