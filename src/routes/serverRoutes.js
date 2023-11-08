import express from 'express'
import ServerController from '../controller/serverController.js'

const routes = express.Router()

routes.get("/servers", ServerController.getAllServers)
routes.get("/servers/:id", ServerController.getServerById)
routes.post("/servers", ServerController.createServer)
routes.put("/servers", ServerController.updateServer)
routes.delete("/servers/:id", ServerController.deleteServer)

export default routes