import { Router } from "express";
import cartsManager from "../../data/mongo/managers/CartManager.mongo.js";

const cartsViewRouter = Router();

cartsViewRouter.get("/", async (req, res, next) => {
    try {
        const { user_id } = req.session;
        const carts = await cartsManager.readCart(user_id);
        if (req.session.user_id) {
            return res.render("cart", { cart: carts, user_id: req.session.user_id });
        } else {
            return res.render("cart", { cart: carts, user_id: req.session.user_id });
        }
    } catch (error) {
        return next(error);
    }
});
cartsViewRouter.post("/", async (req, res, next) => {
    try {
        const { product } = req.body;
        const user_id = req.session.user_id;
        const result = await fetch("http:/localhost:8080/api/carts/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ product_id: product, user_id: user_id }),
        });
        const carts = await cartsManager.readCart(user_id);
        if (req.session.user_id) {
            return res.render("cart", { cart: carts, user_id: req.session.user_id });
        } else {
            return res.render("cart", { cart: carts, user_id: req.session.user_id });
        }
    } catch (error) {
        return next(error);
    }
});

cartsViewRouter.delete("/all", async (req, res, next) => {
    try {
        const user_id = req.session.user_id;
        const result = await fetch("http://localhost:8080/api/carts/all", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: user_id }),
        });
        return res.json({
            statusCode: 200
        })
    } catch (error) {
        return next(error);
    }
});
export default cartsViewRouter;