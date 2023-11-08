import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
    id: { type: mongoose.Types.ObjectId },
    name: { type: String, required: true },
    server: { type: mongoose.Schema.Types.ObjectId, ref: 'servers' },
    createdAt: { type: Date, required: true }
}, { versionKey: false })

const chat = mongoose.model("chats", chatSchema)

export { chat, chatSchema }