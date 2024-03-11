class UserManager {
    static #users = [];
    create(data) {
        const user = {
            id: UserManager.#users.length === 0 ? 1 : UserManager.#users[UserManager.#users.length - 1].id+1,
            photo: data.photo,
            email: data.email,
            password: data.password,
            role: data.role
        }
        UserManager.#users.push(user);
        console.log("Usuario creado con exito! 😊");
        
    }
    read(){
        return UserManager.#users;
    }
}

const users = new UserManager();
users.create({
    photo: `url.jpg`,
    email: `juan@gmail.com`,
    password: `juan123`,
    role: `admin`
})

users.create({
    photo: `url.jpg`,
    email: `luca@gmail.com`,
    password: `12345`,
    role: `user`
})
console.log(users.read());

