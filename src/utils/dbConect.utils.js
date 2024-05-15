import { connect } from "mongoose";
import "dotenv/config.js"

async function dbConect() {
    try {
        await connect(process.env.MONGO_URI);
        console.log("connected to mongo database");
    } catch (error) {
        console.log(error);
    }
}
export default dbConect
