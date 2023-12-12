import express from "express";
import serverRoutes from "./serverRoutes.js";
import chatRoutes from "./chatRoutes.js";
import authRoutes from "./authRoutes.js";
import userRoutes from "./useRoutes.js";
import cors from "cors";

let routes = [serverRoutes, chatRoutes, authRoutes, userRoutes];

const route = (app) => {
	app.get("/", (req, res) => {
		res.status(200).send("Chat API");
	});
	app.use(cors(), express.json(), routes);
};

export default route;