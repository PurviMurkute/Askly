import Chats from './../models/GeminiChat.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

const main = async (query) => {
  try {
    const result = await model.generateContent(query);
    return(result.response.text());
  }catch (e) {
    console.log(e.message);
  }
};

const postQuery = async (req, res) => {
    const { query, userId } = req.body;

    if(!query){
        return res.status(400).json({
            success: false,
            data: null,
            message: "Query is required"
        })
    }

    try{
        const response = await main(query);

        await Chats.create({ userId, query, response });

        return res.status(201).json({
            success: true,
            data: response,
            message: "content generated"
        })
    }catch(e){
        return res.status(400).json({
            success: false,
            data: null,
            message: e?.message
        })
    }
}

const getQuerybyUser = async(req, res) => {
    const { userId } = req.query;

    if(!userId){
        return res.status(404).json({
            success: false,
            data: null,
            message: "user not found"
        })
    }

    try{
        const allQueries = await Chats.find({userId : userId}).sort({ createdAt : -1 });

        return res.status(200).json({
            success: true,
            data: allQueries,
            message: "All queries fetched successfully"
        })
    }catch(e){
        return res.status(400).json({
            success: false,
            data: null,
            message: e?.message
        })
    }
}

export { postQuery, getQuerybyUser }