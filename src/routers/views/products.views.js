
import productManager from "../../data/mongo/Managers/ProductManager.mongo.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import CustomRouter from "../CustomRouter.js";

//import productManager from "../../data/fs/ProductsManager.promise.js";
class ProductsViewRouter extends CustomRouter {
    init() {

        this.read("/paginate", ["PUBLIC"], async (req, res, next) => {
            try {
                const { page, limit } = req.query;
                const response = await fetch(`http://localhost:8080/api/products/paginate?limit=${limit}&page=${page}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const fetchedDocs = await response.json();
                //console.log(fetchedDocs.info)
                return res.render("index", {
                    products: fetchedDocs.response,
                    pagination: fetchedDocs.info.totalPage,
                    limit: fetchedDocs.info.limit,
                    nextPage: fetchedDocs.info.nextPage,
                    prevPage: fetchedDocs.info.prevPage,
                    url: "/products",
                });

            } catch (error) {
                return next(error);
            }
        });


        this.read("/", ["PUBLIC"], async (req, res, next) => {
            try {
                const products = await productManager.read();
                if (req.user.user_id) {
                    return res.render("products", { products, user_id: req.user.user_id });
                } else {
                    return res.render("products", { products, user_id: req.user.user_id });
                }
            } catch (error) {
                return next(error);
            }
        });


        this.read("/:id", ["USER","ADMIN"], passportCb("jwt"), async (req, res, next) => {
            try {
                const { id } = req.params;
                const one = await productManager.readOne(id);
                //return res.render("productDetail", { product: one });
                if (req.user.online) {
                    return res.render("details", {
                        product: one,
                        user_id: req.user.user_id,
                        
                    });
                } else {
                    return alert("Debes iniciar sesion.")
                }
            } catch (error) {
                return next(error);
            }
        });
    }
}
const productsViewRouter = new ProductsViewRouter();



export default productsViewRouter.getRouter();