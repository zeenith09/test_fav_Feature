import { useState } from "react";
import type { Folder } from "../types";

export const useFolders = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [folderName, setFolderName] = useState<string>("");

  const createFolder = () => {
    if (folderName.trim() === "") return;
    const newFolder: Folder = { id: Date.now(), name: folderName, chats: [] };
    setFolders((prev) => [...prev, newFolder]);
    setFolderName("");
  };

  const renameFolder = (folderId: number, newName: string) => {
    setFolders((prev) =>
      prev.map((f) => (f.id === folderId ? { ...f, name: newName } : f))
    );
  };

  const deleteFolder = (folderId: number) => {
    setFolders((prev) => prev.filter((f) => f.id !== folderId));
  };

  return { folders, setFolders, folderName, setFolderName, createFolder, renameFolder, deleteFolder };
};
