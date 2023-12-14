import NotFoundError from "../errors/NotFoundError.js";

// eslint-disable-next-line no-unused-vars
export default function manipulator404 (req, res, next){
	next(new NotFoundError("Page not found"));
}