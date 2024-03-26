import express from "express";
import userManager from "./data/fs/UsersManager.promises.js";
import productManager from "./data/fs/ProductsManager.promise.js";

const server = express();
const port = 8080;
const ready = () => { console.log("Server ready on port:" + port) }

server.listen(port, ready);
// Iniciar el servidor.
//middlewares
server.use(express.urlencoded({ extended: true }));


// traer todos los usuarios 
server.get("/api/users", async (req, resp) => {
    try {
        const all = await userManager.read()
        if (all) {
            return resp.status(200).json({
                responese: all,
                success: true,

            })
        } else {
            const error = new Error("NOT FOUND");
            error.statusCode = 404
            throw error;
        }
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            response: "Coder error",
            success: false
        })
    }
})
// traer todos los productos.
server.get("/api/products", async (req, resp) => {
    try {
        const all = await productManager.read()
        if (all) {
            return resp.status(200).json({
                responese: all,
                success: true,

            })
        } else {
            const error = new Error("NOT FOUND");
            error.statusCode = 404
            throw error;
        }
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            response: "Coder error",
            success: false
        })
    }
})
// trer un solo user.
server.get("/api/users/:id", async (req, resp) => {
    try {
        const {id} = req.params
        const one = await userManager.readOne(id);
        if (one) {
            return resp.status(200).json({
                response: one,
                success: true
            })
        } else {
            const error = new Error("NOT FOUND");
            error.statusCode = 404
            throw error;
        }
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            response: "Coder error",
            success: false
        })
    }
})
//trer un solo producto
server.get("/api/products/:id", async (req, resp) => {
    try {
        const {id} = req.params
        const one = await productManager.readOne(id);
        if (one) {
            return resp.status(200).json({
                response: one,
                success: true
            })
        } else {
            const error = new Error("NOT FOUND");
            error.statusCode = 404
            throw error;
        }
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            response: "Coder error",
            success: false
        })
    }
})
