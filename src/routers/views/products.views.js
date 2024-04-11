import { Router } from "express";
import productManager from "../../data/fs/ProductsManager.promise.js";
const productsViewRouter =  Router()


    
productsViewRouter.get("/", async (req, resp, next) => {
    try {
        const {category} = req.query;
        const products = await productManager.read(category);
        resp.render("products",{title: 'Products', products});
    } catch (error) {
        next(error);
    }
});

productsViewRouter.get("/real", async (req,resp,next) => {
    try {
        const products = await productManager.read();
        resp.render("real", {products})
    } catch (error) {
        next(error)
    }
});
productsViewRouter.get("/:id", async  (req, resp, next ) => {
    try {
        const {id}  = req.params;
        const product = await  productManager.readOne(id);
        resp.render('details', product);
    } catch (error) {
        next(error);
    }
});




export default productsViewRouter;