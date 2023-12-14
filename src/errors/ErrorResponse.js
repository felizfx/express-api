export default class ErrorResponse extends Error {
	name = "ResponseError";
	constructor(status = 500, message = "Internal Server Error") {
		super();
		this.message = message;
		this.status = status;
	}

	sendResponse(req, res) {
		res.status(this.status).json({
			timestamp: req.requestTime,
			status: this.status,
			message: this.message,
			details: this.details
		});
	}
}