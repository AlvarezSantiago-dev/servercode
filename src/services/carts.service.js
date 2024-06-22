
import cartsManger from "../data/mongo/managers/CartManager.mongo.js";
import Service from "./service.js";

const cartService = new Service(cartsManger)
export const {createService,readService,readOneService,updateService,destroyService,readCartService, destroyAllService, agregateService} = cartService