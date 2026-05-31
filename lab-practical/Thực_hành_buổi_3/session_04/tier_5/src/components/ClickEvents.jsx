import { useState } from "react";

function ClickEvents() {
  const [message, setMessage] = useState("Chưa click");
  const [clickCount, setClickCount] = useState(0);
  const [bgColor, setBgColor] = useState("#f0f0f0");
  const [btn1Count, setBtn1Count] = useState(0);
  const [btn2Count, setBtn2Count] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  function handleClick() {
    setMessage("Đã click lúc " + new Date().toLocaleTimeString());
    setClickCount(clickCount + 1);
  }

  function handleReset() {
    setMessage("Đã reset!");
    setClickCount(0);
  }

  function handleRandomColor() {
    const randomColor =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    setBgColor(randomColor);
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Click Events & Challenges</h2>

      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "4px",
        }}
      >
        <p>{message}</p>
        <p>Số lần click: {clickCount}</p>
        <button onClick={handleClick} style={{ marginRight: "10px" }}>
          Click me!
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <hr />

      <div style={{ margin: "20px 0" }}>
        <h3>Thử thách 1: Đổi màu ngẫu nhiên</h3>
        <button onClick={handleRandomColor}>Đổi màu ngẫu nhiên</button>
        <div
          style={{
            width: "150px",
            height: "80px",
            backgroundColor: bgColor,
            marginTop: "10px",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #ccc",
            transition: "background-color 0.3s ease",
          }}
        >
          {bgColor}
        </div>
      </div>

      <hr />

      <div style={{ margin: "20px 0" }}>
        <h3>Thử thách 2: Đếm số lần click riêng biệt</h3>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setBtn1Count(btn1Count + 1)}>
            Nút A (Đã click: {btn1Count})
          </button>
          <button onClick={() => setBtn2Count(btn2Count + 1)}>
            Nút B (Đã click: {btn2Count})
          </button>
        </div>
      </div>

      <hr />

      <div style={{ margin: "20px 0" }}>
        <h3>Thử thách 3: Nút Like toggle</h3>
        <button
          onClick={() => setIsLiked(!isLiked)}
          style={{
            padding: "8px 16px",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "20px",
            border: "1px solid #ccc",
            backgroundColor: isLiked ? "#ffe6e6" : "#fff",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <span>{isLiked ? "❤️" : "🤍"}</span>
          <span>{isLiked ? "Đã thích" : "Thích"}</span>
        </button>
      </div>
    </div>
  );
}

export default ClickEvents;
