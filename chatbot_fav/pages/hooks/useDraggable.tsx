import React from "react";

export const useDraggable = () => {
  // Align the type of folderId with the rest of the app
  const handleDragStart = (
    e: React.DragEvent,
    chatId: number,
    folderId?: number | "root" // Use 'root' or undefined, not null
  ) => {
    e.dataTransfer.setData("chatId", String(chatId));
    // If folderId is provided, use it; otherwise, use "root"
    e.dataTransfer.setData("folderId", folderId ? String(folderId) : "root");
  };

  return { handleDragStart };
};