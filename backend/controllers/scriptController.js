const axios = require("axios");
const Script = require("../models/Script");


exports.generateScript = async (req, res) => {
    try {
      const { prompt } = req.body;
      const userId = req.user._id; 


      console.log("userId:", req.user);
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }
  
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        { 
          contents: [{ parts: [{ text: prompt }] }]  
        },
        { params: { key: process.env.GEMINI_API_KEY } }
      );
  
      const generatedText =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
  
      const script = await Script.create({
        user: userId,
        prompt,
        generatedText,
      });
  
      res.status(201).json(script);
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Failed to generate script" });
    }
  };
  

exports.getUserScripts = async (req, res) => {
  try {
    const scripts = await Script.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(scripts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch scripts" });
  }
};

exports.getScriptById = async (req, res) => {
  try {
    const script = await Script.findOne({ _id: req.params.id, user: req.user._id });

    if (!script) {
      return res.status(404).json({ error: "Script not found" });
    }

    res.json(script);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch script" });
  }
};

exports.deleteScript = async (req, res) => {
  try {
    const script = await Script.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!script) {
      return res.status(404).json({ error: "Script not found or not authorized" });
    }

    res.json({ message: "Script deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete script" });
  }
};
