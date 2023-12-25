import AuthController from "../controllers/authController.js";
import { usersConnected } from "../lib/app.socket.js";
import { UserModel } from "../models/User.js";

export default async function verifyUser(socket, next) {
	const { token } = socket.handshake.auth;
	try {
		const user = AuthController.verifyToken(token);
		const users = await UserModel.find({});
		if(!usersConnected.find(e => e.id == user.id )) {
			usersConnected.push(user);
		}
		socket.emit("user:verified-user", user);
		socket.emit("user:all-users", users, usersConnected);
		next();
	} catch (e) {
		next(e);
	}
}