import environment from "./src/utils/env.util.js";
//express
import express from "express";
import { engine } from "express-handlebars"

//htpp
import { createServer } from 'http';
// IMPLEMENTACION SOCKET
//import {Server} from "socket.io"
//import socketCb from "./src/routers/index.socket.js"

//args
import argsUtils from "./src/utils/args.utils.js";

//morgan
import morgan from "morgan";
//Routes
import indexRouter from "./src/routers/index.router.js";
//import indexViewRouter from "./src/routers/views/index.views.js";
//middlewares
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
//utils
import __dirname from "./src/utils.js";
//utils Mongo
import dbConnect from "./src/utils/dbConect.utils.js";
//coockies
import cookieParser from "cookie-parser";
// sessions express
//import fileStore from "session-file-store"

/*
console.log("Variable de entorno."+process.env.MONGO_URI);
*/
const server = express();
const port = environment.PORT || argsUtils.p;

const ready = async () => {
    console.log("Server ready on port:" + port)
    await dbConnect() //conect database
}
const nodeServer = createServer(server); // creamos un servidor de node pasandole la configuracion de nuestro servidor.

/* En caso de querer agregar SOCKET. 
//const socketServer = new Server(nodeServer); //Servidor TCP construyendo una instancia de servidor de Socket. Pasando como base el servidor de node.
//socketServer.on("connection", socketCb);
*/

nodeServer.listen(port, ready);
// Iniciar el servidor.
//const FileSession = fileStore(session)
server.use(cookieParser(environment.SECRET_JWT)); // metodos para gestionar cookies 
server.use(express.json()); //permite leer req.params y req.query
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));

//template engine
server.engine("handlebars", engine())
server.set("view engine", "handlebars");
server.set("views", __dirname + "/views");

//endpoints
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);

//console.log(argsUtils);
//console.log(environment);
/*process.on("exit", (code) => {
    console.log("justo antes de cerrar");
    console.log(code);
})
process.exit();
*/