import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import Editor from "@monaco-editor/react";
import "./App.css";

function App() {
  const [idea, setIdea] = useState("");
  const [workshop, setWorkshop] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("preview"); // 'preview' or 'editor'

  const generateWorkshop = async () => {
    if (!idea.trim()) {
      alert("Please enter a workshop idea.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userIdea: idea }),
      });
      const data = await res.json();
      if (data.result) {
        setWorkshop(data.result);
      } else {
        setWorkshop("No result received.");
      }
    } catch (error) {
      console.error(error);
      setWorkshop("Error generating workshop.");
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Workshop Designer</h1>
      <p className="app-subtitle">
        Describe your workshop idea and let our AI generate a Hack Club workshop
        for you!
      </p>

      <div className="section">
        <label htmlFor="idea" className="section-label">
          Workshop Idea
        </label>
        <textarea
          id="idea"
          rows="4"
          className="input-textarea"
          placeholder="E.g. Build a game with Phaser.js"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        ></textarea>
      </div>

      <div className="section">
        <button
          onClick={generateWorkshop}
          className="button-custom"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Workshop"}
        </button>
      </div>

      {workshop && (
        <div className="card-custom">
          <div className="tabs">
            <button
              onClick={() => setActiveTab("preview")}
              className={`tab-button ${
                activeTab === "preview" ? "active" : ""
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab("editor")}
              className={`tab-button ${activeTab === "editor" ? "active" : ""}`}
            >
              Editor
            </button>
          </div>

          {activeTab === "preview" ? (
            <div className="markdown-preview">
              <ReactMarkdown
                rehypePlugins={[rehypeHighlight]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <pre className="code-block">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    ) : (
                      <code className="inline-code" {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {workshop}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="editor-container">
              <Editor
                height="400px"
                defaultLanguage="markdown"
                value={workshop}
                onChange={(value) => setWorkshop(value)}
                theme="vs-dark"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
