
import { createService, readOneService, updateService, paginateService, readService, destroyService } from "../services/users.service.js";
class UsersController {
    async readOne(req, resp, next) {
        try {
            const { id } = req.params
            const one = await readOneService(id)
            if (one) {
                return resp.exito200(one)
            } else {
                return resp.error404();
            }
        } catch (error) {
            return next(error)
        }
    }
    async paginate(req, resp, next) {
        try {
            const filter = {}; // Puedes definir aquí tus filtros de ser necesario
            const opts = {};
            const all = await paginateService({ filter, opts })
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
    async read(req, resp, next) {
        try {
            //const { role } = req.query
            const all = await readService();
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
    async create(req, resp, next) {
        try {
            const data = req.body; //Guardo en una variable el objeto body : Datos q me envia el usuario.
            let one = await createService(data)
            return resp.exito201('User created, id:' + one.id)
        } catch (error) {
            return next(error)
        }
    };
    async update(req, resp, next) {
        try {
            const { id } = req.params;
            const data = req.body;
            const product = await updateService(id, data)
            return resp.exito200(product);
        } catch (error) {
            return next(error)
        }
    }
    async destroy(req, resp, next) {
        try {
            const { id } = req.params;
            const one = await destroyService(id)
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
}

const usersController = new UsersController();

const { create, read, readOne, update, destroy, paginate } = usersController;

export { create, read, readOne, update, destroy, paginate }