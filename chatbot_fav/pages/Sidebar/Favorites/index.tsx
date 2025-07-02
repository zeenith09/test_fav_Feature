import React, { useState } from "react";
import DroppableFolder from "./Folder";
import type { FavoritesProps } from "../../types";

const Favorites = ({
  recentChats,
  setActiveChatId,
  filteredFavoriteChats,
  toggleFavorite,
  folders,
  createFolder,
  folderName,
  setFolderName,
  renameFolder,
  deleteFolder,
  handleDragOver,
  handleDropOnFolder,
  handleDragStart,
  handleDropReorder,
  handleDropOnRoot,
  handleDropReorderRoot,
  activeChatId,
  startRename,
  renameChat,
  renamingChatId,
}: FavoritesProps) => {
  const [hoveredChatId, setHoveredChatId] = useState<number | null>(null);

  return (
    <div>
      <div style={{ padding: "10px" }}>
        <input type="text" value={folderName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFolderName(e.target.value)} placeholder="New folder name" style={{ width: "70%" }} />
        <button onClick={createFolder} style={{ marginLeft: "10px" }}>Create Folder</button>
      </div>

      {folders.map((folder) => (
        <DroppableFolder key={folder.id} folder={folder} recentChats={recentChats} toggleFavorite={toggleFavorite} renameFolder={renameFolder} deleteFolder={deleteFolder} activeChatId={activeChatId} setActiveChatId={setActiveChatId} onDragStart={handleDragStart} onDropReorder={handleDropReorder} onDropOnFolder={handleDropOnFolder} />
      ))}

      <ul style={{ listStyle: "none", padding: 0, minHeight: "60px" }} onDragOver={handleDragOver} onDrop={handleDropOnRoot}>
        
        {filteredFavoriteChats.filter((chat) => !folders.some((folder) => folder.chats.includes(chat.id))).map((chat) => (
          <li key={chat.id} draggable onDragStart={(e) => handleDragStart(e, chat.id, "root")} onDragOver={handleDragOver} onDrop={(e) => { e.stopPropagation(); handleDropReorderRoot(e, chat.id); }} onClick={() => setActiveChatId(chat.id)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 10px", cursor: "pointer", backgroundColor: activeChatId === chat.id ? "#e0e0e0" : "transparent", transition: "background 0.2s" }} onMouseEnter={() => setHoveredChatId(chat.id)} onMouseLeave={() => setHoveredChatId(null)}>
            
            {renamingChatId === chat.id ? (<input type="text" defaultValue={chat.name} onBlur={(e) => renameChat(chat.id, e.target.value)} autoFocus />) : (<span>{chat.name}</span>)}
            
            <div>
              <button onClick={(e) => { e.stopPropagation(); toggleFavorite(chat.id); }} style={{ color: "red", background: "none", border: "none", cursor: "pointer" }}>&#10084;</button>
              <button onClick={(e) => { e.stopPropagation(); startRename(chat.id); }} style={{ marginLeft: "5px" }}>Edit</button>
              <button style={{ marginLeft: "5px" }}>Delete</button>
            </div>

          </li>
        ))}

      </ul>

    </div>
  );
};

export default Favorites;
