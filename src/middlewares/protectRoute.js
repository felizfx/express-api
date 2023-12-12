import ForbiddenError from "../errors/ForbiddenError.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import { UserModel } from "../models/User.js";
import NotFoundError from "../errors/NotFoundError.js";
import UnauthorizedError from "../errors/Unauthorized.js";

export default async  function protectRoutes(req, res, next) {
	let token;
	try {
		if (process.env.WHITELIST.includes((req.path).split("/")[1])) {
			return next();
		}

		if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
			token = req.headers.authorization.split(" ")[1];
		}
    
		if(!token) return next(new ForbiddenError("JWT token not sent"));
    
		const decoded = await promisify(jwt.verify)(token, process.env.SECRET);

		const user = await UserModel.findById(decoded.id);

		if(!user) {
			return next(new NotFoundError("No user were found for this token"));
		}

		if(user.changedPassword(decoded.iat)) {
			return next(new UnauthorizedError("User recently changed password! Please log in again"));
		}

		req.user = user;
		next();
	} catch (e) {
		next(e);
	}
}