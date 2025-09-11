import mongoose, { mongo } from "mongoose";
import { DB_NAME } from "./constant.js";
const connectDb = async function () {
    try {
        const connectInstance = await mongoose.connect(`${process.env.DATABASE_URL}/${DB_NAME}`);
        console.log(`MongoDb connected Succesfully ${connectInstance.connection.host}`);
        
    } catch (error) {
        console.log("MongoDB connection Error", error);
        process.exit(1);
    }
}

export default connectDb;