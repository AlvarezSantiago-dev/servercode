
//import userManager from "../../data/fs/UsersManager.promises.js";
import userManager from "../../data/mongo/Managers/UserManager.mongo.js";
import CustomRouter from "../CustomRouter.js";

// ENRRUTADOR RECURSO USUARIOS
class UsersRouter extends CustomRouter {
    init() {
        this.read("/paginate", ["PUBLIC"], paginate)

        this.create("/",["ADMIN"], create);
        this.update("/:id",["ADMIN"], update);
        this.destroy("/:id",["ADMIN"], destroy);

        this.read("/",["PUBLIC"], read);
        this.read("/:id",["PUBLIC"], readOne)
    }
}

const usersRouter = new UsersRouter()



async function readOne(req, resp, next) {
    try {
        const { id } = req.params
        const one = await userManager.readOne(id);
        if (one) {
            return resp.exito200(one)
        } else {
            return resp.error404();
        }
    } catch (error) {
        return next(error)
    }
}
async function paginate(req, resp, next) {
    try {
        const filter = {}; // Puedes definir aquí tus filtros de ser necesario
        const opts = {};
        const all = await userManager.paginate({ filter, opts });
        return resp.json({
            statusCode: 200,
            response: all.docs,
            info: {
                page: all.page,
                totalPages: all.totalPages,
                limit: all.limit,
                prevPage: all.prevPage,
                nextPage: all.nextPage,
            }
        })
    } catch (error) {
        return next(error);
    }
}
async function read(req, resp, next) {
    try {
        //const { role } = req.query
        const all = await userManager.read()
        if (all) {
            return resp.status(200).json({
                responese: all,
                success: true,
            })
        } else {
            return resp.error404();
        }
    } catch (error) {
        return next(error)
    }
}
async function create(req, resp, next) {
    try {
        const data = req.body; //Guardo en una variable el objeto body : Datos q me envia el usuario.
        let product = await userManager.create(data);
        return resp.exito201('Product created, id:' + product.id)
    } catch (error) {
        return next(error)
    }
};
async function update(req, resp, next) {
    try {
        const { id } = req.params;
        const data = req.body;
        const product = await userManager.update(id, data);
        return resp.exito200(product);
    } catch (error) {
        return next(error)
    }
}
async function destroy(req, resp, next) {
    try {
        const { id } = req.params;
        const one = await userManager.destroy(id)
        if (!one) {
            return resp.error404();
        }
        else {
            return resp.exito200(one)
        }

    } catch (error) {
        return next(error)
    }
}
// FIN ENDPOINTS
export default usersRouter.getRouter();