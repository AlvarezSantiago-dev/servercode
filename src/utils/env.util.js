import { config } from "dotenv";
import argsUtils from "./args.utils.js";

const { env } = argsUtils;
//si env es dev debo usar env.dev
//si env es produ debo usar env.prod
const path = env === "prod" ? "./.env.prod" : "./.env.dev"
config({path});

const environment = {
    MONGO_URI: process.env.MONGO_URI,

    PORT: process.env.PORT,
    SECRET_COOKIE: process.env.SECRET_COOKIE,

    SECRET_SESSION: process.env.SECRET_SESSION,

    SECRET_JWT: process.env.SECRET_JWT,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
}

export default environment;
