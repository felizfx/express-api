import ErrorResponse from "./ErrorResponse.js";

export default class ForbiddenError extends ErrorResponse {
	constructor( message = "forbidden" ) {
		super(403, message);
	}
} 