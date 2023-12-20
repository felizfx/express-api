import RequestDataError from "../errors/RequestDataError.js";
import UnauthorizedError from "../errors/Unauthorized.js";
import ApiResponse from "../interface/ApiResponse.js";
import CreatedResponse from "../interface/CreatedResponse.js";
import NotFoundError from "../errors/NotFoundError.js";
import { UserModel } from "../models/User.js";
import sendEmail from "../utils/email.js";
import jwt from "jsonwebtoken";
import ErrorResponse from "../errors/ErrorResponse.js";
import crypto from "crypto";
import createhtml from "../utils/createhtml.js";

export default class AuthController {
	static generateToken(info) {
		const token = jwt.sign({ ...info }, process.env.SECRET, {
			expiresIn: "5h"
		});

		return token;
	}

	static decodeToken(token) {
		return jwt.decode(token, { complete: true });
	}

	static verifyToken(token) {
		return jwt.verify(token, process.env.SECRET);
	}

	static async signUp(req, res, next) {
		try {
			const userEmail = await UserModel.find({ email: req.body.email });

			if (userEmail.length != 0) return next(new RequestDataError("The email already exists."));

			const user = await UserModel.create({...req.body});

			const token = AuthController.generateToken({ id: user._id, email: user.email, role: user.role });

			const response = { token: token, user: { ...user._doc } };

			new CreatedResponse(undefined, undefined, response).sendResponse(req, res);
		} catch (e) {
			next(e);
		}
	}

	static async login(req, res, next) {
		try {
			const { email, password } = req.body;
			if( !email || !password ) return next(new RequestDataError("Insert all the fields"));

			const user = await UserModel.findOne({ email }).select("+password");
			if(!user || !await user.correctPassword(password, user.password)) return next(new UnauthorizedError("Incorect email or password"));

			const token = AuthController.generateToken({id: user._id, email: email, role: user.role });

			new ApiResponse(undefined, undefined, {token: token}).sendResponse(req, res);
		} catch (e) {
			next(e);
		}
	}

	static async forgotPassword(req, res, next) {
		try {
			const user = await UserModel.findOne({ email: req.body.email });

			if(!user) return next(new NotFoundError("User not found for this email"));

			const resetToken = user.createPasswordUpdateToken();
			await user.save({ validateBeforSave: false });

			// const resetUrl = `${req.protocol}://${req.get("host")}/resetpassword/${resetToken}`;

			const options = {
				name: user.name,
				email: user.email,
				subject: "Your password reset token (valid for 10 min)",
				message: "Change password",
				token: resetToken
			};

			try{ 
				await sendEmail(options, createhtml(options));
	
				new ApiResponse().sendResponse(req, res);
			} catch (e) {
				user.passwordResetToken = undefined;
				user.passwordResetExpires = undefined;

				await user.save({ validateBeforSave: false });

				console.log(e);

				return next(new ErrorResponse(undefined, "Error in send the password reset token"));
			}
		} catch (e) {
			next(e);
		}
	}

	// eslint-disable-next-line no-unused-vars
	static async resetPassword (req, res, next) {
		const hashedToken = crypto
			.createHash("sha256")
			.update(req.params.token)
			.digest("hex");

		try {
			const user = await UserModel.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });

			if(!user) return next(new RequestDataError("Token is invalid or has expired"));

			user.password = req.body.password;
			user.passwordResetToken = undefined;
			user.passwordResetExpires = undefined;
			user.save();

			const token = AuthController.generateToken({id: user._id, email: user.email, role: user.role });

			new ApiResponse(undefined, undefined, {token: token}).sendResponse(req, res);
		} catch (e) {
			next(e);
		}
	}
}