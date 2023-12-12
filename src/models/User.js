import "./globalValidator.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import crypto from "crypto";

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "User name must not be empity"]
	},
	email: {
		type: String,    
		required: [true, "User email must not be empity"],
		unique: [true, "Email already exists"],
		lowercase: true,
		validate: {
			validator: (value) => {
				return value.includes("@") && value.includes(".");
			},
			message: "Invalid email"
		}

	},
	password: {
		type: String,
		required: [true, "User password must not be empity"],
		minlength: [5, "Password must contains 5 characters"],
		select: false
	},
	passwordChangedAt: {
		type: Date
	},
	passwordResetToken: {
		type: String
	},
	passwordResetExpires: {
		type: Date
	},
	role: {
		type: String,
		required: [true, "User roles must not be empity"],
		enum: {
			values: ["admin", "user", "owner"],
			message: ({ path, value }) => `The value '${value}' in field ${path} is not valid`
		}
	}
}, { versionKey: false });

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next(); 

	this.password = await bcrypt.hash(this.password, 12);
	next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPassword = function(JWTTimestamp) {
	if(this.passwordChangedAt) {
		const timeStamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);
		console.log(timeStamp, JWTTimestamp);
		return JWTTimestamp < timeStamp;
	}

	return false;
};

userSchema.methods.createPasswordUpdateToken = function () {
	const resetToken = crypto.randomBytes(32).toString("hex");

	this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

const UserModel = mongoose.model("users", userSchema);

export { UserModel, userSchema };