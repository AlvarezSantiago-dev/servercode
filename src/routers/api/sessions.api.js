import { Router, response } from "express";
import userManager from "../../data/mongo/Managers/UserManager.mongo.js";
import isValidEmail from "../../middlewares/isValidEmail.mid.js";
import isValidData from "../../middlewares/isValidData.mid.js";
import isValidUser from "../../middlewares/isValidUser.mid.js";
import isValidPassword from "../../middlewares/isValidPassword.mid.js";
const sessionRouter = Router();

sessionRouter.post("/register", isValidData, isValidEmail, async (req, resp, next) => {
    try {
        const data = req.body;
        await userManager.create(data);
        return resp.json({
            statusCode: 201,
            message: "User registered successfully",
        })
    } catch (error) {
        return next(error)
    }
})
sessionRouter.post("/login", isValidUser, isValidPassword, async (req, resp, next) => {
    try {
        const { email } = req.body;
        const users = await userManager.readByEmail(email);
        req.session.email = email;
        req.session.role = users.role;
        req.session.photo = users.photo;
        return resp.json({
            statusCode: 200,
            message: "Logged in!",

        })
    } catch (error) {
        return next(error)
    }
})

sessionRouter.post("/signout", async (req, resp, next) => {
    try {
        if (req.session.email) {
            req.session.destroy();
            return resp.json({
                statusCode: 200,
                message: "Logged out!",
            })
        }
        else{
            const error = new Error("Invalid action")
            error.statusCode = 401
            throw error
        }
    } catch (error) {
        return next(error)
    }
})

export default sessionRouter