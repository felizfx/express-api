import ErrorResponse from "./ErrorResponse.js";

export default class NotFoundError extends ErrorResponse {
	name = "NotFoundError";
	constructor(message = "Page not found") {
		super (404, message);
	}
}