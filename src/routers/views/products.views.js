import { Router } from "express";
import productManager from "../../data/mongo/Managers/ProductManager.mongo.js";
//import productManager from "../../data/fs/ProductsManager.promise.js";
const productsViewRouter = Router()


productsViewRouter.get("/paginate", async (req, res, next) => {
    try {
        const { page, limit } = req.query;
        const response = await fetch(
            `http://localhost:8080/api/products/paginate?limit=${limit}&page=${page}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const fetchedDocs = await response.json();
        //console.log(fetchedDocs.info)
        if (req.session.user_id) {
            return res.render("index", {
                products: fetchedDocs.response,
                pagination: fetchedDocs.info.totalPage,
                limit: fetchedDocs.info.limit,
                nextPage: fetchedDocs.info.nextPage,
                prevPage: fetchedDocs.info.prevPage,
                url: "/products",
                user_id: req.session.user_id,
            });
        } else {
            return res.render("index", {

                user_id: req.session.user_id,
            });
        }
    } catch (error) {
        return next(error);
    }
});
productsViewRouter.get("/", async (req, res, next) => {
    try {
        const products = await productManager.read();
        if (req.session.user_id) {
            return res.render("products", { products, user_id: req.session.user_id });
        } else {
            return res.render("products", { products, user_id: req.session.user_id });
        }
    } catch (error) {
        return next(error);
    }
});

productsViewRouter.get("/real", async (req, resp, next) => {
    try {
        const products = await productManager.read();

        resp.render("real", { products })
    } catch (error) {
        next(error)
    }
});
productsViewRouter.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const one = await productManager.readOne(id);
        //return res.render("productDetail", { product: one });
        if (req.session.user_id) {
            return res.render("details", {
                product: one,
                user_id: req.session.user_id,
            });
        } else {
            return res.render("details", {
                product: one,
                user_id: req.session.user_id,
            });
        }
    } catch (error) {
        return next(error);
    }
});

export default productsViewRouter;