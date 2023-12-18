import * as server from "../../server.js";
import { Server } from "socket.io";
// import { emitText } from "./documents/documents.handlers.js";
import DocumentsRepository from "./documents/document.repository.js";

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

	socket.on("txt-writing", async (value, name) => {
		socket.to(name).emit("txt-receiving", value);

		await DocumentsRepository.updateDocument(name, value);

		socket.broadcast.except(name).emit("document:user-writing-out", `User form socket ${socket.id} typing on ${name} file`);
	});

	socket.on("document:select", async (name, callback) => {
		socket.join(name);

		let document = await DocumentsRepository.findDocuments(name);

		if(document) {
			callback(document.value);
			return;
		}
		
		document = DocumentsRepository.createDocument(name, `${name} document`);
		callback(document.value);

		console.log(io.sockets.adapter.rooms);
	});

	socket.on("documents:get-all", async (callback) => {
		const documents = await DocumentsRepository.findAll();

		callback(documents);
	});

	socket.on("document:create", async (name) => {
		const document = await DocumentsRepository.createDocument(name, `${name} document`);

		io.emit("document:created", document);
	});

	socket.on("document:delete", async (name) => {
		await DocumentsRepository.deleteDocument(name);

		socket.to(name).emit("document:current-deleted");
		io.emit("document:deleted", name);
	});
});