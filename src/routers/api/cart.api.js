
import cartsManger from "../../data/mongo/managers/CartManager.mongo.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import CustomRouter from "../CustomRouter.js";
import { Types } from "mongoose";


class CartsRouter extends CustomRouter {
    init() {
        this.create("/", ["ADMIN", "USER"], passportCb("jwt"), create);
        this.read("/", ["ADMIN", "USER"], passportCb("jwt"), readCart);
        this.read("/:id", ["ADMIN", "USER"], readOne);
        this.update("/:id", ["ADMIN", "USER"], update);
        this.destroy("/:_id", ["ADMIN", "USER"], destroy);
        this.destroy("/all", ["ADMIN", "USER"], destroyAll);

        this.read("/tikets/:id",["USER","ADMIN"],passportCb("jwt"), async (req, res, next) => {
            try {
               const { id } = req.params;
               
                const ticket = await cartsManger.aggregate([
                    {
                        $match: {
                            user_id: new Types.ObjectId(id),},
                    },
                    {
                        $lookup: {
                            foreignField: "_id",
                            from: "products",
                            localField: "product_id",
                            as: "product_id",
                        },
                    },
                    {
                        $replaceRoot: {
                            newRoot: {
                                $mergeObjects: [{ $arrayElemAt: ["$product_id", 0] }, "$$ROOT"],
                            },
                        },
                    },
                    {
                        $set: {
                            subTotal: { $multiply: ["$quantity", "$price"] },
                        },
                    },
                    { $group: { _id: "user_id", total: { $sum: "$subTotal" } } },
                    {
                        $project: { _id: 0, user_id: id, total: "$total", date: new Date() },
                    },
                    //{ $merge: { into: "tickets" } },
                ]);
                return res.exito200(ticket)
            } catch (error) {
                return next(error);
            }
        });
    }
}

const cartsRouter = new CartsRouter()

//funcional para las vistas
async function create(req, res, next) {
    try {
        const data = req.body;
        // si quiero q funcione el metodo en postman tengo q comentar las 2 lineas de abajo.
        const { user_id } = req.user
        data.user_id = user_id; // Obtiene el user_id de la cok
        let cart = await cartsManger.create(data)
        return res.exito201message(cart, "Producto agregado al carrito 😊")
    }
    catch (error) {
        return next(error);
    }
}
//read
async function readCart(req, resp, next) {
    try {

        const { user_id } = req.query
        const allproducts = await cartsManger.readCart(user_id);
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
async function readOne(req, resp, next) {
    try {
        const { id } = req.params
        const one = await cartsManger.readOne(id);
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
async function update(req, res, next) {
    try {
        const { id } = req.params;
        const data = req.body;
        //data.user_id = req.session.user_id

        const one = await cartsManger.update(id, data);
        return res.exito200(one);
    } catch (error) {
        return next(error);
    }
}

async function destroy(req, resp, next) {
    try {
        const { _id } = req.params;
        const one = await cartsManger.destroy(_id)
        if (!one) {
            return resp.error404();
        } else {
            return resp.exito200message(one, "eliminated")
        }
    } catch (error) {
        return next(error)
    }
}

async function destroyAll(req, res, next) {
    try {
        //console.log("hola")
        const { user_id } = req.body;
        //console.log(user_id)
        const all = await cartsManger.destroyAll({ user_id: user_id });
        return res.exito200(all);
    } catch (error) {
        return next(error);
    }
}

export default cartsRouter.getRouter()