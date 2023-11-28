import express from "express";
import { conn } from "./config/db-connect.js";
import routes from "./routes/index.js";
import exceptionManipulator from "./middlewares/exceptionManipulator.js";
import manipulator404 from "./middlewares/manipulator404.js";
import requestTime from "./middlewares/requestTime.js";
import chalk from "chalk";

const app = express();
app.use(requestTime);
routes(app);
app.use(manipulator404);
app.use(exceptionManipulator);

conn.then(() => {
	console.log(chalk.green("conexão aberta!"));
}).catch(err => {
	console.log(chalk.red("ERRO DE CONEXÃO: ") + err.message);
});

export default app;
