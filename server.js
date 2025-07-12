import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import carRoutes from './routes/cars.js';
import authRoutes from './routes/users.js'

dotenv.config();
const app = express();

if (!process.env.MONGODB_URI) {
    console.error("❌ MONGO_URI is not defined in .env");
    process.exit(1);
}

mongoose.set('strictQuery', true);

app.use(cors());
app.use(express.json());

app.use('/api/cars', carRoutes);
app.use('/api/auth', authRoutes)

mongoose.connect(process.env.MONGODB_URI || '')
    .then(() => {
        app.listen(process.env.PORT || 3001, () => {
            console.log('Server running on ');
        })
    })
    .catch((err) => console.error('MongoDB connection error:', err));