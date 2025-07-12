import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

const main = async (content) => {
  try {
    const result = await model.generateContent(content);
    return(result.response.text());
  }catch (e) {
    console.log(e.message);
  }
};

await main();