import { useState } from "react";
import type { Chat } from "../types";

export const useFavorites = (initialChats: Chat[]) => {
  const [recentChats, setRecentChats] = useState<Chat[]>(initialChats);
  const [renamingChatId, setRenamingChatId] = useState<number | null>(null);

  const toggleFavorite = (id: number) => {
    setRecentChats((prev) =>
      prev.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c))
    );
  };

  const startRename = (id: number) => setRenamingChatId(id);

  const renameChat = (id: number, newName: string) => {
    setRecentChats((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name: newName } : c))
    );
    setRenamingChatId(null);
  };

  return {
    recentChats,
    setRecentChats,
    renamingChatId,
    toggleFavorite,
    startRename,
    renameChat,
  };
};
