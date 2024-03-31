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

// filtrado por role.
server.get("/api/users", async (req, resp) => {
    try {
        const {role} = req.query
        const all = await userManager.read(role)
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
        resp.status(404).json({
            response: null,
            menssage: "No se encuentra el rol "
        })
    }
})
// filtrado por category 
server.get("/api/products", async (req, resp) => {
    try {
        const {category} = req.query
        const allproducts = await productManager.read(category);
        if (allproducts) {
            return resp.status(200).json({
                responese: allproducts,
                category,
                success: true
            })
        } else {
            const error = new Error("NOT FOUND");
            error.statusCode = 404
            throw error;
        }
    } catch (error) {
        console.log(error);
        resp.status(404).json({
            response: null,
            menssage: "No se encuentra la categoria"
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
        resp.status(404).json({
            response: null,
            menssage: "No se encuentra el usuario"
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
        resp.status(404).json({
            response: null,
            menssage: "No se encuentra el producto"
        })
    }
})

