import { Router } from "express";
import apiRouter from "./api/index.api.js";
import indexViewRouter from "./views/index.views.js";

const indexRouter = Router()

indexRouter.use("/api", apiRouter )
indexRouter.use("/", indexViewRouter);

export default indexRouter;