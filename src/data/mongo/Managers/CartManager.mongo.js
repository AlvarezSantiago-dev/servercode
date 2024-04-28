import Manager from "../Manager.mongo.js";
import CartModel from "../models/cart.model.js";

const cartsManger = new Manager(CartModel)
export default cartsManger;