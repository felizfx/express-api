import NotFoundError from "../errors/NotFoundError.js";
import ApiResponse from "../interface/ApiResponse.js";
import CreatedResponse from "../interface/CreatedResponse.js";
import NoContentResponse from "../interface/NoContentResponse.js";
import { ChatModel } from "../models/Chat.js";

class ChatController {
	static async getAllChats(req, res, next) {
		try {
			const chats = ChatModel.find().populate("server");
			req.result = chats;
			next();
		} catch (e) {
			next(e);	
		}
	}

	static async getChatById(req, res, next) {
		const id = req.params.id;
		try {
			const chats = await ChatModel.findById(id).populate("server");

			if (!chats) {
				next(new NotFoundError(`Chat of id: ${id} not found`));
				return;
			}

			new ApiResponse(undefined, undefined, chats).sendResponse(req, res);
		} catch (e) {
			next(e);
		}
	}

	static async getChatByServerId(req, res, next) {
		const serverId = req.params.serverid;
		try {
			const chats = await ChatModel.find({server: serverId}).exec();

			console.log(chats);

			if (chats.length === 0) {
				throw new NotFoundError(`Chats not foud for server id: ${serverId}`);
			}

			new ApiResponse(undefined, undefined, chats).sendResponse(req, res);
		} catch (e) {
			next(e);
		}
	}

	static async getChatsByFilters(req, res, next) {
		const { name } = req.query;

		try {
			let search = {};
			const name_regex = new RegExp(name, "i");
			
			if(name) search.name = name_regex;

			const chats = await ChatModel.find(search);

			if(chats.length == 0) throw new NotFoundError(`Any chat were found with the name '${name}'`);

			req.result = ChatModel.find(search).populate("server");
			next();
		} catch (e) {
			next(e);
		}
	}

	static async getChatsByServerFilters(req, res, next) {
		const {title, tag} = req.query;

		try {
			const chats = await ChatModel.find({}).populate("server");
			let filtredChats;

			if (title !== undefined && tag !== undefined) {
				filtredChats = chats.filter(o => 
					String(Object(o.server).name).includes(title) && String(Object(o.server).tag).includes(tag)
				);
			} else {
				filtredChats = chats.filter(o => 
					String(Object(o.server).name).includes(title) || String(Object(o.server).tag).includes(tag)
				);
			}

			if(filtredChats.length === 0){
				throw new NotFoundError(tag === undefined ? "No chats were found with this server name" : "No chats were found with this conditions");
			}

			new ApiResponse(undefined, undefined, filtredChats).sendResponse(req, res);
		} catch (e) {
			next(e);
		}
	}

	static async createChat(req, res, next) {
		try {

			const body = { ...req.body, createdAt: new Date() };
			// const servers = await server.findById(req.body.server)
			// const newChat = { ...req.body, server: servers }

			let chats = await ChatModel.create(body);
			chats = await chats.populate("server");

			new CreatedResponse(undefined, undefined, chats).sendResponse(req, res);
		} catch (e) {
			next(e);
		}
	}

	static async updateChat(req, res, next) {
		const id = req.params.id;
		try {
			const chats = await ChatModel.findByIdAndUpdate(id, req.body, {new: true});

			if(chats == null) {
				throw new NotFoundError(`Chat not found for id ${id}`);
			}

			new ApiResponse(undefined, undefined, chats).sendResponse(req, res);
		} catch (e) {
			next(e);
		}
	}

	static async deleteChat(req, res, next) {
		const id = req.params.id;
		try {
			const chats = await ChatModel.findByIdAndDelete(id);
			if(chats == null){
				throw new NotFoundError("Chat not found");
			}
			new NoContentResponse().sendResponse(req, res);
		} catch (e) {
			next(e);
		}
	}
}
export default ChatController;
