import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { getQuerybyUser, postQuery } from './controllers/geminichat.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5002;

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URL);

    if(conn){
        console.log("Mongodb connected");
    }else{
        console.log("Mongodb not connected");
    }
}

app.get('/health', async(req, res) => {
    res.status(200).json({
        success: true,
        data: null,
        message: "Server is healthy"
    })
})

app.post('/gemini', postQuery);
app.get('/queries', getQuerybyUser);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
    connectDB();
})