import { Router } from "express";
import productsViewRouter from "./products.views.js";
import usersViewRouter from "./users.views.js";
import cartsViewRouter from "./carts.view.js";


const indexViewRouter = Router();


// Endpoint para paginación



indexViewRouter.get("/", async (req, res, next) => {
    try {
        const page = 1
        const limit = 10
        const response = await fetch(`http://localhost:8080/api/products/paginate?limit=${limit}&page=${page}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const fetchedDocs = await response.json();
        console.log(fetchedDocs.info)
        return res.render("index", { products: fetchedDocs.response, pagination: fetchedDocs.info.totalPage, limit: fetchedDocs.info.limit, nextPage: fetchedDocs.info.nextPage, prevPage: fetchedDocs.info.prevPage, url: 'products/' });
    } catch (error) {
        return next(error);
    }
}
)
indexViewRouter.use("/carts", cartsViewRouter)

indexViewRouter.use("/products", productsViewRouter);

indexViewRouter.use("/users", usersViewRouter);

export default indexViewRouter;