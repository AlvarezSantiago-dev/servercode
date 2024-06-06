import userManager from "../data/mongo/Managers/UserManager.mongo.js";
import { verifyHash } from "../utils/hash.utils.js";
async function isValidPassword(req,resp, next) {
    try {
        const {email, password} = req.body
        const user = await userManager.readByEmail(email)
        const verify = verifyHash(password, user.password)
        if(verify){
            return next()
        }
        else {
            const error = new Error("Invalid credentials");
            error.statusCode = 401
            throw error
        }
    } catch (error) {
        return next(error)
    }
}
export default isValidPassword;