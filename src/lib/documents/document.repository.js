import { DocumentModel } from "../../models/Documets.js";

export default class DocumentsRepository {

	static async findAll() {
		const document = await DocumentModel.find({ });
    
		return document;
	}

	static async findDocuments(name) {
		const document = await DocumentModel.findOne({ name: name });

		if(!document) {
			return undefined;
		}
    
		return document;
	}

	static async createDocument(name, value) {
		let document = await DocumentModel.findOne({ name });

		if(document) {
			return;
		}

		document = DocumentModel.create({
			name,
			value
		});

		return document;
	}

	static async updateDocument(name, value) {
		const document = await DocumentModel.updateOne({ name }, { $set: { value } });

		return document;
	}

	static async deleteDocument(name) {
		const document = await DocumentModel.deleteOne({ name });

		return document;
	}
}