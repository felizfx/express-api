import "./globalValidator.js";
import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
	id: { 
		type: mongoose.Types.ObjectId
	},
	name: { 
		type: String, 
		required: [true, "Chat name is required"],
		validate: {
			validator: (value) => {
				return value.length > 2 && value.length < 20;
			},
			message: "O valor inseido é maior que 2 ou menor que 20 caracteres"
		}
	},
	server: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: "servers",
		required: [true, "Chat must constains a server"]
	},
	createdAt: { 
		type: Date, 
		required: true 
	}
}, { versionKey: false });

const ChatModel = mongoose.model("chats", chatSchema);

export { ChatModel, chatSchema };