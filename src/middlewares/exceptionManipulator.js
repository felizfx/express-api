import mongoose from "mongoose";
import ErrorResponse from "../errors/ErrorResponse.js";
import RequestDataError from "../errors/RequestDataError.js";
import DataValidationError from "../errors/DataValidationError.js";

// eslint-disable-next-line no-unused-vars
function exceptionManipulator(error, req, res, next) {
	console.log(error.name);
	console.log(error.message);

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

	new ErrorResponse().sendResponse(req, res);
}

export default exceptionManipulator;