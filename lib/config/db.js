import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://Blogs:Blogs123@blogs.q7ka9.mongodb.net/')
    console.log('DB connected')
}