export type Chat = {
  id: number;
  name: string;
  favorite: boolean;
};

export type Folder = {
  id: number;
  name: string;
  chats: number[]; // An array of chat IDs
};

export type SidebarProps = {
  activeChatId: number | null;
  setActiveChatId: (id: number | null) => void; // Allow setting to null
};

export type DraggableProps = {
  chat: Chat;
  toggleFavorite: (id: number) => void;
  onDragStart: (e: React.DragEvent<HTMLLIElement>, id: number) => void;
};

export type DroppableFolderProps = {
  folder: Folder;
  recentChats: Chat[];
  toggleFavorite: (id: number) => void;
  // removeFromFolder: (folderId: number, chatId: number) => void; // <<< REMOVE THIS LINE
  renameFolder: (folderId: number, newName: string) => void;
  deleteFolder: (folderId: number) => void;
  activeChatId: number | null;
  setActiveChatId: (id: number | null) => void;
  onDragStart: (e: React.DragEvent<HTMLLIElement>, chatId: number, folderId: number) => void;
  onDropReorder: (e: React.DragEvent<HTMLLIElement>, folderId: number, chatIndex: number) => void;
  onDropOnFolder: (e: React.DragEvent<HTMLDivElement>, folderId: number) => void;
};

export type FavoritesProps = {
  recentChats: Chat[];
  setActiveChatId: (id: number | null) => void;
  filteredFavoriteChats: Chat[];
  toggleFavorite: (id: number) => void;

  folders: Folder[];
  createFolder: () => void;
  folderName: string;
  setFolderName: (name: string) => void;
  renameFolder: (id: number, newName: string) => void;
  deleteFolder: (id: number) => void;
  // removeFromFolder: (folderId: number, chatId: number) => void; // <<< REMOVE THIS LINE

  handleDragOver: (e: React.DragEvent<HTMLElement>) => void;
  handleDropOnFolder: (e: React.DragEvent<HTMLDivElement>, folderId: number) => void;
  handleDragStart: (e: React.DragEvent<HTMLLIElement>, chatId: number, folderId?: number | "root") => void; // Allow optional folderId
  handleDropReorder: (e: React.DragEvent<HTMLLIElement>, folderId: number, chatIndex: number) => void;
  handleDropOnRoot: (e: React.DragEvent<HTMLUListElement>) => void;
  handleDropReorderRoot: (e: React.DragEvent<HTMLLIElement>, chatId: number) => void;

  activeChatId: number | null;
  startRename: (id: number) => void;
  renameChat: (id: number, newName: string) => void;
  renamingChatId: number | null;
};