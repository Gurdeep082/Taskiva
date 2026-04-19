import { useState, useRef, useEffect } from "react";
import "../App.css";

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi 👋 I’m TASKIVA AI. How can I help you?" }
  ]);
  const [input, setInput] = useState("");

  const chatRef = useRef();

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  // 🔥 REAL TYPING EFFECT
  const typeText = (text) => {
    let i = 0;
    let current = "";

    const interval = setInterval(() => {
      current += text[i];
      i++;

      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "ai",
          text: current
        };
        return updated;
      });

      if (i >= text.length) clearInterval(interval);
    }, 15);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");

    setMessages(prev => [
      ...prev,
      { role: "user", text: userText },
      { role: "ai", text: "Typing..." }
    ]);

    try {
      const res = await fetch("https://taskiva-1.onrender.com/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userText })
      });

      const data = await res.json();

      // 🔥 replace typing with animated response
      typeText(data.reply || "No response");

    } catch {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "ai",
          text: "Server error 😢"
        };
        return updated;
      });
    }
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "#1B3C53",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: "22px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          zIndex: 999,
          transition: "0.2s"
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        🤖
      </div>

      {/* CHAT BOX */}
      <div
        style={{
          position: "fixed",
          bottom: open ? "90px" : "20px",
          right: "20px",
          width: "320px",
          height: open ? "420px" : "0px",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(12px)",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          transition: "all 0.3s ease",
          opacity: open ? 1 : 0,
          zIndex: 999
        }}
      >
        {/* HEADER */}
        <div style={{
          padding: "10px",
          background: "#1B3C53",
          color: "#fff",
          fontWeight: "bold"
        }}>
          TASKIVA AI
        </div>

        {/* CHAT */}
        <div
          ref={chatRef}
          style={{
            height: "300px",
            overflowY: "auto",
            padding: "10px"
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                textAlign: msg.role === "user" ? "right" : "left",
                marginBottom: "8px",
                animation: "fadeIn 0.3s ease"
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "8px 12px",
                  borderRadius: "12px",
                  background:
                    msg.role === "user"
                      ? "#1B3C53"
                      : "linear-gradient(135deg, #E3E3E3, #ffffff)",
                  color: msg.role === "user" ? "#fff" : "#000",
                  maxWidth: "80%"
                }}
              >
                {msg.text === "Typing..." ? (
                  <span className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                ) : (
                  msg.text
                )}
              </span>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div style={{ display: "flex", padding: "10px", gap: "6px" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask anything..."
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc"
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              borderRadius: "8px",
              border: "none",
              marginTop: "10px",
              height: "max-content",
              background: "#1B3C53",
              color: "#fff",
              padding: "8px 12px",
              cursor: "pointer"
            }}
          >
            ➤
          </button>
        </div>
      </div>
    </>
  );
}