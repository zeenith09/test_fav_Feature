import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ChatInterface from "./Chat";

// This is a page component, so it doesn't need a props interface
const HomePage: React.FC = () => {
  // We type the state using generics: number or null
  const [activeChatId, setActiveChatId] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar activeChatId={activeChatId} setActiveChatId={setActiveChatId} />
      <ChatInterface activeChatId={activeChatId} />
    </div>
  );
};

export default HomePage;
