import userManager from "../data/mongo/Managers/UserManager.mongo.js";

async function isValidPassword(req,resp, next) {
    try {
        const {email, password} = req.body
        const user = await userManager.readByEmail(email)
        if(user.password === password){
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