
import CustomRouter from "../CustomRouter.js";
import productManager from "../../data/mongo/Managers/ProductManager.mongo.js";
import passportCb from "../../middlewares/passportCb.mid.js";


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
            return resp.exito200(allproducts)
        } else {
            return resp.error404()
        }
    } catch (error) {
        next(error);
    }
}
async function readOne(req, resp, next) {
    try {
        const { id } = req.params
        const one = await productManager.readOne(id);
        if (one) {
            return resp.exito200(one);
        } else {
            return resp.error404()
        }
    } catch (error) {
        next(error);
    }
}

async function paginate(req, res, next) {
    try {
        const filter = {};
        const opts = {};
        if (req.query.limit) {
            opts.limit = req.query.limit;
        }
        if (req.query.page) {
            opts.page = req.query.page;
        }
        if (req.query._id) {
            filter._id = req.query._id;
        }
        if (req.query.category) {
            filter.category = req.query.category;
        }

        const all = await productManager.paginate({ filter, opts });
        const info = {
            totalDocs: all.totalDocs,
            page: all.page,
            totalPages: all.totalPages,
            limit: all.limit,
            prevPage: all.prevPage,
            nextPage: all.nextPage
        };

        return res.paginate(all.docs, info);
    } catch (error) {
        next(error);
    }
}

// crear producto
async function create(req, resp, next) {
    try {
        const data = req.body; //Guardo en una variable el objeto body : Datos q me envia el usuario.
        let product = await productManager.create(data);
        return resp.exito201('Product created, id:' + product.id)
    } catch (error) {
        return next(error)
    }
};
// actualizar producto
async function update(req, resp, next) {
    try {
        const { id } = req.params;
        const data = req.body;
        const product = await productManager.update(id, data);
        if (!product) {
            const error = new Error('El Producto no existe');
            throw error;
        } else {
            return resp.exito200message(product, "Se ha actualizado correctamente el producto.")
        }
    }
    catch (error) {
        return next(error)
    }
}
// elminar producto
async function destroy(req, resp, next) {
    try {
        const { id } = req.params;
        const one = await productManager.destroy(id)
        if (!one) {
            return resp.error404()
        } else {
            return resp.exito200(one)
        }
    } catch (error) {
        return next(error)
    }
}
// endpoints

export default productRouter.getRouter();
