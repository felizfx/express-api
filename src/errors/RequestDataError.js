import ErrorResponse from "./ErrorResponse.js";

export default class RequestDataError extends ErrorResponse {
	name = "RequestDataError";
	constructor(message = "One or more params are incorrect"){
		super(400, message);
	}
}