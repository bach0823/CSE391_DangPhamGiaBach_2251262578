import { useState, useRef, useEffect } from "react";

function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  function handleSave() {
    if (editText.trim() === "") return;
    onUpdate(todo.id, editText.trim());
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setEditText(todo.text);
      setIsEditing(false);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px",
        margin: "5px 0",
        background: todo.done ? "#f0fff0" : "#fff",
        border: "1px solid #eee",
        borderRadius: "4px",
        gap: "10px",
      }}
    >
      {!isEditing && (
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
          style={{ cursor: "pointer" }}
        />
      )}

      {isEditing ? (
        <input
          ref={inputRef}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          style={{
            flex: 1,
            padding: "4px 8px",
            fontSize: "16px",
            border: "1px solid #3498db",
            borderRadius: "4px",
          }}
        />
      ) : (
        <div
          onDoubleClick={() => setIsEditing(true)}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              textDecoration: todo.done ? "line-through" : "none",
              color: todo.done ? "#999" : "#333",
            }}
          >
            {todo.text}
          </span>
          <span style={{ fontSize: "10px", color: "#aaa", marginTop: "2px" }}>
            Tạo lúc: {todo.createdAt}
          </span>
        </div>
      )}

      <div style={{ display: "flex", gap: "5px" }}>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            style={{
              background: "#f39c12",
              color: "white",
              border: "none",
              padding: "6px 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            ✏️
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          style={{
            background: "#e74c3c",
            color: "white",
            border: "none",
            padding: "6px 10px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          🗑
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
