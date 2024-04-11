import { Router } from "express";
import productsViewRouter from "./products.views.js";
import usersViewRouter from "./users.views.js";

const indexViewRouter  = Router();

indexViewRouter.use("/products", productsViewRouter);

indexViewRouter.use("/users", usersViewRouter);

indexViewRouter.get("/", (req, resp, next) => {
    try {
        resp.render("index",{title: "HOME"} )
    } catch (error) {
        return next(error);
    }
})

export default indexViewRouter;