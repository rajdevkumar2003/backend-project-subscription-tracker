import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if(!DB_URI){
    throw new Error('Database URI is not available');
}

const connectToDb=async()=>{
    try {
        await mongoose.connect(DB_URI);

        console.log(`Connected to db in ${NODE_ENV} mode`);
        
    } catch (error) {
        console.error('error connecting to database:' , error)
        process.exit(1);
    }
}

export default connectToDb;