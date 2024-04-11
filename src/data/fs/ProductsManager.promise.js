import fs from "fs"
import crypto from "crypto"

class ProductManager {
    constructor() {
        //definimos la ruta
        this.path = "./src/data/fs/files/products.json"
        this.init() //inicializamos/ ejecutamos
    }
    // con la clase inicializamos la funcion init 
    init() {
        const exist = fs.existsSync(this.path); //utilizamos la funcion exist Sync  para verificar si el archivo existe
        if (!exist) {
            // Si no existe el archivo
            const stringData = JSON.stringify([], null, 2);
            // Define el contenido y crea el archivo
            fs.writeFileSync(this.path, stringData);
            console.log("Creamos el archivo y lo almacenamos en la ruta");
        } else {
            console.log(`Archivo ya existe`);
        }
    }
    //creamos una funcion para agregar usuarios.
    async create(data) {
        // utilizamos metodo sync  para que se ejecute de manera sincronica 
        try {
            if (!data.tittle || !data.category || !data.price || !data.stock) {
                throw new Error(`Todos los campos son obligatorios.`)
                // si si faltan esos datos lanzamos un error.
            } else {
                const newproduct = {
                    // creamos el objeto con los valores.
                    id: crypto.randomBytes(12).toString(`hex`), // id  aleatorio en hexadecimal
                    tittle: data.tittle,
                    photo: data.photo || "url.jpg", // foto o url.
                    category: data.category,
                    price: data.price,
                    stock: data.stock,
                };
                let productos = await fs.promises.readFile(this.path, "utf-8"); // usamos metodo readFile para leer el archivo
                productos = JSON.parse(productos); // lo parseamos para usar esos datos luego. 
                productos.push(newproduct); // pusheamos el array del usuario 
                await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2));
                // usamos  writefileSync porque queremos que guarde inmediatamente y stringify para convertir a json
                console.log('Producto creado con éxito');
                return newproduct;
            }

        } catch (error) {
            console.log(error);
        }
    }

    // read  devuelve todos los registros
    async read(category) {
        try {
            let allProducts = await fs.promises.readFile(this.path, "utf-8");
            allProducts = JSON.parse(allProducts);
            
            // Asegúrate de que la categoría proporcionada sea válida
            const validCategories = ['zapatillas', 'indumentaria', 'celulares', 'accesorios']; // Añade tus categorías aquí
            
            // Filtrar por categoría si se especifica una válida y no es 'todos'
            if (category && validCategories.includes(category)) {
                allProducts = allProducts.filter(product => product.category === category);
            }
            
            if (allProducts.length === 0) {
                return null;
            } else {
                console.log(allProducts);
                return allProducts;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async readOne(id) {
        try {
            let productos = await fs.promises.readFile(this.path, "utf-8"); // traemos y leemos  todo el archivo
            //esperamos la lectura 
            productos = JSON.parse(productos); // parseamos el archivo  de productos
            let product = productos.find((each) => each.id === id); // buscamos  por el ID que nos mandan.
            if (!product) {

                return null;
                // si no encontramos el id largamos un error 
            } else {
                console.log(product);
                return product;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async update(id, data) {
        try {
            let all = await this.read(); // Asumiendo que tienes una función read() que carga y devuelve todos los productos.
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
    //function destroy 
    async destroy(id) {
        try {
            let productos = await fs.promises.readFile(this.path, "utf-8");
            //Esperamos la lectura del archivo y lo guardamos en variable
            productos = JSON.parse(productos);
            //parseamos
            let product = productos.find((each) => each.id === id);
            //buscamos el usuario
            if (!product) {
                throw new Error("No se encontro el producto para ser eliminado");
                // si no existe el usuario largamos error
            } else {
                let filtrado = productos.filter((each) => each.id !== id);
                //filtramos para sacar del array 
                filtrado = JSON.stringify(filtrado, null, 2);
                //singify para 
                await fs.promises.writeFile(this.path, filtrado);
                //sobre escribimos  el archivo con los datos filtrados
                console.log({ eliminado: product.id }); // mostramos en consola  el id borrado
                return product;
            }
        } catch (error) {
            throw error
        }
    }
}
const productManager = new ProductManager()
export default productManager;

// DURANTE LA CLASE VIMOS UN ERROR.
//El mismo pasaba porque si no utilizamos el metodo async / await se perdia el orden. de las funciones. 

