import express from 'express'
import ChatController from '../controller/chatController.js'

const routes = express.Router()

routes.get("/chats", ChatController.getAllChats)
routes.get("/chats/:id", ChatController.getChatById)
routes.post("/chats", ChatController.createChat)

export default routes