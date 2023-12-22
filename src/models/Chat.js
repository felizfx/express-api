import "./globalValidator.js";
import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
	id: { 
		type: String
	},
	name: { 
		type: String, 
		// required: [true, "Chat name is required"],
		validate: {
			validator: (value) => {
				return value.length > 2 && value.length < 40;
			},
			message: "O valor inseido é menor que 2 ou maior que 20 caracteres"
		}
	},
	server: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: "servers",
		// required: [true, "Chat must constains a server"]
	},
	createdAt: { 
		type: Date, 
		required: true 
	}
}, { versionKey: false });

const ChatModel = mongoose.model("chats", chatSchema);

export { ChatModel, chatSchema };