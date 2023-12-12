import { UserModel } from "../models/User.js";
import ApiResponse from "../interface/ApiResponse.js";

export default class UserController {
	static async getCurrentUser(req, res, next) {
		try {
			const users = await UserModel.find({ _id: req.user.id });

			new ApiResponse(undefined, undefined, users).sendResponse(req, res);
		} catch (e) {
			next(e);
		}
	}

	static async getAllUsers(req, res, next) {
		try {
			const users = await UserModel.find({});

			new ApiResponse(undefined, undefined, users).sendResponse(req, res);
		} catch (e) {
			next(e);
		}
	}
}