import express from "express";
import ServerController from "../controllers/serverController.js";
import pagination from "../middlewares/pagination.js";
import rolesGuard from "../middlewares/guard.js";

const routes = express.Router();

routes.route("/servers",)
	.get(ServerController.getAllServers, pagination)
	.post(rolesGuard("admin", "owner"), ServerController.createServer);
routes.get("/servers/:id", ServerController.getServerById);
routes.put("/servers", ServerController.updateServer);
routes.delete("/servers/:id", ServerController.deleteServer);

export default routes;