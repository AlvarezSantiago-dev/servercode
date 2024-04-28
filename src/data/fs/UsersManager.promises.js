import fs from "fs"
import crypto from "crypto"

class UserManager {
    constructor() {
        //definimos la ruta
        this.path = "./src/data/fs/files/users.json"
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
            if (!data.email || !data.password || !data.name ) {
                throw new Error(`Todos los campos son obligatorios.`)
                // si si faltan esos datos lanzamos un error.
            } else {
                const usernew = {
                    // creamos el objeto con los valores.
                    id: crypto.randomBytes(12).toString(`hex`), // id  aleatorio en hexadecimal
                    name: data.name,
                    photo: data.photo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFosY_nBnFL5vwZkptcqkTSRTGEo4GO_cIBrDXBrFa3A&s", // foto o url.
                    email: data.email,
                    password: data.password,
                    role: data.role || "usuario",
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
    async read(role) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            // leemos todo  el archivo y pasamos a formato json
            all = JSON.parse(all);

            const validRole =['admin', 'usuario'];
            if(role && validRole.includes(role)){
                all = all.filter(e => e.role === role)
            }
            //  parseamos
            if (all.length === 0) {
                //throw new Error("no hay usuarios");
                return null // PARA QUE NO RETORNE UN ARRAY VACIO. sino se cumpla else.
                // si no hay usuarios
            } else {
                console.log(all); // Funcional para mostrar en TEST
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
            let user = usuarios.find((each) => {each.id === id}); // buscamos  por el ID que nos mandan.
            if (!user) {
                return null;
                // si no encontramos el id largamos un error 
            } else {
                console.log(user); // Funcional para mostrar en TEST
                return user;
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
                throw new Error("No se encontro el usuario para ser eliminado");
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
            throw error
        }
    }
}

const userManager = new UserManager();
export default userManager;

//TEST FUNCIONAL users.  PARA HACERLO FUNCIONAL SE DEBE CAMBIAR EL PATH 
// this.path = "./files/users.json"
//Crea 2 usuarios, a uno lo lee (readOne) a otro lo modifica (update), y elimina a ambos. 
/*
async function test() {
    try {
        const user = new UserManager();
        const user1 = await user.create( {name:"Random", email:"randomb@gmail.com", password:"123", role: "user"} )
        const user2 = await user.create( {name:"Random numero 2", email:"hola@hotmail.com", password:"nose123", role:"user"} )
        
        const iDuser1 = user1.id;
        const iDuser2 = user2.id;
        await user.read();
        console.log("Function readOne detecto:");
        await user.readOne(iDuser1)
        
    // 

    // TEST UPDATE.
        const updated = await user.update(iDuser1,{name:"Usuario Textmodificado" ,password:"cambiopassword", role: "admin"})
        console.log("Se actualizo el name, el password y el role en:",updated);
    
    //TEST DELETE.
    await user.destroy(iDuser2);
    await user.destroy(iDuser1);
    
    } catch (error) {
        console.log(error);
    }
    //TEST DELETE
    
    
}
test();
*/