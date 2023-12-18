import express from "express";
import { conn } from "./config/db-connect.js";
import routes from "./routes/index.js";
import exceptionManipulator from "./middlewares/exceptionManipulator.js";
import manipulator404 from "./middlewares/manipulator404.js";
import requestTime from "./middlewares/requestTime.js";
import chalk from "chalk";
import protectRoutes from "./middlewares/protectRoute.js";

const app = express();
app.use(requestTime);
app.use(protectRoutes);
routes(app);
app.use(manipulator404);
app.use(exceptionManipulator);

conn.then(() => {
	console.log(chalk.green("[data_base] connection opened"));
}).catch(err => {
	console.log(chalk.red("[data_base] ERRO DE CONEXÃO: ") + err.message);
});

export default app;
