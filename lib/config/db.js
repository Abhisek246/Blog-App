import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('Mongo_Url')
    console.log('DB connected')
}
