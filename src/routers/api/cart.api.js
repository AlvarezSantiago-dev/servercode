import { Router } from "express";
import cartsManger from "../../data/mongo/Managers/CartManager.mongo.js";

const cartsRouter = Router();
//readOne
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
        const allproducts = await cartsManger.read();
        if (allproducts.length  > 0) {
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

async function create (req, resp, next) {
    try {
        const data = req.body; //Guardo en una variable el objeto body : Datos q me envia el usuario.
        let product = await cartsManger.create(data);
        return resp.json({
            statusCode: 201,
            menssage: 'Product created, id:' + product.id,
        })
    } catch (error) {
        return next(error)
    }
};


async function update(req, resp, next){
    try {
        const {id} = req.params;
        const data = req.body;
        const cart = await cartsManger.update(id, data);
        if (!cart) {
            const error = new Error('El cart no existe');
            throw error;
            } else {
                return resp.json({
                    statusCode: 200,
                    message: `Se ha actualizado correctamente el cart con id ${id}`,
                    response: cart })
            }
    } 
    catch (error) {
        return next(error)
    }
}

async function destroy(req, resp, next)  {
    try {
        const {id} = req.params;
        const one = await cartsManger.destroy(id)
        if  (!one) {
            const error = new Error("NOT FOUND");
            error.statusCode = 404
            throw error;
        } else{
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