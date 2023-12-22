import ApiResponse from "./ApiResponse.js";

export default class NoContentResponse extends ApiResponse {
	constructor(status = 204, message = "No Content") {
		super(status, message);
	}
}   