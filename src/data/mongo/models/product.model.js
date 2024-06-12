import { Schema, model } from "mongoose"; // FORMA DEL DATO + GENERAR MODELO
import mongoosePaginate from 'mongoose-paginate-v2';
const collection = "products"
//timestamos: guarda la fecha  de creacion y actualizacion del documento BSON.
const schema = new Schema({
    tittle: { type: String, required: true , unique: true, index: true},
    photo: { type: String, default: "https://www.casaroller.com.ar/sites/default/files/default_images/product-default.jpg"},
    price: { type: Number,  default: 1},
    // default: "category " para dar valor default.
    category: { type: String, required: true, enum: ["zapatillas", "indumentaria", "celulares", "accesorios"] },
    stock: { type: String,  default: 1}
}, { timestamps: true });

schema.plugin(mongoosePaginate);
const ProductModel = model(collection, schema);

export default ProductModel;

/* tittle: data.tittle,
photo: data.photo || "url.jpg", // foto o url.
category: data.category,
price: data.price,
stock: data.stock,*/