
import productManager from "../data/mongo/managers/ProductManager.mongo.js";
import Service from "./service.js";

const productService = new Service(productManager);
export const {createService,readService,readOneService,paginateService,updateService,destroyService, readServiceFilter} = productService;