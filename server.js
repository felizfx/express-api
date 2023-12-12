import "dotenv/config";
import app from "./src/app.js";
import chalk from "chalk";

const PORT = 8000;

app.listen(PORT, () => {
	console.log(chalk.blue(`[server] server listening on port ${PORT}`));
});
