import fs from "fs"
import crypto from "crypto"

class UserManager {
    constructor() {
        //definimos la ruta
        this.path = "./data/fs/files/users.json"
        this.init()
    }
    init() {
        const exist = fs.existsSync(this.path);
        if (!exist) {
            // Si no existe el archivo
            const stringData = JSON.stringify([], null, 2);
            // Define el contenido y crea el archivo
            fs.writeFileSync(this.path, stringData);
            console.log("Archivo creado");
        } else {
            console.log(`Archivo ya existe`);
        }
    }
    //creamos una funcion para agregar usuarios.
    async create(data) {
        // utilizamos metodo sync  para que se ejecute de manera sincronica 
        try {
            if (!data.email || !data.password || !data.name || !data.role) {
                throw new Error(`Todos los campos son obligatorios.`)
                // si si faltan esos datos lanzamos un error.
            } else {
                const usernew = {
                    // creamos el objeto con los valores.
                    id: crypto.randomBytes(12).toString(`hex`), // id  aleatorio en hexadecimal
                    name: data.name,
                    photo: data.photo || "url.jpg", // foto o url.
                    email: data.email,
                    password: data.password,
                    role: data.role,
                };
                let users = await fs.promises.readFile(this.path, "utf-8"); // usamos metodo readFile para leer el archivo
                users = JSON.parse(users); // lo parseamos para usar esos datos luego. 
                users.push(usernew); // pusheamos el array del usuario 
                await fs.promises.writeFile(this.path, JSON.stringify(users, null, 2));
                // usamos  writefileSync porque queremos que guarde inmediatamente y stringify para convertir a json
                console.log('Usuario creado con éxito');
                return usernew; // Importante para crear un ultimo archivo y poder recibir el id.
            }

        } catch (error) {
            console.log(error);
        }
    }

    // read  devuelve todos los registros
    async read() {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            // leemos todo  el archivo y pasamos a formato json
            all = JSON.parse(all);
            //  parseamos
            if (all.length === 0) {
                throw new Error("no hay usuarios");
                // si no hay productos
            } else {
                console.log(all);
                return all;
                // sino  retornamos los productos
            }
        } catch (error) {
            console.log(error);
        }
    }

    async readOne(id) {
        try {
            let usuarios = await fs.promises.readFile(this.path, "utf-8"); // traemos y leemos  todo el archivo
            //esperamos la lectura 
            usuarios = JSON.parse(usuarios); // parseamos el archivo  de usuarios
            let user = usuarios.find((each) => each.id === id); // buscamos  por el ID que nos mandan.
            if (!user) {

                throw new Error("Usuario no encontrado");
                // si no encontramos el id largamos un error 
            } else {
                console.log(user);
                return user;
            }
        } catch (error) {
            console.log(error);
        }
    }

    //function destroy 
    async destroy(id) {
        try {
            let usuarios = await fs.promises.readFile(this.path, "utf-8");
            //Esperamos la lectura del archivo y lo guardamos en variable
            usuarios = JSON.parse(usuarios);
            //parseamos
            let user = usuarios.find((each) => each.id === id);
            //buscamos el usuario
            if (!user) {
                throw new Error("Intentamos eliminar el usuario con el id solicitado pero no existe.");
                // si no existe el usuario largamos error
            } else {
                let filtrado = usuarios.filter((each) => each.id !== id);
                //filtramos para sacar del array 
                filtrado = JSON.stringify(filtrado, null, 2);
                //singify para 
                await fs.promises.writeFile(this.path, filtrado);
                //sobre escribimos  el archivo con los datos filtrados
                console.log({ eliminado: user.id }); // mostramos en consola  el id borrado
                return user;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const userManager = new UserManager();
export default userManager;
/*
// DURANTE LA CLASE VIMOS UN ERROR. 
//El mismo pasaba porque si no utilizamos el metodo async / await se perdia el orden. de las funciones. 
async function test() {
    try {
        const users = new UserManager();

        const usuario1 =  await users.create({ name:"Lucas",email: "lucas@gmail.com", password: "pasword1", role: "usuario" });
        const usuario2 =  await users.create({ name:"Julieta",email: "julieta@gmail.com", password: "pasword2", role: "usuario" });

        const idUser1 = usuario1.id;
        const idUser2 = usuario2.id;

        console.log("Paso1: Mostramos todos los usuarios creados: ");
        // Llamamos a todos
        await users.read();
        console.log( "Paso2: Llamamos en particular al usuario:");
        // Llamamos solo a uno.
        await users.readOne(idUser1);
        // Destuimos por id
        console.log("Paso3: Eliminamos un usuario en particular.");
        await users.destroy(idUser2);
        console.log("Paso4: Registramos un nuevo usuario.");

        //creamos un ultimo y leemos su id para eliminarlo. pero no funciono. :c
        const ultimo = await users.create({ name:"Santiago", email: "santiago@gmail.com", password: "1234", role: "admin"  });
        console.log("Paso5: Llamamos a el ultimo usuario creado recientemente.");
        await users.readOne(ultimo.id);
        console.log("Paso6: Destruimos le ultimo user");
        await users.destroy(ultimo.id);
        
    } catch (error) {
        console.log(error);
    }
}
test();

*/