import { Router } from "express";
import cartsManager from "../../data/mongo/managers/CartManager.mongo.js";

const cartsViewRouter = Router();

cartsViewRouter.get("/", async (_req, res, next) => {
    try {
        let user_id = '662abe20e8e9eb8629378f73'
        const carts = await cartsManager.readCart(user_id);
        return res.render("cart", { cart: carts });
    } catch (error) {
        return next(error);
    }
});
cartsViewRouter.post("/", async (req, res, next) => {
    try {
        const { product } = req.body
        let user_id = '662abe20e8e9eb8629378f73'
        const result = await fetch("http:/localhost:8080/api/carts/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ product_id: product })
        })
        const carts = await cartsManager.readCart(user_id);
        return res.render("cart", { cart: carts });
    } catch (error) {
        return next(error);
    }
});

export default cartsViewRouter;