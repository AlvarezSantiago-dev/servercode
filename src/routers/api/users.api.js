import { Router } from "express";
//import userManager from "../../data/fs/UsersManager.promises.js";
import userManager from "../../data/mongo/Managers/UserManager.mongo.js";
// ENRRUTADOR RECURSO USUARIOS
const usersRouter = Router();


//ENDPOINTS
// filtrado por role.
usersRouter.get("/", async (req, resp) => {
    try {
        const { role } = req.query
        const all = await userManager.read(role)
        if (all) {
            return resp.status(200).json({
                responese: all,
                success: true,

            })
        } else {
            const error = new Error("NOT FOUND");
            error.statusCode = 404
            throw error;
        }
    } catch (error) {
        console.log(error);
        resp.status(404).json({
            response: null,
            menssage: "No se encuentra el rol "
        })
    }
})

// trer un solo user.
usersRouter.get("/:id", async (req, resp) => {
    try {
        const { id } = req.params
        const one = await userManager.readOne(id);
        if (one) {
            return resp.status(200).json({
                response: one,
                success: true
            })
        } else {
            const error = new Error("NOT FOUND");
            error.statusCode = 404
            throw error;
        }
    } catch (error) {
        console.log(error);
        resp.status(404).json({
            response: null,
            menssage: "No se encuentra el usuario"
        })
    }
})

usersRouter.post("/", create); 
usersRouter.put("/:id", update);
usersRouter.delete("/:id", destroy);

async function create (req, resp, next) {
    try {
        const data = req.body; //Guardo en una variable el objeto body : Datos q me envia el usuario.
        let product = await userManager.create(data);
        return resp.json({
            statusCode: 201,
            menssage: 'Product created, id:' + product.id,
        })
    } catch (error) {
        return next(error)
    }
};
// actualizar usuario
async function update(req, resp, next ){
    try {
        const {id} = req.params;
        const data = req.body;
        const product = await userManager.update(id, data);
        return resp.json({
            statusCode: 200,
            response: product
        })
    } catch (error) {
        return next(error)
    }
}
// elminar usuario
async function destroy(req, resp, next)  {
    try {
        const {id} = req.params;
        const one = await userManager.destroy(id)
        if  (!one){
            return resp.json({
                statusCode: 404,
                response: "User not found",
            })
        }
        else {
            return resp.json({
                statusCode: 200,
                response: one
            })
        }
        
    } catch (error) {
        return next(error)
    }
}
// FIN ENDPOINTS
export default usersRouter;