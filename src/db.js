import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const mongoURI = process.env.DBMONGO_URI

export const connectDB = async ()=>{
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');
    }
    catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Salir del proceso con falla
    }
}