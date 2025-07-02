import React from "react";
import type { Folder, Chat } from "../types";

type SetFolders = React.Dispatch<React.SetStateAction<Folder[]>>;
type SetRecentChats = React.Dispatch<React.SetStateAction<Chat[]>>;

export const useDroppable = (setFolders: SetFolders, setRecentChats: SetRecentChats) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropOnFolder = (e: React.DragEvent, folderId: number) => {
    e.preventDefault();
    const draggedChatId = parseInt(e.dataTransfer.getData("chatId"));
    const sourceFolderId = e.dataTransfer.getData("folderId");
    
    setFolders(prev => prev.map(f => f.id === folderId && !f.chats.includes(draggedChatId) ? { ...f, chats: [...f.chats, draggedChatId] } : f));
    if (sourceFolderId !== "root" && parseInt(sourceFolderId) !== folderId) {
      setFolders(prev => prev.map(f => f.id === parseInt(sourceFolderId) ? { ...f, chats: f.chats.filter(id => id !== draggedChatId) } : f));
    }
  };
  
  // ...other drop handlers with React.DragEvent types...
  const handleDropReorder = (e: React.DragEvent, folderId: number, targetIndex: number) => {
    e.preventDefault();
    const draggedChatId = parseInt(e.dataTransfer.getData("chatId"));
    const sourceFolderId = e.dataTransfer.getData("folderId");
    if (sourceFolderId !== String(folderId)) return;

    setFolders(prev => prev.map(f => {
      if (f.id === folderId) {
        const newChats = f.chats.filter(id => id !== draggedChatId);
        newChats.splice(targetIndex, 0, draggedChatId);
        return { ...f, chats: newChats };
      }
      return f;
    }));
  };

  const handleDropOnRoot = (e: React.DragEvent) => {
    e.preventDefault();
    const draggedChatId = parseInt(e.dataTransfer.getData("chatId"));
    const sourceFolderId = e.dataTransfer.getData("folderId");
    if (sourceFolderId !== "root") {
      setFolders(prev => prev.map(f => f.id === parseInt(sourceFolderId) ? { ...f, chats: f.chats.filter(id => id !== draggedChatId) } : f));
    }
  };

  const handleDropReorderRoot = (e: React.DragEvent, targetChatId: number) => {
    e.preventDefault();
    const draggedChatId = parseInt(e.dataTransfer.getData("chatId"));
    const sourceFolderId = e.dataTransfer.getData("folderId");
    if (sourceFolderId !== "root") { handleDropOnRoot(e); return; };
    if (draggedChatId === targetChatId) return;

    setRecentChats(prev => {
      const newChats = [...prev];
      const draggedItem = newChats.find(c => c.id === draggedChatId);
      if (!draggedItem) return prev;
      const fromIndex = newChats.findIndex(c => c.id === draggedChatId);
      const toIndex = newChats.findIndex(c => c.id === targetChatId);
      newChats.splice(fromIndex, 1);
      newChats.splice(toIndex, 0, draggedItem);
      return newChats;
    });
  };

  return { handleDragOver, handleDropOnFolder, handleDropReorder, handleDropOnRoot, handleDropReorderRoot };
};
