import { createService, destroyService, paginateService, readOneService, readServiceFilter, updateService, readService } from "../services/products.service.js";

class ProductController {
    
async  read(req, resp, next) {
    try {
        const { category } = req.query;
        let allproducts;

        if (category) {
            allproducts = await readServiceFilter({category})
        } else {
            // Si no se proporciona ninguna categoría, obtener todos los productos
            allproducts = await readService();
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
async  readOne(req, resp, next) {
    try {
        const { id } = req.params
        const one = await readOneService(id);
        if (one) {
            return resp.exito200(one);
        } else {
            return resp.error404()
        }
    } catch (error) {
        next(error);
    }
}

async  paginate(req, res, next) {
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

        const all = await paginateService({filter, opts})
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
async  create(req, resp, next) {
    try {
        const data = req.body; //Guardo en una variable el objeto body : Datos q me envia el usuario.
        let product = await createService(data);
        return resp.exito201('Product created, id:' + product.id)
    } catch (error) {
        return next(error)
    }
};
// actualizar producto
async  update(req, resp, next) {
    try {
        const { id } = req.params;
        const data = req.body;
        const product = await updateService(id,data)
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
async  destroy(req, resp, next) {
    try {
        const { id } = req.params;
        const one = await destroyService(id);
        if (!one) {
            return resp.error404()
        } else {
            return resp.exito200(one)
        }
    } catch (error) {
        return next(error)
    }
}
}

const productsController = new ProductController();

const { read, readOne,paginate,create,update,destroy} = productsController
export { read, readOne,paginate,create,update,destroy}