import { Router } from "express";
import userManager from "../../data/mongo/Managers/UserManager.mongo.js";
import CustomRouter from "../CustomRouter.js";
import passportCb from "../../middlewares/passportCb.mid.js";

//import userManager from "../../data/fs/UsersManager.promises.js";
class UsersViewRouter extends CustomRouter{
    init(){
        this.read("/",["ADMIN","USER"],passportCb("jwt"), async (req, res, next) => {
            try {
                if (req.user.online) {
                    const one = await userManager.readOne(req.user.user_id);
                    return res.render("profile", { user: one, user_id: req.user.user_id });
                } else {
                    const users = await userManager.read();
                    return res.render("users", { users });
                }
            } catch (error) {
                return next(error);
            }
        });
        
        this.read("/register", ["PUBLIC"], async (req, resp, next) => {
            try {
                let users = await userManager.read();
                users = JSON.parse(JSON.stringify(users));
                resp.render("register", { users });
        
            } catch (error) {
                next(error)
            }
        });
        this.read("/login", ["PUBLIC"], async (req, resp, next) => {
            try {
                let users = await userManager.read(); 
                users = JSON.parse(JSON.stringify(users));
                resp.render("login", { users });
        
            } catch (error) {
                next(error)
            }
        });
    }
}

const usersViewRouter = new UsersViewRouter();

export default usersViewRouter.getRouter();