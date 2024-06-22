

import { agregateService, createService, destroyAllService, destroyService, readCartService, readOneService, updateService } from "../services/carts.service.js";
//funcional para las vistas

class CartsController {
    async create(req, res, next) {
        try {
            const data = req.body;
            // si quiero q funcione el metodo en postman tengo q comentar las 2 lineas de abajo.
            const { user_id } = req.user
            data.user_id = user_id; // Obtiene el user_id de la cok
            let cart = await createService(data);
            return res.exito201message(cart, "Producto agregado al carrito 😊")
        }
        catch (error) {
            return next(error);
        }
    }
    //read
    async readCart(req, resp, next) {
        try {
    
            const { user_id } = req.query
            const allproducts = await readCartService(user_id);
            //const { user_id } = req.user
            if (allproducts.length > 0) {
                return resp.exito200(allproducts)
            }
            else {
                return resp.error404();
            }
        } catch (error) {
            return next(error)
        }
    };
    //readOne
    async readOne(req, resp, next) {
        try {
            const { id } = req.params
            const one = await readOneService(id);
            if (one) {
                return resp.exito200(one)
            } else {
                return resp.error404();
            }
        } catch (error) {
            console.log(error);
            resp.status(404).json({
                response: null,
                menssage: "No se encuentra el producto"
            })
        }
    };
    //create 
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const data = req.body;
            //data.user_id = req.session.user_id
    
            const one = await updateService(id,data);
            return res.exito200(one);
        } catch (error) {
            return next(error);
        }
    }
    
    async destroy(req, resp, next) {
        try {
            const { _id } = req.params;
            const one = await destroyService(_id);
            if (!one) {
                return resp.error404();
            } else {
                return resp.exito200message(one, "eliminated")
            }
        } catch (error) {
            return next(error)
        }
    }
    
    async destroyAll(req, res, next) {
        try {
            //console.log("hola")
            const { user_id } = req.body;
            //console.log(user_id)
            const all = destroyAllService(user_id);
            return res.exito200(all);
        } catch (error) {
            return next(error);
        }
    }
    
    async viewTickets(req, resp, next) {
        try {
            const { id } = req.params;
            const ticket = await agregateService(id)
            return resp.exito200(ticket)
        } catch (error) {
            return next(error);
        }
    }
}

const cartsController = new CartsController();
const {create, readCart,readOne,update,destroy,destroyAll,viewTickets} = cartsController
export {create, readCart,readOne,update,destroy,destroyAll,viewTickets};