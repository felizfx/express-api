import AuthController from "../controllers/authController.js";

export default function verifyUser(socket, next) {
	const { token } = socket.handshake.auth;
	try {
		const user = AuthController.verifyToken(token);
		socket.emit("document:verified-user", user);
		next();
	} catch (e) {
		next(e);
	}
}