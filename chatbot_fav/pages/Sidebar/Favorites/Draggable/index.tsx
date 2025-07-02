// pages/Sidebar/Favorites/Draggable/index.tsx
import React from "react";
import { DraggableProps } from "../../../types";

const Draggable: React.FC<DraggableProps> = ({ chat, toggleFavorite, onDragStart }) => {
  return (
    <li
      draggable
      onDragStart={(e) => onDragStart(e, chat.id)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px 10px",
        cursor: "grab",
      }}
    >
      <span>{chat.name}</span>
      <button
        onClick={() => toggleFavorite(chat.id)}
        style={{
          color: "red",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        &#10084;
      </button>
    </li>
  );
};

export default Draggable;
