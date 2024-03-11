class ProductManager {
    static #productos = [];
    create(data) {
        const producto = {
            id: ProductManager.#productos.length === 0 ? 1 : ProductManager.#productos[ProductManager.#productos.length - 1].id+1,
            tittle: data.tittle,
            photo: data.photo,
            category: data.category,
            price: data.price,
            stock: data.stock
        }
        ProductManager.#productos.push(producto);
        console.log("Producto creado con exito! 😊");
        
    }
    read(){
        return ProductManager.#productos;
    }
}

const productos = new ProductManager();
productos.create({
    tittle: `Camisa a cuadros`,
    photo: `url.jpg`,
    category: `ropa`,
    price: `$100`,
    stock: 5,
})

productos.create({
    tittle: `Zapato de goma`,
    photo: `url.jpg`,
    category: `zapatos`,
    price: `$220`,
    stock: 3,
})
console.log(productos.read());
