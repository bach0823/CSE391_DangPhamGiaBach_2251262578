import { useState, useRef } from "react";

function DeleteItem() {
  const [items, setItems] = useState([
    { id: 1, name: "Minh" },
    { id: 2, name: "An" },
    { id: 3, name: "Linh" },
  ]);

  const [lastDeletedItem, setLastDeletedItem] = useState(null);
  const [lastDeletedIndex, setLastDeletedIndex] = useState(null);
  const [showUndo, setShowUndo] = useState(false);
  const undoTimeoutRef = useRef(null);

  function handleDelete(id) {
    const itemToDelete = items.find((item) => item.id === id);
    if (!itemToDelete) return;

    if (!window.confirm(`Bạn có chắc chắn muốn xóa ${itemToDelete.name}?`)) {
      return;
    }

    const index = items.findIndex((item) => item.id === id);
    setLastDeletedItem(itemToDelete);
    setLastDeletedIndex(index);
    setItems(items.filter((item) => item.id !== id));
    setShowUndo(true);

    if (undoTimeoutRef.current) {
      clearTimeout(undoTimeoutRef.current);
    }

    undoTimeoutRef.current = setTimeout(() => {
      setShowUndo(false);
      setLastDeletedItem(null);
      setLastDeletedIndex(null);
    }, 5000);
  }

  function handleUndo() {
    if (lastDeletedItem === null || lastDeletedIndex === null) return;

    const updatedItems = [...items];
    updatedItems.splice(lastDeletedIndex, 0, lastDeletedItem);
    setItems(updatedItems);

    setShowUndo(false);
    setLastDeletedItem(null);
    setLastDeletedIndex(null);

    if (undoTimeoutRef.current) {
      clearTimeout(undoTimeoutRef.current);
    }
  }

  function handleDeleteAll() {
    if (window.confirm("Xóa tất cả?")) {
      setItems([]);
      setShowUndo(false);
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Xóa sinh viên</h2>

      {items.length > 0 && (
        <button
          onClick={handleDeleteAll}
          style={{
            marginBottom: "10px",
            background: "#e74c3c",
            color: "white",
            padding: "8px 16px",
            border: "none",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          🗑 Xóa tất cả
        </button>
      )}

      {showUndo && lastDeletedItem && (
        <div
          style={{
            background: "#fff3cd",
            color: "#856404",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "4px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #ffeeba",
          }}
        >
          <span>Đã xóa {lastDeletedItem.name}</span>
          <button
            onClick={handleUndo}
            style={{
              background: "#856404",
              color: "white",
              border: "none",
              padding: "4px 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Hoàn tác
          </button>
        </div>
      )}

      {items.length === 0 ? (
        <p style={{ color: "#999" }}>Danh sách trống</p>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              margin: "5px 0",
              background: "#f9f9f9",
              border: "1px solid #eee",
              borderRadius: "4px",
            }}
          >
            <span>{item.name}</span>
            <button
              onClick={() => handleDelete(item.id)}
              style={{
                background: "#e74c3c",
                color: "white",
                border: "none",
                padding: "6px 12px",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              Xóa
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default DeleteItem;
