import fs from "fs"
import crypto from "crypto"

class CartManager {
    constructor() {
        this.path = "./files/carts.json"
        this.init()
    }
    init() {
        const exist = fs.existsSync(this.path);
        if (!exist) {
            const stringData = JSON.stringify([], null, 2);
            fs.writeFileSync(this.path, stringData); // writeFileSync para crear un archivo.
            console.log("Archivo creado y almacenado en la ruta.")
        } else {
            console.log("El archivo ya existe.");
        }
    }
    async create(data) {
        try {
            const newcart = {
                id: crypto.randomBytes(12).toString(`hex`),
                user_id: data.user_id,
                product_id: data.product_id,
                quantity: data.quantity,
                state: data.state,
            }
            let carts = await fs.promises.readFile(this.path, "utf-8");
            carts = JSON.parse(carts)
            carts.push(newcart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
            console.log(`Producto creado con exito`);
            return newcart;
        } catch (error) {
            console.log(error);
        }
    }
    async read() {
        try {
            let carts = await fs.promises.readFile(this.path, "utf-8");
            carts = JSON.parse(carts);
            if (carts.length === 0) {
                console.log("No hay productos en el carrito");
                return null;
            } else {
                console.log(carts);
                return carts;
            }
        } catch (error) {
            console.log(error);
        }
    }
    async readOne(id) {
        try {
            let list = await fs.promises.readFile(this.path, "utf-8"); // traigo el archivo.
            list = JSON.parse(list) // lo parseamos.
            let item = list.find(each => (each.id === id));// busco por  el id que me pasan.
            if (!item) {
                console.log("no se encontro el producto");
                return false;
                
            } else {
                console.log(item);
                return item;
            }
        } catch (error) {
            console.log(error);
        }
    }
    async update(id, data) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);                     
            let one = all.find((each) => each.id === id);
            if (one) {
                for (let prop in data) {
                    if (data.hasOwnProperty(prop)) {
                        one[prop] = data[prop];
                    }
                }
                const updatedData = JSON.stringify(all, null, 2);
                await fs.promises.writeFile(this.path, updatedData);
                return one;
            } else {
                const error = new Error("Not Found")
                error.statusCode = 404;
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }
    
    async destroy(id) {
        try {
            let carrito = await fs.promises.readFile(this.path, "utf-8");
            //Esperamos la lectura del archivo y lo guardamos en variable
            carrito = JSON.parse(carrito);
            //parseamos
            let cart = carrito.find((each) => each.id === id);
            //buscamos el usuario
            if (!cart) {
                throw new Error("No se encontro el carrito para ser eliminado");
                // si no existe el usuario largamos error
            } else {
                let filtrado = carrito.filter((each) => each.id !== id);
                //filtramos para sacar del array 
                filtrado = JSON.stringify(filtrado, null, 2);
                //singify para 
                await fs.promises.writeFile(this.path, filtrado);
                //sobre escribimos  el archivo con los datos filtrados
                console.log({ eliminado: cart.id }); // mostramos en consola  el id borrado
                return cart;
            }
        } catch (error) {
            throw error
        }
    }
    
}
const cartsManager = new CartManager();
export default cartsManager;

/* TEST FUNCIONAL CARTS 
PARA SU FUNCIONAMIENTO UTILIZAR this.path = "./files/carts.json"


async function test() {
    try {
        const carts = new CartManager();
        const cart1 = await carts.create({ user_id: "22", product_id: "123", quantity: "2", state: "reserved" })
        const cart2 = await carts.create({ user_id: "Santiago", product_id: "santiagoID", quantity: "1", state: "paid" })

        const idCart1 = cart1.id 
        const idCart2 = cart2.id;
        //TEST READ
        console.log("Los productos nuevos son:");
        await carts.read();
        //TEST READONE
        console.log("Function readOne detecto:");
        await carts.readOne(idCart1);
        // TEST UPDATE.
        const updateQuantity = await carts.update(idCart1, { user_id: "3", quantity: '5' })
        console.log("Se actualizo la cantidad y el user_id en", updateQuantity);

        //TEST DELETE.
        await carts.destroy(idCart2);

    } catch (error) {
        console.log(error);
    }


}
test();
*/