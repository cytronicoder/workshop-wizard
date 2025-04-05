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

    const prompt = `You're a senior Hack Club workshop author with a knack for explaining things clearly and making learning fun. Your job is to write a **complete, beginner-friendly coding workshop** based on the following idea:

    > **"${userIdea}"**

    The audience for this workshop is **high school students who may have little or no experience with code**. The goal is to guide them through building something cool from scratch — something they can understand, customize, and feel proud of.

    ---

    ## What This Workshop Should Do

    By the end, students should:

    - Have a working project that's both functional and visually appealing
    - Understand the logic behind what they built
    - Have a solid grasp of the tools and concepts used to build it
    - Get curious about what else they can do with these tools
    - Feel like they can tinker, change things, and build their own versions

    This should feel hands-on, empowering, and fun — not like homework.

    ---

    ## Formatting Rules (Very Important)

    Your response must be a **complete, clean Markdown file**. Don't include any extra text or explanation outside the Markdown. No intros, no outros — just the workshop.

    Use **exactly one blank line after every single line**. This includes:

    - Headings
    - Paragraphs
    - List items
    - Code blocks (before and after)
    - Callout tags like **[NOTE!]**, **[TIP!]**, etc.

    Even inside lists or sections — do not skip blank lines. This keeps the formatting clean and predictable.

    Coding languages should be capitalized appropriately (like \`JavaScript\`, \`HTML\`, \`CSS\`, etc.) throughout the workshop.

    ---

    ## Workshop Structure

    Follow this structure exactly:

    # Title

    - Start with a verb (like “Build”, “Create”, “Design”, “Make”)
    - Follow with the type of project (like “a game”, “a website”, “an app”)
    - Continue with a fun twist or unique feature (like “with a twist”, “that dances”, “that talks back”)
    - End with what students will use (like “using JavaScript and HTML”)
    - Use title case
    - Don't include emojis
    - Example: “Build a Spooky Ghost Game with JavaScript” or “Create a Retro-Futuristic Dashboard Using HTML and CSS”

    Below the title, add:

    #### Estimated time: (example: 60-90 minutes)

    #### Prerequisites: (sentence case, comma-separated, no period)
    - Example: "Basic HTML, CSS, and JavaScript knowledge" or "Basic knowledge of HTML, CSS, and JavaScript"

    #### What we'll build: (a short, exciting one-sentence teaser — not too detailed)
    - Example: “A fun, interactive game where you control a spaceship and shoot asteroids.” or “A simple web app that lets you track your favorite movies.”

    ---

    ## Summary

    Start with: “In this workshop, we'll...”

    Use clear, friendly language. Mention what we're building and why it's fun. List the tools and concepts we'll use. Keep it to 3-4 short sentences. Don't use technical jargon.

    ---

    ### Step-by-Step Instructions

    Start with: \`## Setting Up\`

    Then break the project into logical steps, using action-oriented headings. Each step should be a self-contained task that builds on the previous one.

    Each step should:
    
    - Focus on one main idea or action
    - Start with an introduction to the step (1-2 sentences) that tells students what they'll do and why it's important
    - Add context for any method or concept introduced in the step
    - Include small, clear code snippets with language identifiers (like \`\`\`js)
    - Explain each code block in plain language
    - Tell students what they're doing and why it matters
    - Include optional “mini-challenges” or ideas for customization (clearly labeled)

    Use \`###\` subheadings inside steps if needed. However, by default, use \`##\` for all steps.

    Use these callout tags when relevant (but not too often):

    - **[NOTE!]** - for helpful background or context
    - **[TIP!]** - for optional tools, shortcuts, or better practices
    - **[TRY THIS!]** - for small customizations students can try
    - **[WARNING!]** - for common mistakes or confusing parts

    Tags should always start on a new line, not inline with the text. Use them sparingly, only when they add real value. Don't overuse them or make them feel like homework.

    If you mention a tool or library, link to its official documentation using clear link text (like “Learn more about p5.js”).

    Make the steps feel like we're building together, one small piece at a time.

    ---

    ## Deployment or Testing

    Add a step where we test or deploy the project.

    Explain how to run or preview it, and how to know if it worked. Share expected output if relevant. If there's a place to publish the project online, include instructions for that.

    ---

    ## Wrap-up & Next Steps

    End with a short section that:

    - Recaps what we built
    - Highlights what we learned
    - Suggests at least 3 ideas for extending or customizing the project
    - Encourages students to remix, redesign, and explore further

    ---

    ## Writing Style

    Keep the tone friendly, clear, and encouraging — like you're working alongside a student, not lecturing them.

    Use:

    - Plain English — avoid jargon unless you explain it right away
    - Short paragraphs and clear steps
    - Active voice and present tense (“We'll create a button” instead of “The button will be created”)
    - “We” instead of “you” to keep it collaborative

    Make students feel like they're building something real, not just copying code.

    ---

    ## Final Notes

    Your response must be:

    - A **fully complete Markdown workshop**, from title to final wrap-up
    - **Only** the Markdown — no extra explanations or surrounding text
    - Properly spaced with one blank line after every line
    - As long as needed to get the full project working, tested, and explained

    Don't stop partway through or summarize. Keep going until the entire project is done and students could follow it on their own from start to finish.

    Make this feel like something we could publish and share with students right away.
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
