import passport from "passport";
//es una funcion que depende de la estrategia a implementar y devuelve
//error si ocurre
//datos del user si existen.
//informacion en caso de que no suceda lo anterior.
//es una funcion que devuelve un middleware.

function passportCb(strategy) {
    return (req, resp, next) => {
        passport.authenticate(strategy, (error, user, info) => {
            try {
                if (error) {
                    return next(error)
                }
                if (user) {
                    req.user = user
                    return next()
                }
                return resp.json({
                    statusCode: info.statusCode || 401,
                    message: info.message ? info.message : info.toString
                })
            } catch (error) {

            }
        })(req, resp, next);
    }
}

export default passportCb;