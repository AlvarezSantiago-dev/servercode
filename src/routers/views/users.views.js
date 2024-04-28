import { Router } from "express";
import userManager from "../../data/mongo/Managers/UserManager.mongo.js";

//import userManager from "../../data/fs/UsersManager.promises.js";
const usersViewRouter = Router();



usersViewRouter.get("/register", async (req,resp,next) => {
    try {
        let users = await userManager.read();
        users = JSON.parse(JSON.stringify(users)); //deep copy
        resp.render("register",{users});

    } catch (error) {
        next(error)
    }
});

usersViewRouter.get("/:id", async (req,resp, next) => {
    const {id} = req.params;
    const user = await userManager.readOne(id)
    try {
        resp.render("users", user);
    } catch (error) {
        next(error)
    }
})
export default usersViewRouter;