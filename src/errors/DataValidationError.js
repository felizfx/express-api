import RequestDataError from "./RequestDataError.js";

export default class DataValidationError extends RequestDataError {
	name = "DataValidationError";
	constructor(error) {
		super("One or more argments are incorrects or missing");
		const details = Object.values(error.errors)
			.map(e => e.message + ";");
		this.details = details;
	}
}