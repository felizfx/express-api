import express from "express";
import { conn } from "./config/db-connect.js";
import routes from "./routes/index.js"

const app = express();
routes(app)

conn.then(data => {
  console.log("conexão aberta!");
}).catch(err => {
  console.log(`%cERRO DE CONEXÃO: ${err.message}`, 'color: red');
})

app.delete("/servers/:id", (req, res) => {
  const index = searchServer(req.params.id);
  servers.splice(index, 1);

  res.status(204).send();
});

export default app;
