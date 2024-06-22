
//import userManager from "../../data/fs/UsersManager.promises.js";
import CustomRouter from "../CustomRouter.js";
import { create, paginate, update,destroy,read,readOne } from "../../controllers/users.controller.js";
// ENRRUTADOR RECURSO USUARIOS
class UsersRouter extends CustomRouter {
    init() {
        this.read("/paginate", ["PUBLIC"], paginate)
        this.create("/",["PUBLIC"], create);
        this.update("/:id",["PUBLIC"], update);
        this.destroy("/:id",["PUBLIC"], destroy);
        this.read("/",["PUBLIC"], read);
        this.read("/:id",["PUBLIC"], readOne)
    }
}

const usersRouter = new UsersRouter()


// FIN ENDPOINTS
export default usersRouter.getRouter();