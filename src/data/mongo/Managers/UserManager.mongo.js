import Manager from "../Manager.mongo.js";
import UserModel from "../models/user.model.js";

const userManager = new Manager(UserModel)
export default userManager;