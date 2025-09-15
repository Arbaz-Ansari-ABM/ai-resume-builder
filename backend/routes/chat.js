const express = require("express");
const Groq = require("groq-sdk");
const auth = require("../middleware/auth");

const router = express.Router();

// Initialize Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "your-groq-api-key-here",
});

// Chat endpoint for AI assistance
router.post("/", auth, async (req, res) => {
  try {
    const { message, resumeData } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    // Create system prompt
    const systemPrompt = `You are an AI resume assistant. Help users improve their resumes by providing suggestions, writing tips, and answering questions about resume best practices. 

    Current resume context:
    ${resumeData ? JSON.stringify(resumeData, null, 2) : "No resume data provided"}

    Provide helpful, specific, and actionable advice. Be encouraging and professional.`;

    // Call Groq API
    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192", // ✅ Free & fast Groq model
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;

    res.json({
      message: aiResponse,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Chat error:", error);

    // Fallback response
    const fallbackResponses = [
      "I'm here to help you with your resume! Could you please rephrase your question?",
      "I'm experiencing some technical difficulties. Please try again in a moment.",
      "I'd be happy to help you improve your resume. What specific area would you like to work on?",
    ];

    res.json({
      message: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
      timestamp: new Date().toISOString(),
      isFallback: true,
    });
  }
});

// Suggestions endpoint
router.post("/suggestions", auth, async (req, res) => {
  try {
    const { section, content } = req.body;

    if (!section || !content) {
      return res.status(400).json({ message: "Section and content are required" });
    }

    const systemPrompt = `You are a professional resume writer. Analyze the ${section} section and provide specific suggestions for improvement. Be constructive and specific.

    Current ${section} content:
    ${content}

    Provide 3-5 specific suggestions for improvement.`;

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Please review my ${section} section and provide suggestions.` },
      ],
      max_tokens: 400,
      temperature: 0.5,
    });

    const suggestions = completion.choices[0].message.content;

    res.json({
      suggestions,
      section,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Suggestions error:", error);
    res.status(500).json({ message: "Failed to generate suggestions" });
  }
});

module.exports = router;
