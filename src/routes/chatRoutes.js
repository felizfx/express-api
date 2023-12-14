import express from "express";
import ChatController from "../controllers/chatController.js";
import pagination from "../middlewares/pagination.js";

const routes = express.Router();

routes.get("/chats", ChatController.getAllChats, pagination);
routes.get("/chats/chat", ChatController.getChatsByFilters, pagination);
routes.get("/chats/server", ChatController.getChatsByServerFilters);
routes.get("/chats/server/:serverid", ChatController.getChatByServerId);
routes.get("/chats/:id", ChatController.getChatById);
routes.post("/chats", ChatController.createChat);
routes.patch("/chats/:id", ChatController.updateChat);
routes.delete("/chats/:id", ChatController.deleteChat);

export default routes;