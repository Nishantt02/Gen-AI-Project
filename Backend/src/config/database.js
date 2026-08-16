import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDb=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log("mongoose connected successfully");
    }catch(err){
        console.log(err);
    }
}
export default connectDb;