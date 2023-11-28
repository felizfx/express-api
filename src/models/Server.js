import "./globalValidator.js";
import mongoose from "mongoose";

const serverSchema = new mongoose.Schema({
	id: { 
		type: mongoose.Schema.Types.ObjectId 
	},
	name: { 
		type: String, 
		required: [true, "O nome do servidor é obrigatório"] ,
		validate: {
			validator: (value) => {
				return value.length > 2 && value.length < 20;
			},
			message: "O valor inseido é maior que 2 ou menor que 20 caracteres"
		}
	},
	description: { 
		type: String
	},
	tag: {
		type: String,
		required: [true, "O nome da tag é obrigatoria"],
		enum: {
			values: ["tst", "ofc"],
			message: ({ path, value }) => `A tag '${value}' no campo ${path} não esta dentro dos valores permitidos`
		}
	},
	createdAt: { 
		type: Date, 
		required: true 
	}
}, { versionKey: false });

const ServerModel = mongoose.model("servers", serverSchema);

export {ServerModel, serverSchema};