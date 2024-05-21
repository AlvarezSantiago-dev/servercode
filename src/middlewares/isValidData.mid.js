import userManager from "../data/mongo/Managers/UserManager.mongo.js";

async function isValidData(req,resp,next){
    try {
        const {email,password, name} = req.body
        if(!email ||!password ||!name){
            const error = new Error("Please enter name, email and password");
            error.statusCode = 400
            throw error;
        }
        else {
            next();
        }
    } catch (error) {
        return next(error)
    }

}
export default isValidData