import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './constants/env.constant';
import connectDB from './config/monogo.config';

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());


// Routers




// connect and listen
connectDB().then(() => {
    app.listen(env.PORT, () => {
        console.log(`Server is running on port ${env.PORT}`);
    });
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
}); 