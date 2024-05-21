import userManager from "../data/mongo/Managers/UserManager.mongo.js";

async function isValidUser (req,resp,next) {
    try {
        const {email} = req.body;
        const one = await userManager.readByEmail(email)
        if(!one){
            const error = new Error('Bad auth from login!')
            error.statusCode = 401
            throw error
        }
        else {
            return next();
        }
    } catch (error) {
        return next(error)
    }
}
export default isValidUser;