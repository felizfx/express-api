import * as server from "../../server.js";
import { Server } from "socket.io";
import { registerDocumentHandlers, insideDocumentHandlers } from "./documents/documents.handlers.js";
import { registerChatsHandlers } from "./chat/chats.handlers.js";
import verifyUser from "../middlewares/verifyUser.socket.js";

const io = new Server(server.httpServer, {
	cors: {
		origin: "*",
	},
});

export let usersConnected = [];

io.on("new_namespace", (namespace) => {
	namespace.use(verifyUser);
});

io.of("/start").on("connection", (socket) => {
	socket.on("user:logging", (user) => {
		console.log(usersConnected);
		socket.broadcast.emit("user:logged", user);


		socket.on("disconnect", () => {
			socket.broadcast.emit("user:offline", user);
			deleteUserByUserId(user.id, usersConnected);
		});
	});

	registerDocumentHandlers(socket, io.of("/start"));
});

io.of("/documents").on("connection", (socket) => {
	insideDocumentHandlers(socket, io);
});

io.of("/chats").on("connection", (socket) => {
	registerChatsHandlers(socket, io);
});

io.of("/").on("connection", (socket) => {
	console.log("user connected, id:", socket.id);
});

function deleteUserByUserId(userid, userList) {
	const index = userList.findIndex(user => user.id === userid);

	if (index !== -1) {
		userList.splice(index, 1);
	}

	return userList;
}