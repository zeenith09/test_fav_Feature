import React, { useState } from "react";
import Favorites from "./Favorites";
import { useSidebar } from "../hooks/useSidebar";
import type { SidebarProps } from "../types";

const initialMockChats = [
  // ... your mock data
  { id: 1, name: "Chat 1", favorite: true },
  { id: 2, name: "Chat 2", favorite: true },
  { id: 3, name: "Chat 3", favorite: false },
  { id: 4, name: "Chat 4", favorite: true },
  { id: 5, name: "Chat 5", favorite: false },
];

const Sidebar: React.FC<SidebarProps> = ({ activeChatId, setActiveChatId }) => {
  const [activeTab, setActiveTab] = useState<"Recent" | "Favorite">("Recent");
  const sidebarLogic = useSidebar(initialMockChats);

  // --- STYLE DEFINITIONS FOR THE NEW TAB DESIGN ---

  // Base style for the button, acting as the tab label
  const baseTabButtonStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    outline: "none",
    cursor: "pointer",
    fontSize: "16px",
    textAlign: "left",
    whiteSpace: "nowrap", // Prevent text from wrapping
    padding: "0", // No padding on the button itself, managed by outer container
  };

  // Active state for the button
  const activeTabButtonStyle: React.CSSProperties = {
    ...baseTabButtonStyle,
    fontWeight: "bold",
  };

  // Style for the main container of each tab (holding button and line)
  const tabContainerStyle: React.CSSProperties = {
    display: "flex", // Makes label and line align horizontally
    flexDirection: "column", // Stacks label above the line
    flexBasis: "50%", // Each tab takes 50% width of the nav bar
    padding: "10px 0", // Padding around the tab content (label + line)
    // No border here. The line itself will be a separate div.
  };

  // Style for the line BELOW the word
  const lineStyle: React.CSSProperties = {
    height: "2px", // Thickness of the line
    backgroundColor: "#e0e0e0", // Inactive line color
    marginTop: "4px", // Space between the word and the line
    width: "100%", // Line always spans full width of its container (50% of nav)
  };

  // Active state for the line
  const activeLineStyle: React.CSSProperties = {
    ...lineStyle,
    backgroundColor: "#000", // Active line color
  };

  // --- END STYLE DEFINITIONS ---


  return (
    <div style={{ width: "50vw", borderRight: "1px solid #ccc", height: "100vh", overflowY: "auto" }}>
      {/* ... New Chat and Search Bar remain the same ... */}
      <div style={{ padding: "10px" }}>
        <input type="text" value={sidebarLogic.newChatName} onChange={(e) => sidebarLogic.setNewChatName(e.target.value)} placeholder="Enter new chat name" style={{ width: "70%" }} />
        <button onClick={sidebarLogic.addNewChat} style={{ marginLeft: "10px" }}>New Chat</button>
      </div>
      <div style={{ padding: "10px" }}>
        <input type="text" value={sidebarLogic.searchTerm} onChange={(e) => sidebarLogic.setSearchTerm(e.target.value)} placeholder="Search chats" style={{ width: "90%" }} />
      </div>


      {/* --- UPDATED NAV BAR SECTION --- */}
      <nav
 
      >
        {/* Recent Tab Group */}
        <div style={tabContainerStyle}>
          <button
            onClick={() => setActiveTab("Recent")}
            style={activeTab === "Recent" ? activeTabButtonStyle : baseTabButtonStyle}
          >
            Recent
          </button>
          <div style={activeTab === "Recent" ? activeLineStyle : lineStyle}></div>
        </div>

        {/* Small gap in the middle (optional, can be controlled by padding/margin) */}
        {/* For a clean 50/50 split and a visual gap, we can add a tiny div or rely on spacing in the main nav */}
        {/* Removed explicit gap div here for cleaner 50/50 split */}


        {/* Favorite Tab Group */}
        <div style={tabContainerStyle}>
          <button
            onClick={() => setActiveTab("Favorite")}
            style={activeTab === "Favorite" ? activeTabButtonStyle : baseTabButtonStyle}
          >
            Favorite
          </button>
          <div style={activeTab === "Favorite" ? activeLineStyle : lineStyle}></div>
        </div>
      </nav>
      {/* --- END OF UPDATED SECTION --- */}


      {/* ... Recent and Favorite tab content remains the same ... */}
      {activeTab === "Recent" && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {sidebarLogic.filteredRecentChats.map((chat) => (
            <li key={chat.id} onClick={() => setActiveChatId(chat.id)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 10px", cursor: "pointer", backgroundColor: activeChatId === chat.id ? "#e0e0e0" : "transparent", transition: "background 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = activeChatId === chat.id ? "#e0e0e0" : "transparent")}>
              {sidebarLogic.renamingChatId === chat.id ? (<input type="text" defaultValue={chat.name} onBlur={(e) => sidebarLogic.renameChat(chat.id, e.target.value)} autoFocus />) : (<span>{chat.name}</span>)}
              <div>
                <button onClick={() => sidebarLogic.toggleFavorite(chat.id)} style={{ color: chat.favorite ? "red" : "black", background: "none", border: "none", cursor: "pointer" }}>&#10084;</button>
                <button onClick={() => sidebarLogic.startRename(chat.id)} style={{ marginLeft: "5px" }}>Edit</button>
                <button style={{ marginLeft: "5px" }}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {activeTab === "Favorite" && (
        <Favorites {...sidebarLogic} setActiveChatId={setActiveChatId} activeChatId={activeChatId} />
      )}
    </div>
  );
};

export default Sidebar;