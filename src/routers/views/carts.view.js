
import cartsManager from "../../data/mongo/managers/CartManager.mongo.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import CustomRouter from "../CustomRouter.js";


class CartsViewRouter extends CustomRouter {
    init(){
        this.read("/", ["USER","ADMIN"], passportCb("jwt"),
            async (req, res, next) => {
            try {
                let cart = await cartsManager.readCart(req.user.user_id);
                if (req.user.online) {
                    return res.render("cart", { cart: cart, user_id: req.user.user_id });
                } 
            } catch (error) {
                return next(error);
            }
        });
        
    }
}
const cartsViewRouter = new CartsViewRouter();




/*
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
            statusCode: 200,
            message
        })
    } catch (error) {
        return next(error);
    }
});
*/
export default cartsViewRouter.getRouter();