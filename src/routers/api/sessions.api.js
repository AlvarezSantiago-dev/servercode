
import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import CustomRouter from "../CustomRouter.js";
import { register,login,profile,signout,google } from "../../controllers/sessions.controller.js";
class SessionRouter extends CustomRouter {
    init() {
        this.create("/register",["PUBLIC"],passportCb("register"), register);
        this.create("/login",["PUBLIC"],passportCb("login"),login)
        this.read("/",["USER", "ADMIN"],passportCb("jwt"),profile)
        this.create("/signout",["USER", "ADMIN"], signout)
        this.read("/google",["PUBLIC"], passport.authenticate("google", { scope: ["email", "profile"] }),passportCb("google"));
        this.read("/google/callback", ["PUBLIC"], passport.authenticate("google", { session: false }), google);
    }
}

const sessionRouter = new SessionRouter()

export default sessionRouter.getRouter()

