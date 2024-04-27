import { Router } from "express";
import productManager from "../../data/mongo/Managers/ProductManager.mongo.js";
//import productManager from "../../data/fs/ProductsManager.promise.js";
const productsViewRouter =  Router()


    
productsViewRouter.get("/", async (req, resp, next) => {
    try {
        let products = await productManager.read();
        products =  JSON.parse(JSON.stringify(products));
        resp .render("products", {products});
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