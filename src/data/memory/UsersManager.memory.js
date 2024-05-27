import crypto from "crypto"


class UsersManager {
    static #users = [];
    create(data) {
        try {
            if (!data.name || !data.email || !data.password || !data.role) {
                throw new Error(`Todos los campos son obligatorios.`)
            }
            else {
                const usernew = {
                    id: crypto.randomBytes(12).toString("hex"),
                    name: data.name,
                    photo: data.photo || "url.jpg",
                    email: data.email,
                    password: data.password,
                    role: data.role,
                
                }
                UsersManager.#users.push(usernew);
                console.log("Usuario creado con exito! 😊");
                return usernew;
            }

        } catch (error) {
            console.log(error);
        }


    }
    read() {
        try {
            if (UsersManager.#users.length === 0) {
                throw new Error('No hay usuarios registrados');
            }
            else {
                return UsersManager.#users;
            }
        } catch (error) {
            console.log(error);
        }
    }
    readOne(id) {
        try {
            let busquedausuario = UsersManager.#users.find((item) => item.id === id);
            if (!busquedausuario) {
                throw new Error(`El usuario con la ID "${id}" no existe`);
            }
            else {
                return busquedausuario;
            }
        } catch (error) {
            console.log(error);
        }
    }
    async readByEmail(email) {
        try {
            let user = UsersManager.#users.find((item)=> item.email === email);
            if (!user) {
                throw new Error(`El usuario con la ID "${id}" no existe`);
            }
            else {
                return user;
            }
        } catch (error) {
            throw error;
        }
    }
//CORREGIR Y HACER FUNCIONAL
    update(id, data) {
        try {
            let busqueda = UsersManager.#users.find(item => item.id == id);
            if(!busqueda){
                throw new Error(`No se ha encontrado un producto con la ID ${id}`);
                }else{
                    for (const key in data) {
                        busqueda[key] =  data[key];
                    }
                    console.log(busqueda);
                    return busqueda;
                   //Simulamos una latencia de red

            }
        } catch (error) {
            throw error;
        }
    }
    destroy(id) {
        try {
            let busqueda = UsersManager.#users.find(e => e.id === id);
            if (!busqueda) {
                throw new Error(`Usuario no encontrado`)
            } else {
                let filtrado = UsersManager.#users.filter((item) => item.id !== id);
                UsersManager.#users = filtrado;
                console.log(`Se ha eliminado correctamente el usuario con el id: ${busqueda.id}`);
                return busqueda;
            }

        } catch (error) {
        }
    }
}

//funcion test users
function test() {
    try {
        const usuarios = new UsersManager();
        //Creamos un const de producto para alamacenar su valor.
        const usuario1 = usuarios.create({
            name: `Lucas`,
            email: `lucas@gmail.com`,
            password: "user1",
            role: "usuario",
        });
        const usuario2 = usuarios.create({
            name: `Julieta`,
            email: `julieta@gmail.com`,
            password: "user2",
            role: "usuario",
        });
        //Guardamos los valores en la variable para poder mostrarlos.
        const idUsuario1 = usuario1.id;

        const idUsuario2 = usuario2.id;
        console.log(" Paso1 :Todos los usuarios son: ");
        console.log(usuarios.read());
        // Llamamos a todos
        console.log("Paso2: Llamamos en particular al primer usuario creado en la posicion 0 del array:", usuarios.readOne(idUsuario1));
        // Llamamos solo a uno.
        console.log("Paso3: Destuimos el usuario con el id:");
        // Destuimos por id
        console.log(usuarios.destroy(idUsuario2));
        console.log(" Paso4: Creamos un nuevo usuario.");
        const ultimoUsuario = usuarios.create({
            name: `Santiago`,
            email: `santiago@gmail.com`,
            password: "user3",
            role: "admin",
        });
        console.log(usuarios.readOne(ultimoUsuario.id));

        console.log("Paso5: Eliminamos el ultimo usuario creado.",usuarios.destroy(ultimousuario.id));
    } catch (error) {
        console.log(error);
    }
}
test();
