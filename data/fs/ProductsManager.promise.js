import fs  from "fs"
import crypto  from "crypto"

class ProductManager {
    constructor() {
        //definimos la ruta
        this.path = "./data/fs/files/products.json"
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
                return  newproduct;
            }

        } catch (error) {
            console.log(error);
        }
    }

    // read  devuelve todos los registros
    async read() {
        try {
            let allproducts = await fs.promises.readFile(this.path, "utf-8");
            // leemos todo  el archivo y pasamos a formato json
            allproducts = JSON.parse(allproducts);
            //  parseamos
            if (allproducts.length === 0) {
                throw new Error("no hay productos");
                // si no hay notas largamos este error.
            } else {
                console.log(allproducts);
                return allproducts;
                // sino  retornamos las notas.
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

                throw new Error("Producto no encontrado.");
                // si no encontramos el id largamos un error 
            } else {
                console.log(product);
                return product;
            }
        } catch (error) {
            console.log(error);
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
            console.log(error);
        }
    }
}
const productManager = new ProductManager()
export default productManager;

// DURANTE LA CLASE VIMOS UN ERROR. 
//El mismo pasaba porque si no utilizamos el metodo async / await se perdia el orden. de las funciones. 

