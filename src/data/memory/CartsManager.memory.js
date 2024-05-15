import cryto from "crypto"
class CartsManager {
    static  #carts = [];
    create(data){
        const newCart = {
            user_id: cryto.randomBytes(12).toString(`hex`),
            product_id: cryto.randomBytes(12).toString('hex'),
            quantity: data.quantity || 1,
            state: data.state
        }
        CartsManager.#carts.push(newCart);
        return newCart;
    }
    read(){
        try {
            if(CartsManager.#carts.length > 0){
                console.log( CartsManager.#carts);
                return CartsManager.#carts;
                
            }else {
                throw 'No hay carritos en la base de datos'
            }
        } catch (error) {
            console.log(error);
        }
    }
    readOne(user_id){
        try {
            let one = CartsManager.#carts.find( (item) =>  item.user_id === user_id );

        if(!one){
            throw `El elemento con el id ${user_id} no existe`
        }else {
            console.log(one);
            return one;
        }
        } catch (error) {
            console.log(error);
        }
    }
    update(user_id, data){
        try {
            let busqueda = CartsManager.#carts.find((item) => item.user_id === user_id);
            if(!busqueda){
                throw `No se encontró un carrito asociado al usuario con id "${user_id}"`;
            }else {
                for(let key in data){
                    busqueda[key] = data[key];
                    return  busqueda;
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    destroy(user_id){
        let busqueda = CartsManager.#carts.find((item) => item.user_id === user_id);
        if(!busqueda){
            throw `No se encontró un carrito asociado a este usuario.`;
        } else {
            const filtrado =  CartsManager.#carts.filter((item)=> item.user_id !== user_id );
            CartsManager.#carts = filtrado;
            console.log("Se ha eliminado correctamente el carrito con el ID ", busqueda.user_id);
            console.log(busqueda);
            return busqueda;
        }
    }
}
//Funcion test cartsmanager
async function test(){
    const carts = new  CartsManager();
    //crear un carrito y agregarlo a la lista
    const cart1 = carts.create({quantity:1, state:"pied" })
    const cart2 = carts.create({quantity:2, state:"reserved" })
    const cart3 = carts.create({quantity:3, state:"delivered" })

    const cartId = cart1.user_id;
    const cartId2 = cart2.user_id;
    const cartId3 = cart3.user_id;

    console.log("Carritos");
    carts.read()

    console.log("Finish. CARRITOS");
    console.log("ReadOne con user_id");
    
    carts.readOne(cartId);

    
    console.log("Actualizacion");
    const updated = carts.update(cartId2, {state : "delivered"});
    console.log(`Se actualizó el estado del producto en el carrito:`,updated );
    console.log("Eliminacion...");
    carts.destroy(cartId3);
}
test();