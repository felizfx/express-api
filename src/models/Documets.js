import "./globalValidator.js";
import mongoose from "mongoose";

const documentSchema = mongoose.Schema({
	name: { 
		type: String
	},
	value: {
		type: String
	}
}, { versionKey: false });

const DocumentModel = mongoose.model("documents", documentSchema);

export { documentSchema, DocumentModel };