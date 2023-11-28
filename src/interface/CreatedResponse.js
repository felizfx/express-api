import ApiResponse from "./ApiResponse.js";

export default class CreatedResponse extends ApiResponse {
	constructor(status = 201, message = "Created", data = null){
		super(status, message, data);
	}
}