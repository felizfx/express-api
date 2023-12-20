import AuthController from "../controllers/authController.js";

export default function verifyUser(socket, next) {
	const { token } = socket.handshake.auth;
	try {
		AuthController.verifyToken(token);
		next();
	} catch (e) {
		next(e);
	}
}