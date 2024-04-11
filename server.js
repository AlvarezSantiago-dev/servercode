import express from "express";
import {createServer} from 'http';
import {Server} from "socket.io"


import {engine} from "express-handlebars"
import morgan from "morgan";

import socketCb from "./src/routers/index.socket.js"

import indexRouter from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import __dirname from "./src/utils.js";

const server = express();
const port = 8080;
const ready = () => { console.log("Server ready on port:" + port) }
const nodeServer = createServer(server); // creamos un servidor de node pasandole la configuracion de nuestro servidor.

const socketServer = new Server(nodeServer); //Servidor TCP construyendo una instancia de servidor de Socket. Pasando como base el servidor de node.

socketServer.on("connection", socketCb);


nodeServer.listen(port, ready);
// Iniciar el servidor.

//inicializar el motor handlebars
server.engine("handlebars", engine()) // carpeta de las vistas
server.set( "view engine", "handlebars") //asignamos  a handlebars como nuestro motor de plantillas
server.set('views', __dirname+ '/views')  //carpeta donde se encuentran las v
//Midleware para mostrar

//middlewares
server.use(express.json()); // para que los datos se envíen en formato JSON
server.use(express.urlencoded({ extended: true }));  //Para poder enviar información por get o post con parámetros
server.use(morgan("dev")); //muestra las peticiones realizadas al servidor
server.use(express.static( __dirname+"/public")) // sirve todos


server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);