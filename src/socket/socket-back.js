import * as server from "../../server.js";

server.io.on("connection", (socket) => {
	console.log("user connected, id:", socket.id);

	socket.on("txt-writing", (value) => {
		console.log(value);
	});

	socket.on("disconnect", () => {
		console.log(`user of id ${socket.id} disconnected`);
	});
});