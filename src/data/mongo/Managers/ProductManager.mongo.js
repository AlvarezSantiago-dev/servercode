import Manager from "../Manager.mongo.js";
import ProductModel from "../models/product.model.js";

const productManager = new Manager(ProductModel)
export default productManager;