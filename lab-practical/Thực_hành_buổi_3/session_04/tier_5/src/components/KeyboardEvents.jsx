import { useState } from "react";

function KeyboardEvents() {
  const [lastKey, setLastKey] = useState("");
  const [log, setLog] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const keysList = ["a", "b", "c", "d", "s", "w", "r", "t"];
  const [targetKey, setTargetKey] = useState("a");
  const [gameStatus, setGameStatus] = useState("Bấm đúng phím để thắng!");
  const [score, setScore] = useState(0);

  const [boxPos, setBoxPos] = useState({ x: 60, y: 60 });
  const [bgColor, setBgColor] = useState("#ffffff");

  function handleKeyDown(event) {
    setLastKey(event.key);
    setLog((prev) => [...prev.slice(-4), event.key]);

    if (event.key.toLowerCase() === targetKey) {
      setScore((prev) => prev + 1);
      setGameStatus("Chính xác!");
      const nextKey = keysList[Math.floor(Math.random() * keysList.length)];
      setTargetKey(nextKey);
    } else if (keysList.includes(event.key.toLowerCase())) {
      setGameStatus("Sai rồi! Hãy thử lại.");
    }

    if (event.key === "ArrowUp") {
      setBoxPos((prev) => ({ ...prev, y: Math.max(0, prev.y - 10) }));
    } else if (event.key === "ArrowDown") {
      setBoxPos((prev) => ({ ...prev, y: Math.min(110, prev.y + 10) }));
    } else if (event.key === "ArrowLeft") {
      setBoxPos((prev) => ({ ...prev, x: Math.max(0, prev.x - 10) }));
    } else if (event.key === "ArrowRight") {
      setBoxPos((prev) => ({ ...prev, x: Math.min(110, prev.x + 10) }));
    }

    if (event.ctrlKey && event.key.toLowerCase() === "d") {
      event.preventDefault();
      const colors = [
        "#ffcccc",
        "#ccffcc",
        "#ccccff",
        "#ffffcc",
        "#ffccff",
        "#ccffff",
      ];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setBgColor(randomColor);
    }
  }

  function handleInputKeyDown(event) {
    if (event.key === "Enter") {
      if (inputValue.trim() !== "") {
        alert("Bạn nhập: " + inputValue);
        setInputValue("");
      }
    }
    if (event.key === "Escape") {
      setInputValue("");
    }
  }

  return (
    <div
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: bgColor,
        minHeight: "100vh",
        outline: "none",
      }}
    >
      <h2>Keyboard Events & Challenges</h2>
      <p style={{ fontSize: "0.9em", color: "#666" }}>
        Nhấp chuột vào một khoảng trống trên trang trước khi thực hành các thử
        thách bàn phím.
      </p>

      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          background: "rgba(255,255,255,0.8)",
        }}
      >
        <p>
          Phím cuối cùng: <strong>{lastKey || "Chưa nhấn"}</strong>
        </p>
        <p>Log: {log.join(" → ")}</p>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Nhập rồi nhấn Enter..."
          style={{ padding: "8px", width: "250px" }}
        />
      </div>

      <hr />

      <div
        style={{
          margin: "20px 0",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          background: "rgba(255,255,255,0.8)",
        }}
      >
        <h3>Thử thách 1: Game đoán phím</h3>
        <p>
          Hãy nhấn phím này:{" "}
          <strong style={{ fontSize: "24px", color: "#ff4d4f" }}>
            {targetKey.toUpperCase()}
          </strong>
        </p>
        <p>
          Trạng thái: <strong>{gameStatus}</strong>
        </p>
        <p>
          Điểm số: <strong>{score}</strong>
        </p>
      </div>

      <hr />

      <div style={{ margin: "20px 0" }}>
        <h3>Thử thách 2: Di chuyển ô vuông (Phím mũi tên)</h3>
        <div
          style={{
            position: "relative",
            width: "130px",
            height: "130px",
            border: "2px solid #ccc",
            background: "#f0f0f0",
            borderRadius: "4px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: boxPos.y + "px",
              left: boxPos.x + "px",
              width: "20px",
              height: "20px",
              backgroundColor: "#1890ff",
              borderRadius: "2px",
              transition: "all 0.1s ease",
            }}
          />
        </div>
      </div>

      <hr />

      <div style={{ margin: "20px 0" }}>
        <h3>Thử thách 3: Phím tắt Ctrl+D</h3>
        <p>
          Nhấn tổ hợp phím <strong>Ctrl + D</strong> để đổi màu nền trang ngẫu
          nhiên.
        </p>
      </div>
    </div>
  );
}

export default KeyboardEvents;
