import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  try {
    const { product, details, type } = req.body;

    const prompt = `
You are a professional e-commerce copywriter.

Product: ${product}
Details: ${details}

Write:
1. High converting product description
2. 5 bullet benefits
2. Short ad copy
3. 5 hashtags

Make it persuasive and emotional.
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    res.json({
      result: data.choices[0].message.content
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
