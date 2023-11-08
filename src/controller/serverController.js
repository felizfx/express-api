import { server } from "../models/Server.js";

class ServerController {
  static async getAllServers(req, res) {
    try {
      const servers = await server.find({});
      res.status(200).json(servers);
    } catch (error) {
      res
        .status(error.status || 500)
        .send({ message: `${error.message} - falha ao consultar os servers` });
    }
  }

  static async getServerById(req, res) {
    try {
      const servers = await server.findById(req.params.id);

      if (!servers) {
        res.status(404).json({ message: "server não encontrado" });
        return;
      }

      res.status(200).json(servers);
    } catch (error) {
      res
        .status(error.status || 500)
        .send({ message: `${error.message} - falha ao consultar os servers` });
    }
  }

  static async createServer(req, res) {
    try {
      req.body["createdAt"] = new Date();
      const servers = await server.insertMany(req.body);

      res.status(201).send({
        message: `server ${req.body.name} criado com sucesso`,
        server: servers,
      });
    } catch (error) {
      res 
        .status(error.status || 500)
        .json({ message: `${error.message} - falha ao cadastrar server` });
    }
  }

  static async updateServer(req, res) {
    try {
      const body = { ...req.body };
      delete body["id"];

      const servers = await server.findByIdAndUpdate(req.body["id"], body);
      res
        .status(200)
        .send({ message: "Server atualizado com sucesso", server: server });
    } catch (error) {
      res
        .status(error.status || 500)
        .send({ message: `${error.message} - falha ao atualizar o server` });
    }
  }

  static async deleteServer(req, res) {
    try {
      await server.findByIdAndDelete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res
        .status(error.status || 500)
        .send(`${error.message} - falha ao exlcuir servidor`);
    }
  }
}

export default ServerController;
