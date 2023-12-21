import DocumentsRepository from "./document.repository.js";

let usersConnected = [];

export function registerDocumentHandlers(socket, io) {
	socket.on("documents:get-all", async (callback) => {
		const documents = await DocumentsRepository.findAll();

		callback(documents);
	});

	socket.on("document:create", async (name) => {
		const document = await DocumentsRepository.createDocument(name, `${name} document`);

		io.emit("document:created", document);
	});
}
export function insideDocumentHandlers(socket, io) {
	socket.on("document:select", async (name, callback) => {
		socket.join(name);

		let document = await DocumentsRepository.findDocuments(name);

		if(document) {
			callback(document.value);
			return; // esse return nn deixa criar o disconnect abaixo dele
		}

		document = DocumentsRepository.createDocument(name, `${name} document`);
		callback(document.value);

		// console.log(io.of("/documents").sockets.adapter.rooms);
	});

	socket.on("document:txt-writing", async (value, name) => {
		socket.to(name).emit("document:txt-receiving", value);

		await DocumentsRepository.updateDocument(name, value);

		socket.broadcast.except(name).emit("document:user-writing-out", `User form socket ${socket.id} typing on ${name} file`);
	});

	socket.on("document:delete", async (name) => {
		await DocumentsRepository.deleteDocument(name);

		socket.to(name).emit("document:current-deleted");
		io.of("/start").emit("document:deleted", name);
	});

	socket.on("document:user-connecting", (user, room) => {
		if(!usersConnected.find(e => e.user == user.name && e.room == room )) {
			usersConnected.push({room, user: user.name});
		}
		
		io.of("/documents").to(room).emit("document:user-connected", usersConnected.filter((value) => {
			return value.room == room;
		}));

		socket.on("disconnect", () => {
			deleteUserByUsername(user.name, room, usersConnected);
			socket.to(room).emit("document:user-disconnected", user.name);
		});
	});
}

function deleteUserByUsername(username, room, userList) {
	const index = userList.findIndex(user => user.user === username && user.room === room);

	if (index !== -1) {
		userList.splice(index, 1);
	}

	return userList;
}
