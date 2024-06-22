

import passportCb from "../../middlewares/passportCb.mid.js";
import CustomRouter from "../CustomRouter.js";

import { readCart,create,readOne,update,destroy,destroyAll,viewTickets } from "../../controllers/carts.controller.js";

class CartsRouter extends CustomRouter {
    init() {
        this.create("/", ["ADMIN", "USER"], passportCb("jwt"), create);
        this.read("/", ["ADMIN", "USER"], passportCb("jwt"), readCart);
        this.read("/:id", ["ADMIN", "USER"], readOne);
        this.update("/:id", ["ADMIN", "USER"], update);
        this.destroy("/:_id", ["ADMIN", "USER"], destroy);
        this.destroy("/all", ["ADMIN", "USER"], destroyAll);
        this.read("/tikets/:id", ["USER", "ADMIN"], passportCb("jwt"), viewTickets);
    }
}

const cartsRouter = new CartsRouter()

export default cartsRouter.getRouter()