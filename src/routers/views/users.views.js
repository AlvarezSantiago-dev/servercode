import { Router } from "express";
import userManager from "../../data/mongo/Managers/UserManager.mongo.js";

//import userManager from "../../data/fs/UsersManager.promises.js";
const usersViewRouter = Router();


usersViewRouter.get("/", async (req, res, next) => {
    try {
        if (req.session.user_id) {
            const one = await userManager.readOne(req.session.user_id);
            return res.render("profile", { user: one, user_id: req.session.user_id });
        } else {
            const users = await userManager.read();
            return res.render("users", { users });
        }
    } catch (error) {
        return next(error);
    }
});

usersViewRouter.get("/register", async (req, resp, next) => {
    try {
        let users = await userManager.read();
        users = JSON.parse(JSON.stringify(users));
        resp.render("register", { users });

    } catch (error) {
        next(error)
    }
});
usersViewRouter.get("/login", async (req, resp, next) => {
    try {
        let users = await userManager.read();
        users = JSON.parse(JSON.stringify(users));
        resp.render("login", { users });

    } catch (error) {
        next(error)
    }
});
usersViewRouter.get("/:id", async (req, res, next) => {
    try {
        const { uid } = req.params;
        const one = await userManager.readOne(uid);
        //return res.render("details", { user: one });
        if (req.session.user_id) {
            return res.render("profile", { user: one, user_id: req.session.user_id });
        } else {
            return res.render("profile", { user: one, user_id: req.session.user_id });
        }
    } catch (error) {
        return res.render("profile");
    }
});
export default usersViewRouter;