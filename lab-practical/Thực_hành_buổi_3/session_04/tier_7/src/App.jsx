import { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";
import TodoFilter from "./components/TodoFilter";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("react_todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("react_todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    if (inputValue.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      done: false,
      createdAt: new Date().toLocaleString(),
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      addTodo();
    }
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function updateTodo(id, newText) {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)),
    );
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.done;
    if (filter === "completed") return todo.done;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.done).length;
  const completedCount = todos.filter((todo) => todo.done).length;
  const totalCount = todos.length;

  const placeholderText =
    filter === "completed"
      ? "Tìm/nhập công việc đã xong..."
      : filter === "active"
        ? "Nhập việc cần làm gấp..."
        : "Nhập công việc mới...";

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        background: "#fff",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333", marginBottom: "25px" }}>
        📋 Todo List
      </h1>

      <div style={{ display: "flex", marginBottom: "20px" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholderText}
          style={{
            flex: 1,
            padding: "12px",
            fontSize: "16px",
            border: "2px solid #ddd",
            borderRadius: "4px 0 0 4px",
            outline: "none",
          }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            background: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "0 4px 4px 0",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Thêm
        </button>
      </div>

      <TodoFilter filter={filter} setFilter={setFilter} />

      {filteredTodos.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "#999",
            border: "1px dashed #eee",
            borderRadius: "4px",
          }}
        >
          {todos.length === 0
            ? "📝 Chưa có công việc nào"
            : "Không tìm thấy công việc phù hợp"}
        </div>
      ) : (
        filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
        ))
      )}

      {todos.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
            padding: "12px",
            background: "#f9f9f9",
            borderRadius: "4px",
            fontSize: "0.9em",
            color: "#555",
          }}
        >
          <span>
            Tổng số: <strong>{totalCount}</strong> việc
          </span>
          <span>
            Chưa xong: <strong>{activeCount}</strong>
          </span>
          {completedCount > 0 && (
            <span style={{ color: "#27ae60" }}>
              Đã xong: <strong>{completedCount}</strong>
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
