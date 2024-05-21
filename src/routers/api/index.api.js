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