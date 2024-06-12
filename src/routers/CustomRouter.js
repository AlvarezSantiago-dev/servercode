import { Router } from "express"
import { verifyToken } from "../utils/token.util.js"
import userManager from "../data/mongo/Managers/UserManager.mongo.js"



class CustomRouter {
    //Para construir y configurar cada instancia del enrutador
    constructor() {
        this.router = Router()
        this.init()
    }
    //Para obtener todas las rutas del enrutador
    getRouter() {
        return this.router
    }
    //Para inicializar las clases/props heredadas (sub-routers)
    init() {

    }
    //Para manejar las callbacks (de middlewares y la final)
    applyCbs(callbacks) {
        return callbacks.map(callback => async (...params) => {
            try {
                await callback.apply(this, params)
            } catch (error) {
                return params[2](error);
            }
        })
    }
    response = (req, res, next) => {
        res.exito200message = (response, message) => res.json({ statusCode: 200, response, message })
        res.exito200 = (response) => res.json({ statusCode: 200, response })
        res.exito201 = (message) => res.json({ statusCode: 201, message })
        res.exito201message = (response,message) => res.json({ statusCode: 201,response, message })
        res.paginate = (response, info) => res.json({ statusCode: 200, response, info })
        res.error400 = (message) => res.json({ statusCode: 400, message })
        res.error401 = () => { res.json({ statusCode: 401, message: "Bad auth from policies" }) }
        res.error401message = (message) => res.json({statusCode: 401, message});
        res.error403 = () => {res.json({statusCode: 403, message: "Forbidden"})}
        res.error404 = () => { res.json({ statusCode: 404, message: "Not fund" }) }

        return next();
    }
    policies = (policies) => async (req, res, next) => {
        if (policies.includes("PUBLIC")) 
            return next();
        else {
            let token = req.cookies["token"];
            if (!token) 
                return res.error401();
            else {
                try {
                    token = verifyToken(token, process.env.SECRET_JWT);
                    const { role, email } = token
                    if ((policies.includes("USER") && role === 0) || (policies.includes("ADMIN") && role === 1)) {
                        const user = await userManager.readByEmail(email);
                        //proteger contra del usuario.
                        req.user = user
                        
                        return next();
                    } else 
                    return res.error403();
                } catch (error) {
                    return res.error400(error);
                }
            }
        }
    };

    //create("/products", isTitle,isValidAdmin, create)
    create(path,arrayOfPolicies, ...callbacks) {
        this.router.post(path, this.response,this.policies(arrayOfPolicies), this.applyCbs(callbacks))
    }
    read(path,arrayOfPolicies, ...callbacks) {
        this.router.get(path, this.response,this.policies(arrayOfPolicies), this.applyCbs(callbacks))
    }
    update(path,arrayOfPolicies, ...callbacks) {
        this.router.put(path, this.response,this.policies(arrayOfPolicies), this.applyCbs(callbacks))
    }
    destroy(path,arrayOfPolicies, ...callbacks) {
        this.router.delete(path, this.response,this.policies(arrayOfPolicies), this.applyCbs(callbacks))
    }
    use(path, ...callbacks) {
        this.router.use(path, this.response, this.applyCbs(callbacks))
    }
}

export default CustomRouter;
