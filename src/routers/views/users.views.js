import { Router } from "express";
import userManager from "../../data/mongo/Managers/UserManager.mongo.js";

//import userManager from "../../data/fs/UsersManager.promises.js";
const usersViewRouter = Router();

usersViewRouter.get("/", async (req,resp,next) => {
    try {
        let users = await userManager.read();
        users = JSON.parse(JSON.stringify(users)); 
        resp.render("users",{users});

    } catch (error) {
        next(error)
    }
});

usersViewRouter.get("/register", async (req,resp,next) => {
    try {
        let users = await userManager.read();
        users = JSON.parse(JSON.stringify(users)); 
        resp.render("register",{users});

    } catch (error) {
        next(error)
    }
});
usersViewRouter.get("/login", async (req,resp,next) => {
    try {
        let users = await userManager.read();
        users = JSON.parse(JSON.stringify(users)); 
        resp.render("login",{users});

    } catch (error) {
        next(error)
    }
});
usersViewRouter.get("/:id", async (req,resp, next) => {
    const {id} = req.params;
    const user = await userManager.readOne(id)
    try {
        resp.render("profile", user);
    } catch (error) {
        next(error)
    }
})
export default usersViewRouter;