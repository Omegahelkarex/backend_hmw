import mongoose from "mongoose";

import { DB_Name } from "../constant.js";

const connectDb=async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
        console.log("Database connected");
    } catch (error) {
        console.error(error);
    }
}
export default connectDb;
