import React from "react";

interface ChatInterfaceProps {
  activeChatId: number | null;
}

type Message = {
  sender: "user" | "bot";
  text: string;
};

const mockChatData: Record<number, Message[]> = {
  1: [ { sender: "user", text: "Hello, how are you?" }, { sender: "bot", text: "I'm doing great! How can I assist you today?" } ],
  2: [ { sender: "user", text: "What's the weather today?" }, { sender: "bot", text: "It's sunny with a high of 75°F." } ],
  3: [ { sender: "user", text: "Tell me a joke" }, { sender: "bot", text: "Why don't scientists trust atoms? Because they make up everything!" } ],
  4: [ { sender: "user", text: "How to center a div in CSS?" }, { sender: "bot", text: "Use: display: flex; justify-content: center; align-items: center;" } ],
  5: [ { sender: "user", text: "What's your favorite language?" }, { sender: "bot", text: "I'm partial to JavaScript!" } ],
};

// Directly type the props object in the function signature
const ChatInterface = ({ activeChatId }: ChatInterfaceProps) => {
  const messages = activeChatId ? mockChatData[activeChatId] || [] : [];

  return (
    <div style={{ width: "50vw", height: "100vh", padding: "20px", display: "flex", flexDirection: "column" }}>
      <h2 style={{ marginBottom: "20px" }}>{activeChatId ? `Chat Interface` : "Select a Chat"}</h2>
      <div style={{ flex: 1, border: "1px solid #ccc", borderRadius: "5px", padding: "15px", overflowY: "auto", backgroundColor: "#f9f9f9" }}>
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} style={{ margin: "10px 0", padding: "10px", borderRadius: "5px", backgroundColor: msg.sender === "user" ? "#e3f2fd" : "#f5f5f5", alignSelf: msg.sender === "user" ? "flex-end" : "flex-start", maxWidth: "80%", border: `1px solid ${msg.sender === "user" ? "#bbdefb" : "#e0e0e0"}` }}>
              <strong>{msg.sender === "user" ? "You" : "Assistant"}:</strong>
              <p style={{ margin: "5px 0 0 0" }}>{msg.text}</p>
            </div>
          ))
        ) : (
          <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#777" }}>
            <p>Select a chat from the sidebar to start conversation</p>
          </div>
        )}
      </div>
      <div style={{ marginTop: "15px", display: "flex" }}>
        <input type="text" placeholder="Type a message..." style={{ flex: 1, padding: "10px", border: "1px solid #ccc", borderRadius: "4px 0 0 4px" }} disabled />
        <button style={{ padding: "10px 15px", border: "1px solid #ccc", borderRadius: "0 4px 4px 0", backgroundColor: "#f0f0f0", cursor: "not-allowed" }} disabled>Send</button>
      </div>
    </div>
  );
};

export default ChatInterface;
