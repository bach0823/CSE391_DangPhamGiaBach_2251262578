import { useState } from "react";

function UpdateItem() {
  const [items, setItems] = useState([
    { id: 1, name: "Minh", age: 20 },
    { id: 2, name: "An", age: 21 },
    { id: 3, name: "Linh", age: 19 },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function startEdit(item) {
    setEditingId(item.id);
    setEditName(item.name);
    setEditAge(item.age.toString());
  }

  function saveEdit() {
    if (editName.trim() === "") {
      alert("Tên không được để trống!");
      return;
    }
    if (editAge === "" || parseInt(editAge) <= 0) {
      alert("Tuổi phải lớn hơn 0!");
      return;
    }

    setItems(
      items.map((item) =>
        item.id === editingId
          ? { ...item, name: editName.trim(), age: parseInt(editAge) }
          : item,
      ),
    );

    setSuccessMessage(`Đã lưu thành công thông tin của ${editName.trim()}!`);
    setEditingId(null);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") saveEdit();
    if (event.key === "Escape") cancelEdit();
  }

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "450px",
        margin: "0 auto",
      }}
    >
      <h2>Sửa thông tin</h2>

      {successMessage && (
        <div
          style={{
            padding: "10px",
            background: "#d4edda",
            color: "#155724",
            border: "1px solid #c3e6cb",
            borderRadius: "4px",
            marginBottom: "15px",
            fontWeight: "bold",
          }}
        >
          ✅ {successMessage}
        </div>
      )}

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            padding: "10px",
            margin: "10px 0",
            background: "#f9f9f9",
            border: "1px solid #eee",
            borderRadius: "6px",
          }}
        >
          {editingId === item.id ? (
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus
                style={{
                  padding: "6px",
                  border: "2px solid #007bff",
                  outline: "none",
                  boxShadow: "0 0 5px rgba(0,123,255,0.3)",
                  borderRadius: "4px",
                  flex: 2,
                }}
              />
              <input
                type="number"
                value={editAge}
                onChange={(e) => setEditAge(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{
                  padding: "6px",
                  border: "2px solid #007bff",
                  outline: "none",
                  boxShadow: "0 0 5px rgba(0,123,255,0.3)",
                  borderRadius: "4px",
                  width: "60px",
                }}
              />
              <button
                onClick={saveEdit}
                style={{
                  background: "#27ae60",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                ✓ Lưu
              </button>
              <button
                onClick={cancelEdit}
                style={{
                  background: "#95a5a6",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                ✕ Hủy
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                {item.name} - {item.age} tuổi
              </span>
              <button
                onClick={() => startEdit(item)}
                style={{
                  background: "#3498db",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                ✏️ Sửa
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default UpdateItem;
