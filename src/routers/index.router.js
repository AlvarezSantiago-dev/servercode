/* 
forma vieja

import { Router } from "express";

import indexViewRouter from "./views/index.views.js";

const indexRouter = Router()
indexRouter.use("/", indexViewRouter);
indexRouter.use("/api", apiRouter )
export default indexRouter;

*/ 

import CustomRouter from "./CustomRouter.js";
import apiRouter from "./api/index.api.js";
import indexViewRouter from "./views/index.views.js";

class IndexRouter extends CustomRouter{
    init(){
        this.use("/api", apiRouter)
        this.use("/", indexViewRouter)
    }
}
const indexRouter = new IndexRouter()

export default indexRouter.getRouter();
