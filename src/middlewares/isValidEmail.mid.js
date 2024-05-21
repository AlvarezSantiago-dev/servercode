import userManager from "../data/mongo/Managers/UserManager.mongo.js";

async function isValidEmail(req,resp,next){
try {
    const {email} = req.body;
    const one = await userManager.readByEmail(email);
    if(one){
        const error = new Error("Bad auth from register!");
        error.statusCode = 401
        throw error;
    }
    return next();
} catch (error) {
    return next(error)
}
}

export default isValidEmail