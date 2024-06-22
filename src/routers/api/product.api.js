
import CustomRouter from "../CustomRouter.js";
import passportCb from "../../middlewares/passportCb.mid.js";

import { create,paginate,read,readOne,update,destroy } from "../../controllers/products.controller.js";
// ENRRUTADOR RECURSO PRODUCTOS

class ProductRouter extends CustomRouter {
    init() {
        this.read("/paginate", ["PUBLIC"], paginate);
        this.read("/", ["PUBLIC"], read);
        this.read("/:id", ["PUBLIC"], readOne);
        this.create("/", ["ADMIN"], passportCb("jwt"), create);
        this.update("/:id", ["ADMIN"],passportCb("jwt"), update);
        this.destroy("/:id", ["ADMIN"],passportCb("jwt"), destroy);
    }
}

const productRouter = new ProductRouter();


// endpoints

export default productRouter.getRouter();
