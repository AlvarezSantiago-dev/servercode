import { Router } from "express";
import productManager from "../../data/fs/ProductsManager.promise.js";
// ENRRUTADOR RECURSO PRODUCTOS
const productRouter = Router();

//trer un solo producto
productRouter.get("/:id", async (req, resp) => {
    try {
        const { id } = req.params
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
});

// filtrado por category products
productRouter.get("/", async (req, resp) => {
    try {
        const { category } = req.query
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
productRouter.post("/", create); 
productRouter.put("/:id", update);
productRouter.delete("/:id", destroy);



// crear producto
async function create (req, resp, next) {
    try {
        const data = req.body; //Guardo en una variable el objeto body : Datos q me envia el usuario.
        let product = await productManager.create(data);
        return resp.json({
            statusCode: 201,
            menssage: 'Product created, id:' + product.id,
        })
    } catch (error) {
        return next(error)
    }
};
// actualizar producto
async function update(req, resp, next){
    try {
        const {id} = req.params;
        const data = req.body;
        const product = await productManager.update(id, data);
        return resp.json({
            statusCode: 200,
            response: product
        })
    } catch (error) {
        return next(error)
    }
}
// elminar producto
async function destroy(req, resp, next)  {
    try {
        const {id} = req.params;
        const one = await productManager.destroy(id)
        return resp.json({
            statusCode: 200,
            response: one
        })
    } catch (error) {
        return next(error)
    }
}
// endpoints

export default productRouter;
