import { Schema, model } from "mongoose";
//creamos coleccion de users
const collection = "users"

const schema = new Schema({
    name: { type: String, required: true, index: true },
    email: { type: String, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    photo: { type: String,  default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFosY_nBnFL5vwZkptcqkTSRTGEo4GO_cIBrDXBrFa3A&s"}, //url
},
    { timestamps: true });

const UserModel = model(collection, schema);
export default UserModel;
/*
name: data.name,
photo: data.photo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFosY_nBnFL5vwZkptcqkTSRTGEo4GO_cIBrDXBrFa3A&s", // foto o url.
email: data.email,
password: data.password,
role: data.role || "usuario",
*/