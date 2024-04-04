import express from "express";
import indexRouter from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
const server = express();
const port = 8080;
const ready = () => { console.log("Server ready on port:" + port) }

server.listen(port, ready);
// Iniciar el servidor.
//middlewares

server.use(express.json()); // para que los datos se envíen en formato JSON
server.use(express.urlencoded({ extended: true }));


server.get("/", async (req, resp) => {
    try {
        return resp.status(200).json({
            response: "Coder Api",
            success: true
        })
    } catch (error) {
        console.log(error);
        resp.status(404).json({
            response: null,
            menssage: "error"
        })
    }
})

server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);