import mongoose from "mongoose";
import serverConfig from "./serverConfig.js";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/newDB"); 
        // Console.log(serverConfig.dbURI) 
    } catch (error) {
        console.error("Error ==>", error.message);
        process.exit(1);
    }
}

export default connectDB;
// AKIAUZPNLSRRCQCWT6NR
// U4fZSdo5KcD/wszvsD2q16QKbMVd0CUwLYRbJH9I