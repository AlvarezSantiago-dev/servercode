import { Router } from "express";
import productRouter from "./product.api.js";
import usersRouter from "./users.api.js";
import cartsRouter from "./cart.api.js";

const apiRouter = Router();

apiRouter.use("/products", productRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/carts", cartsRouter);
export default apiRouter;