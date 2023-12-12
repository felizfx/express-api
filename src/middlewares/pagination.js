import RequestDataError from "../errors/RequestDataError.js";
import ApiResponse from "../interface/ApiResponse.js";

// eslint-disable-next-line no-unused-vars
export default async function pagination(req, res, next) {
	let { limit = 5, page = 1, orderBy = "name", order = -1 } = req.query;

	limit = parseInt(limit);
	page = parseInt(page);
	order = parseInt(order);

	if (limit > 0 && page > 0 && !isNaN(order)) {
		const itens = await req.result
			.sort({ [orderBy]: order })
			.skip((page - 1) * limit)
			.limit(limit);

		// setTimeout(() => {
		// 	new ApiResponse(undefined, undefined, chats).sendResponse(req, res);
		// }, 3000);

		new ApiResponse(undefined, undefined, itens).sendResponse(req, res);
		return;
	}

	next(new RequestDataError());
}