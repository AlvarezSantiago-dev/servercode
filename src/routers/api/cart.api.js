import { Router } from "express";
import cartsManger from "../../data/mongo/managers/CartManager.mongo.js";

const cartsRouter = Router();
//readOne
cartsRouter.get("/", async (req, resp) => {
    try {
        const allproducts = await cartsManger.read();
        if (allproducts.length > 0) {
            return resp.json({
                statusCode: 200,
                response: allproducts
            });
        } else {
            const error = new Error("NOT FOUND");
            error.statusCode = 404
            throw error;
        }
    } catch (error) {
        console.log(error);
        resp.status(404).json({
            response: null,
            menssage: "No se encuentra ningun carrito"
        })
    }
});

cartsRouter.get("/:id", async (req, resp) => {
    try {
        const { id } = req.params
        const one = await cartsManger.readOne(id);
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
});
// read
cartsRouter.get("/", async (req, resp) => {
    try {
        const { user_id } = req.query;
        const allproducts = await cartsManger.readCart(user_id);
        if (allproducts.length > 0) {
            return resp.json({
                statusCode: 200,
                response: allproducts
            });
        } else {
            const error = new Error("NOT FOUND");
            error.statusCode = 404
            throw error;
        }
    } catch (error) {
        console.log(error);
        resp.status(404).json({
            response: null,
            menssage: "No se encuentra ningun carrito"
        })
    }
});
//create 
cartsRouter.post("/", create);
cartsRouter.put("/:id", update);
cartsRouter.delete("/:id", destroy)




async function create(req, res, next) {
    try {
        const data = req.body;
        const newProduct = {
            product_id: data.product_id,
            user_id: '662abe20e8e9eb8629378f73',
            quantity: 1
        }
        const one = await cartsManger.create(newProduct);
        return res.json({
            statusCode: 201,
            response: one,
            message: "CREATED ID. " + one.id,
        });
    } catch (error) {
        return next(error);
    }
}

async function update(req, res, next) {
    try {
        const { id } = req.params;
        const data = req.body;
        const one = await cartsManger.update(id, data);
        return res.json({
            statusCode: 200,
            message: one,
        });
    } catch (error) {
        return next(error);
    }
}

async function destroy(req, resp, next) {
    try {
        const { id } = req.params;
        const one = await cartsManger.destroy(id)
        if (!one) {
            const error = new Error("NOT FOUND");
            error.statusCode = 404
            throw error;
        } else {
            return resp.json({
                statusCode: 200,
                response: one
            })
        }
    } catch (error) {
        return next(error)
    }
}


export default cartsRouter;