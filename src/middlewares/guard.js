import ForbiddenError from "../errors/ForbiddenError.js";

export default function rolesGuard(...roles) {
	return (req, res, next) => {
		if(!roles.includes(req.user.role)) {
			return next(new ForbiddenError("User not allowed to perform this action"));
		}

		next();
	};
}