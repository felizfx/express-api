import { chat } from "../models/Chat.js";
import { server } from "../models/Server.js";

class ChatController {
  static async getAllChats(req, res) {
    try {
      const chats = await chat.find({})
      .populate('server')
      res.status(200).json(chats);
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ message: `${error.message} - falha ao consultar os chats` });
    }
  }

  static async getChatById(req, res) {
    try {
      const chats = await chat.findById(req.params.id)
      .populate('server');

      if (!chats) {
        res.status(404).json({ message: "Chat não encontrado" });
        return;
      }

      res.status(200).json(chats);
    } catch (e) {
      res
        .status(500)
        .json({
          message: `Error - ${e} erro ao procurar o chat ${req.params.id}`,
        });
    }
  }

  static async createChat(req, res) {
     try {
      req.body["createdAt"] = new Date()
      // const servers = await server.findById(req.body.server)
      // const newChat = { ...req.body, server: servers, teste2: "ola mundo" }

      let chats = await chat.create(req.body)
      chats = await chats.populate("server")

      res.status(201).json({ message: "chat criado com sucesso", chat: chats })

     } catch (e) {
      res
      .status(500)
      .json({
        message: `Error - ${e} erro ao inserir o chat`,
      });
     }
  }
}
export default ChatController;
