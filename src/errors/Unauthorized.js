import ErrorResponse from "./ErrorResponse.js";

export default class UnauthorizedError extends ErrorResponse {
	name = "UnauthorizedError";
	constructor (message = "Unauthorized") {
		super(401, message);
	}
}