import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();


const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log("KEY:", process.env.GEMINI_API_KEY);
router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash" // "gemini-1.5-pro" // "gemini-2.5-flash" is faster and cheaper, but less powerful
    },{ apiVersion: "v1" });

    const prompt = `
You are TASKIVA AI assistant.

Your job:
- Understand user problem
- Suggest best service (cleaning, plumbing, etc.)
- Keep answers short and helpful

User: ${message}
`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gemini error" });
  }
});

export default router;