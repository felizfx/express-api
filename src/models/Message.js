import "./globalValidator.js";
import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
	id: { 
		type: mongoose.Types.ObjectId
	},
	author: { 
		type: String,
		required: [true, "Authorid must be provider"]
	},
	receiverid: {
		type: String,
		required: [true, "Receiverid must be provider"]
	},
	message: {
		type: String,
		required: [true, "Message must be provided"]
	},
	createdAt: { 
		type: Date, 
		required: true 
	}
}, { versionKey: false });

const MessageModel = mongoose.model("messages", messageSchema);

export { MessageModel, messageSchema };