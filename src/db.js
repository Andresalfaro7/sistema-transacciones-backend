import mongoose from 'mongoose';

export const connectDB = async() =>{
    try {
        await mongoose.connect('mongodb://localhost/siregdb');
        console.log('BD is connected');
    } catch (error) {
        console.error(error);
    }
}