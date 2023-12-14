import * as server from "../../server.js";

server.io.on("connection", (socket) => {
	console.log("user conectado, id:", socket.id);
});