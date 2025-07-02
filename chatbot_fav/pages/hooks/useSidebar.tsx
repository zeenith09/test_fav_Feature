import { useState, useMemo } from "react";
import { useDraggable } from "./useDraggable";
import { useDroppable } from "./useDroppable";
import { useFavorites } from "./useFavorites";
import { useFolders } from "./useFolders";
import type { Chat } from "../types";

export const useSidebar = (initialChats: Chat[]) => {
  const { recentChats, setRecentChats, renamingChatId, toggleFavorite, startRename, renameChat } = useFavorites(initialChats);
  const { folders, setFolders, folderName, setFolderName, createFolder, renameFolder, deleteFolder } = useFolders();
  const { handleDragStart } = useDraggable();
  const { handleDragOver, handleDropOnFolder, handleDropReorder, handleDropOnRoot, handleDropReorderRoot } = useDroppable(setFolders, setRecentChats);

  const [newChatName, setNewChatName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const addNewChat = () => {
    if (newChatName.trim() === "") return;
    const newChat: Chat = { id: Date.now(), name: newChatName, favorite: false };
    setRecentChats((prev) => [newChat, ...prev]);
    setNewChatName("");
    startRename(newChat.id);
  };

  const filteredRecentChats = useMemo(() =>
    recentChats.filter((chat) => chat.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [recentChats, searchTerm]
  );
  const filteredFavoriteChats = useMemo(() =>
    recentChats.filter((chat) => chat.favorite && chat.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [recentChats, searchTerm]
  );

  return {
    folders, folderName, newChatName, renamingChatId, searchTerm,
    setFolderName, setNewChatName, setSearchTerm,
    addNewChat, createFolder, deleteFolder, 
    handleDragOver, handleDragStart, handleDropOnFolder, handleDropReorder, handleDropReorderRoot, handleDropOnRoot, renameChat, renameFolder, startRename, toggleFavorite,
    filteredFavoriteChats, filteredRecentChats, recentChats,
  };
};
