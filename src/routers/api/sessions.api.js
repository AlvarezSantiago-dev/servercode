;
import isAuth from "../../middlewares/isAuth.mid.js";
import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import CustomRouter from "../CustomRouter.js";

class SessionRouter extends CustomRouter {
    init() {
        this.create("/register",
            //isValidData, 
            //isValidEmail,
            //reateHashPassword,
            ["PUBLIC"],
            passportCb("register"),
            async (req, resp, next) => {
                try {
                    return resp.exito201("User registered successfully")
                } catch (error) {
                    return next(error)
                }
            })
        this.create("/login",
            //isValidUser, 
            //isValidPassword, 
            ["PUBLIC"],
            passportCb("login"),
            async (req, resp, next) => {
                try {
                    return resp.cookie("token", req.user.token, { signedCookie: true }).json({
                        statusCode: 200,
                        message: "Logged in!",
                        //token: req.user.token

                    })
                } catch (error) {
                    return next(error)
                }
            })

        this.read("/",
            ["USER", "ADMIN"],
            passportCb("jwt"),
            async (req, resp, next) => {
                // verificar un token.
                try {
                    if (req.user.online) {
                        return resp.json({
                            statusCode: 200,
                            message: "Is Online",
                            user_id: req.user.user_id,
                            email: req.user.email,
                            role: req.user.role,
                            photo: req.user.photo
                        });
                    } else {
                        return resp.error400("Bad bad");
                    }
                } catch (error) {
                    return next(error);
                }
            });
        /*
                this.create("/", async (req, res, next) => {
                    try {
                        if (req.session.online) {
                            // El usuario ha iniciado sesión y req.session.online está definido
                            return res.json({
                                statusCode: 200,
                                message: "Is Online!",
                                user_id: req.session.user_id,
                                photo: req.session.photo,
                                role: req.session.role,
                                email: req.session.email
                            });
                        } else {
                            // El usuario no ha iniciado sesión o req.session.online no está definido
                            return res.json({
                                statusCode: 401,
                                message: "Not Online!",
                            });
                        }
                    } catch (error) {
                        return next(error);
                    }
                });
        */
        this.create("/signout",
            ["USER", "ADMIN"],
            async (req, resp, next) => {
                try {
                    if (req.cookies) {
                        return resp.clearCookie("token").exito200("Signed out!")
                    }
                    return resp.error401message("Invalid credentials from signout")
                } catch (error) {
                    return next(error);
                }
            })

        this.read("/google", 
            ["PUBLIC"],
            passport.authenticate("google", { scope: ["email", "profile"] }))

        this.read("/google/callback",
            ["PUBLIC"],
            (req, resp, next) => {
                try {
                    return resp.exito200("Logged with google")
                } catch (error) {
                    return next(error)
                }
            })
    }
}

const sessionRouter = new SessionRouter()

export default sessionRouter.getRouter()

