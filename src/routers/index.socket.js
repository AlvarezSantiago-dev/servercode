import productManager from "../data/fs/ProductsManager.promise.js";

export default async (socket) =>  {
    console.log("Client id:"+ socket.id)
    socket.emit("products", await productManager.read())
    socket.on("newproduct", async data => 
    await productManager.create(data))
    socket.emit("products", await productManager.read())
};