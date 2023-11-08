import mongoose from "mongoose";

const serverSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, required: true }
}, { versionKey: false })

const server = mongoose.model("servers", serverSchema)

export {server, serverSchema}