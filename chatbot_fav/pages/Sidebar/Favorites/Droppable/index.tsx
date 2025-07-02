import React, { useState } from "react";
import type { DroppableFolderProps } from "../../../types"; // Import the specific props interface

// The component is now a typed Functional Component (FC)
const DroppableFolder: React.FC<DroppableFolderProps> = ({
  folder,
  recentChats,
  toggleFavorite,
  renameFolder,
  deleteFolder,
  activeChatId,
  setActiveChatId,
  onDragStart,
  onDropReorder,
  onDropOnFolder,
}) => {
  // We type the internal state for clarity
  const [hoveredChatId, setHoveredChatId] = useState<number | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // We type the event handlers defined inside the component
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    onDropOnFolder(e, folder.id);
  };

  return (
    <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} style={{ border: `1px solid ${isDragOver ? "#2196F3" : "#ccc"}`, margin: "10px", padding: "10px", borderRadius: "5px", background: isDragOver ? "#e3f2fd" : "#fafafa", transition: "all 0.3s" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <input value={folder.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => renameFolder(folder.id, e.target.value)} style={{ fontWeight: "bold", border: "none", background: "transparent", color: "black" }} />
        <button onClick={() => deleteFolder(folder.id)}>Delete</button>
      </div>
      <ul style={{ listStyle: "none", padding: 0, minHeight: "50px" }}>
        {folder.chats.map((chatId, index) => {
          const chat = recentChats.find((c) => c.id === chatId);
          if (!chat) return null;
          return (
            <li key={chat.id} draggable onDragStart={(e) => onDragStart(e, chat.id, folder.id)} onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }} onDrop={(e) => { e.stopPropagation(); onDropReorder(e, folder.id, index); }} onClick={() => setActiveChatId(chat.id)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 10px", background: activeChatId === chat.id ? "#e0e0e0" : hoveredChatId === chat.id ? "#f0f0f0" : "#fff", margin: "5px 0", cursor: "pointer", transition: "background 0.2s" }} onMouseEnter={() => setHoveredChatId(chat.id)} onMouseLeave={() => setHoveredChatId(null)}>
              <span>{chat.name}</span>
              <div><button onClick={(e) => { e.stopPropagation(); toggleFavorite(chat.id); }} style={{ color: "red", background: "none", border: "none", cursor: "pointer" }}>&#10084;</button></div>
            </li>
          );
        })}
        {folder.chats.length === 0 && (<div style={{ textAlign: "center", padding: "20px", color: "#999", fontStyle: "italic" }}>Drag chats here</div>)}
      </ul>
    </div>
  );
};

export default DroppableFolder;
