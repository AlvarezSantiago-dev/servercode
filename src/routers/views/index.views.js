
import productsViewRouter from "./products.views.js";
import usersViewRouter from "./users.views.js";
import cartsViewRouter from "./carts.view.js";
import CustomRouter from "../CustomRouter.js";

// Endpoint para paginación

class IndexViewRouter extends CustomRouter {
    init() {

        this.read("/",["PUBLIC"], async (req, res, next) => {
            try {
                const page = 1
                const limit = 10

                const response = await fetch(`http://localhost:8080/api/products/paginate?page=${page}&limit=${limit}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const fetchedDocs = await response.json();

                if (response.ok) {
                    return res.render("index", {
                        products: fetchedDocs.response,
                        
                        limit: fetchedDocs.info.limit,
                        nextPage: fetchedDocs.info.nextPage,
                        prevPage: fetchedDocs.info.prevPage,
                    });
                }
                else {
                    return res.render("index", {
                        products: fetchedDocs.response,
                        pagination: fetchedDocs.info.totalPage,
                        limit: fetchedDocs.info.limit, nextPage: fetchedDocs.info.nextPage,
                        prevPage: fetchedDocs.info.prevPage,
                        url: 'products/'
                    });
                }

            } catch (error) {
                return next(error);
            }
        }
        )

        this.use("/carts", cartsViewRouter)

        this.use("/products", productsViewRouter);

        this.use("/users", usersViewRouter);

    }
}
const indexViewRouter = new IndexViewRouter()

export default indexViewRouter.getRouter();