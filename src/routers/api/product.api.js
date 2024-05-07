import { Router } from "express";
import productManager from "../../data/mongo/Managers/ProductManager.mongo.js";

//mongo import 

// fs import 
//import productManager from "../../data/fs/ProductsManager.promise.js";

// ENRRUTADOR RECURSO PRODUCTOS
const productRouter = Router();


// filtrado por category products
productRouter.get("/paginate", paginate);
productRouter.get("/:id", readOne);
productRouter.get("/", read);


productRouter.post("/", create); 
productRouter.put("/:id", update);
productRouter.delete("/:id", destroy);



async function read(req, resp, next) {
    try {
        const { category } = req.query;
        let allproducts;

        if (category) {
            allproducts = await productManager.read({ category });
        } else {
            // Si no se proporciona ninguna categoría, obtener todos los productos
            allproducts = await productManager.readAll();
        }

        if (allproducts.length > 0) {
            return resp.json({
                statusCode: 200,
                response: allproducts
            });
        } else {
            const error = new Error("NOT FOUND");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        next(error);
    }
}
async function readOne(req,resp,next){
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
        next(error);
    }
}
async function paginate(req, resp, next) {
    try {
        
        const filter = {}; // Puedes definir aquí tus filtros de ser necesario
        const opts = {};
        if(req.query.limit){
            opts.limit = req.query.limit
        }
        if(req.query.page){
            opts.page = req.query.page
        }
        //aca no va. va en carrito el filtrado.
        if(req.query.user_id){
            filter.user_id = req.query.user_id;
        }
        //eliminar cuando hagamos filtrado de cart.
        const all = await productManager.paginate({ filter, opts });
        return resp.json({
            statusCode: 200,
            response: all.docs,
            info :{
                page:all.page,
                totalPages: all.totalPages,
                limit: all.limit,
                prevPage: all.prevPage,
                nextPage: all.nextPage,
            }

        });
    } catch (error) {
        next(error);
    }
}
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
        if (!product) {
            const error = new Error('El Producto no existe');
            throw error;
            } else {
                return resp.json({
                    statusCode: 200,
                    message: `Se ha actualizado correctamente el producto con id ${id}`,
                    response: product })
            }
    } 
    catch (error) {
        return next(error)
    }
}
// elminar producto
async function destroy(req, resp, next)  {
    try {
        const {id} = req.params;
        const one = await productManager.destroy(id)
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
// endpoints

export default productRouter;
