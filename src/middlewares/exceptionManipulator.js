import mongoose from "mongoose";
import jwt  from "jsonwebtoken";
import ErrorResponse from "../errors/ErrorResponse.js";
import RequestDataError from "../errors/RequestDataError.js";
import DataValidationError from "../errors/DataValidationError.js";
import UnauthorizedError from "../errors/Unauthorized.js";

// eslint-disable-next-line no-unused-vars
function exceptionManipulator(error, req, res, next) {
	console.log(error.name);
	console.log(error.message);
	console.log(error.stack);

	if(error instanceof ErrorResponse) {
		error.sendResponse(req, res);
		return;	
	}

	if(error instanceof mongoose.Error.CastError){
		new RequestDataError().sendResponse(req, res);
		return;
	}

	if(error instanceof mongoose.Error.ValidationError){
		new DataValidationError(error).sendResponse(req, res);
		return;
	}
	
	if(error instanceof jwt.TokenExpiredError){
		new UnauthorizedError("Token expired").sendResponse(req, res);
		return;
	}

	if(error instanceof jwt.JsonWebTokenError){
		new UnauthorizedError("Inavlid signature").sendResponse(req, res);
		return;
	}

	new ErrorResponse().sendResponse(req, res);
}

export default exceptionManipulator;