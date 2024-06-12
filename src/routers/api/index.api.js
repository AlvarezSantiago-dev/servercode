/* FORMA VIEJA
import { Router } from "express";
import productRouter from "./product.api.js";
import usersRouter from "./users.api.js";
import cartsRouter from "./cart.api.js";
import sessionRouter from "./sessions.api.js";


const apiRouter = Router();

apiRouter.use("/products", productRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/carts", cartsRouter);
apiRouter.use("/sessions", sessionRouter)

export default apiRouter;
*/

import CustomRouter from "../CustomRouter.js";
import cartsRouter from "./cart.api.js";
import productRouter from "./product.api.js"

import sessionRouter from "./sessions.api.js";
import usersRouter from "./users.api.js";


class ApiRouter extends CustomRouter {
    init(){
        this.use("/products", productRouter)
        this.use("/users",usersRouter )
        this.use("/carts", cartsRouter)
        this.use("/sessions", sessionRouter)
    }
}
const apiRouter = new ApiRouter()
export default apiRouter.getRouter()