export default class ApiResponse {
	constructor(status = 200, message = "Sucess", data = undefined) {
		this.status = status,
		this.message = message,
		this.data = data;
	}

	sendResponse(req, res) {
		res.status(this.status).json({
			timestamp: req.requestTime,
			status: this.status,
			message: this.message,
			data: this.data
		});
	}
}