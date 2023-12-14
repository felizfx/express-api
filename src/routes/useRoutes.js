import express from "express";
import UserController from "../controllers/userController.js";
import rolesGuard from "../middlewares/guard.js";
const routes = express.Router();

routes.get("/users", rolesGuard("owner"), UserController.getAllUsers);
routes.get("/currentuser", UserController.getCurrentUser);

export default routes;