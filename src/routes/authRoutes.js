import express from "express";
import AuthController from "../controllers/authController.js";

const routes = express.Router();

routes.post("/signup", AuthController.signUp);
routes.post("/login", AuthController.login);
routes.post("/forgotpassword", AuthController.forgotPassword);
routes.patch("/resetpassword/:token", AuthController.resetPassword);

export default routes;