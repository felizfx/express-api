import { ServerModel } from "../models/Server.js";
import NotFoundError from "../errors/NotFoundError.js";
import ApiResponse from "../interface/ApiResponse.js";
import CreatedResponse from "../interface/CreatedResponse.js";
import NoContentResponse from "../interface/NoContentResponse.js";

class ServerController {
	static async getAllServers(req, res, next) {
		try {
			const servers = ServerModel.find();
			req.result = servers;
			next();
		} catch (error) {
			next(error);
		}
	}

	static async getServerById(req, res, next) {
		const id = req.params.id;
		try {
			const servers = await ServerModel.findById(id);

			if (!servers) {
				next(new NotFoundError(`Server of id: ${id} not found`));
				return;
			}

			new ApiResponse(undefined, undefined, servers).sendResponse(req, res);
		} catch (error) {
			next(error);
		}
	}
  
	static async createServer(req, res, next) {
		try {
			req.body["createdAt"] = new Date();
			const servers = await ServerModel.insertMany(req.body);
			
			new CreatedResponse(undefined, undefined, servers).sendResponse(req, res);
		} catch (error) {
			next(error);
		}
	}

	static async updateServer(req, res, next) {
		const id = req.body["id"];
		try {
			const body = { ...req.body };
			delete body["id"];

			const servers = await ServerModel.findByIdAndUpdate(id, body, {new: true});

			if(servers == null) {
				throw new NotFoundError(`Server not found for id ${id}`);
			}

			new ApiResponse(undefined, undefined, servers).sendResponse(req, res);
		} catch (error) {
			next(error);
		}
	}

	static async deleteServer(req, res, next) {
		try {
			await ServerModel.findByIdAndDelete(req.params.id);
			new NoContentResponse().sendResponse(req, res);
		} catch (error) {
			next(error);
		}
	}
}

export default ServerController;
