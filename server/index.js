const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// for node versions prior to 18 you might need a fetch polyfill
// const fetch = require('node-fetch');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/generate', async (req, res) => {
    const { userIdea } = req.body;
    if (!userIdea || !userIdea.trim()) {
        return res.status(400).json({ error: "No workshop idea provided." });
    }

    const prompt = `You are a Hack Club workshop builder. Create a fun, interactive workshop for high schoolers based on the following idea: 

"${userIdea}"

Generate a complete Markdown document following these guidelines:

1. **Title & Overview:**  
   - Start with a clear, attention-grabbing title (using a \`#\` heading).  
   - Include an "Estimated Time" and "Prerequisites" section below the title.

2. **Summary:**  
   - Write a brief summary that explains what the workshop is about.

3. **Steps:**  
   - List the workshop steps in order. Use bullet points or numbered lists.  
   - For each step that includes code, insert the code inside a fenced code block.  
   - **IMPORTANT:** Each code block must include the appropriate language identifier (e.g., \`\`\`js, \`\`\`python, etc.) to enable syntax highlighting.

4. **Formatting for Readability:**  
   - Use secondary headings (e.g., \`##\`) to divide sections such as "Summary," "Steps," and "Deploy Instructions."  
   - Add horizontal rules (using three hyphens: ---) or extra spacing between major sections to improve readability.
   - Where relevant, include "pill" or "tag" style labels (e.g., [Note], [Tip]) to highlight important information.

5. **Deploy Instructions:**  
   - Provide clear instructions on how to deploy or run the workshop, with any necessary code snippets formatted as described.

6. **Style & Tone:**  
   - Keep the document beginner-friendly, engaging, and fun.  
   - Do not include any extraneous commentary; output only the formatted Markdown.

Please generate the complete Markdown document based on these instructions.
`;

    try {
        const response = await fetch('https://ai.hackclub.com/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [{ role: 'user', content: prompt }]
            })
        });
        const data = await response.json();

        if (data.choices && data.choices[0].message.content) {
            generatedWorkshop = data.choices[0].message.content;
            // console.log("Generated workshop:", generatedWorkshop);
            return res.json({ result: generatedWorkshop });
        } else {
            return res.status(500).json({ error: "Unexpected response format." });
        }
    } catch (error) {
        console.error("Error generating workshop:", error);
        return res.status(500).json({ error: "Failed to generate workshop." });
    }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
