import express from "express";
import ServerController from "../controllers/serverController.js";
import pagination from "../middlewares/pagination.js";

const routes = express.Router();

routes.get("/servers", ServerController.getAllServers, pagination);
routes.get("/servers/:id", ServerController.getServerById);
routes.post("/servers", ServerController.createServer);
routes.put("/servers", ServerController.updateServer);
routes.delete("/servers/:id", ServerController.deleteServer);

export default routes;