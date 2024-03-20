
const crypto = require("crypto");

class ProductManager {
    static #productos = [];
    create(data) {
        const producto = {
            id: crypto.randomBytes(12).toString("hex"),
            tittle: data.tittle,
            photo: data.photo,
            category: data.category,
            price: data.price,
            stock: data.stock
        }
        ProductManager.#productos.push(producto);
        console.log("Producto creado con exito! 😊");
        return producto;

    }
    read() {
        try {
            if (ProductManager.#productos.length === 0) {
                throw new Error('No hay productos en el catalogo');
            }
            else {
                return ProductManager.#productos;
            }
        } catch (error) {
            console.log(error);
        }
    }
    readOne(id) {
        try {
            let busquedaproducto = ProductManager.#productos.find((item) => item.id === id);
            if (!busquedaproducto) {
                throw new Error(`El producto con la ID "${id}" no existe`);
            }
            else {
                return busquedaproducto;
            }
        } catch (error) {
            console.log(error);
        }

    }
    destroy(id) {
        try {
            let busqueda = ProductManager.#productos.find(e => e.id === id);
            if(!busqueda){
                throw new Error (`Producto no encontrado`)
            } else {
                let filtrado  = ProductManager.#productos.filter((item)=> item.id !== id );
                ProductManager.#productos = filtrado;
                console.log(`Se ha eliminado correctamente el producto con el id: ${busqueda.id}`);
                return busqueda;
            }

        } catch (error) {
        }
    }
}



function test() {
    try {
        const productos = new ProductManager();
        //Creamos un const de producto para alamacenar su valor.
        const producto1 = productos.create({
            tittle: `Remera overzize`,
            photo: `url.jpg`,
            category: `zapatos`,
            price: 220,
            stock: 1,
        });
        const producto2 = productos.create({
            tittle: `Zapatilla nike`,
            photo: `url.jpg`,
            category: `zapatos`,
            price: 400,
            stock: 2,
        })
        //Guardamos los valores en la variable para poder mostrarlos.
        const idProducto1 = producto1.id;
        const idProducto2 = producto2.id;

        console.log(" Paso1 :Todos los productos son: ");
        console.log(productos.read());
        // Llamamos a todos
        console.log("Paso2: Llamamos en particular al primer producto creado en la posicion 0 del array:", productos.readOne(idProducto1));
        // Llamamos solo a uno.
        console.log("Paso3: Destuimos el producto con el id:");
        // Destuimos por id
        console.log(productos.destroy(idProducto2));
        console.log(" Paso4: Creamos un nuevo producto.");
        const ultimo = productos.create({
            tittle: `Camisa a cuadros`,
            photo: `url.jpg`,
            category: `ropa`,
            price: `$100`,
            stock: 1,
        });
        console.log(productos.readOne(ultimo.id));
        
        console.log(productos.destroy(ultimo.id));
    } catch (error) {
        console.log(error);
    }
}
test();