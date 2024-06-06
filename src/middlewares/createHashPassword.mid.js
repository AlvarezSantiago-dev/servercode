import { createHash } from "../utils/hash.utils.js";

function createHashPassword(req,resp,next)  {
    try {
        const {password} = req.body
        const hashPassword = createHash(password)
        req.body.password = hashPassword
        return next();

    } catch (error) {
        return next(error)
    }
}
export default createHashPassword;