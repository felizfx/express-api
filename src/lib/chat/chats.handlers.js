import { MessageModel } from "../../models/Message.js";

export function registerChatsHandlers(socket, io) {
	socket.on("chats:emit-room", async (room) => {
		socket.join(room);
	});

	socket.on("chats:get-messages", async (room, callback) => {
		const messages = await MessageModel.find({ receiverid: room });
		callback(messages);
	});

	socket.on("chats:send-message", async (author, receiver, message, room) => {
		io.of("/chats").to(room).emit("chats:reciving-message", message, author.name);

		await MessageModel.create({ author: author.name, receiverid: receiver, message, createdAt: new Date() });
	});
}