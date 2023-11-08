import express from "express"
import serverRoutes from './serverRoutes.js'
import chatRoutes from './chatRoutes.js'

let routes = [serverRoutes, chatRoutes]

const route = (app) => {

    app.get("/", (req, res) => {
        res.status(200).send("Chat API")
    })

    app.use(express.json(), routes)
}

export default route