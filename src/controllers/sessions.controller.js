class SessionsController {
    
async register (req, resp, next) {
    try {
        return resp.exito201("User registered successfully")
    } catch (error) {
        return next(error)
    }
}
async login (req, resp, next) {
    try {
        return resp.cookie("token", req.user.token, { signedCookie: true }).json({
            statusCode: 200,
            message: "Logged in!",
            //token: req.user.token

        })
    } catch (error) {
        return next(error)
    }
}
async profile (req, resp, next)  {
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
};
async signout (req, resp, next) {
    try {
        if (req.cookies) {
            return resp.clearCookie("token").exito200("Signed out!")
        }
        return resp.error401message("Invalid credentials from signout")
    } catch (error) {
        return next(error);
    }
}
google(req, resp, next)  {
    try {
        return resp.exito200("Logged with google")
    } catch (error) {
        return next(error)
    }
}
}
const sessionsController = new SessionsController();
const {register,login,profile,signout,google} = sessionsController
export {register,login,profile,signout,google};