import { useState, useRef } from "react";

function CreateItem() {
  const [items, setItems] = useState([
    { id: 1, name: "HTML" },
    { id: 2, name: "CSS" },
  ]);
  const [newName, setNewName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const inputRef = useRef(null);

  function handleAdd() {
    if (newName.trim() === "") {
      alert("Tên môn học không được để trống!");
      return;
    }

    const newItem = {
      id: Date.now(),
      name: newName.trim(),
    };

    setItems([...items, newItem]);
    setNewName("");
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleAdd();
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Thêm môn học</h2>

      <div style={{ marginBottom: "15px" }}>
        <input
          ref={inputRef}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Nhập tên môn học..."
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <button
          onClick={handleAdd}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          ➕ Thêm
        </button>
      </div>

      {showSuccess && (
        <div
          style={{ color: "green", marginBottom: "15px", fontWeight: "bold" }}
        >
          ✅ Đã thêm thành công!
        </div>
      )}

      <h3>Danh sách ({items.length} môn):</h3>
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            padding: "8px",
            borderBottom: "1px solid #eee",
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}

export default CreateItem;
