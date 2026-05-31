import { useState } from "react";

function BooleanState() {
  const [isVisible, setIsVisible] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isLightOn, setIsLightOn] = useState(false);

  const themeStyle = {
    backgroundColor: isDarkMode ? "#222" : "#fff",
    color: isDarkMode ? "#fff" : "#333",
    padding: "20px",
    minHeight: "100vh",
    transition: "all 0.3s ease",
    fontFamily: "Arial, sans-serif",
  };

  return (
    <div style={themeStyle}>
      <h2>Toggle Demo & Challenges</h2>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? "Ẩn nội dung mẫu" : "Hiện nội dung mẫu"}
        </button>
        {isVisible && (
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              border: "1px solid #ddd",
            }}
          >
            <p>Đây là nội dung mẫu có thể ẩn/hiện!</p>
          </div>
        )}
      </div>

      <hr />

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <button onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
        <button onClick={() => setIsLiked(!isLiked)}>
          {isLiked ? "❤️ Đã thích" : "🤍 Thích"}
        </button>
      </div>

      <hr />

      <div style={{ margin: "20px 0" }}>
        <h3>Thử thách 1: Hiện/Ẩn mật khẩu</h3>
        <div style={{ display: "flex", maxWidth: "300px" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu..."
            style={{ padding: "8px", flex: 1, color: "#333" }}
          />
          <button onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Ẩn" : "Hiện"}
          </button>
        </div>
      </div>

      <hr />

      <div style={{ margin: "20px 0", maxWidth: "450px" }}>
        <h3>Thử thách 2: Accordion (Hỏi & Đáp)</h3>
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "6px",
            overflow: "hidden",
          }}
        >
          <div
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            style={{
              padding: "12px",
              background: isDarkMode ? "#333" : "#f1f1f1",
              cursor: "pointer",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "space-between",
              userSelect: "none",
            }}
          >
            <span>React useState là gì?</span>
            <span>{isAccordionOpen ? "➖" : "➕"}</span>
          </div>
          {isAccordionOpen && (
            <div
              style={{
                padding: "12px",
                borderTop: "1px solid #ccc",
                lineHeight: "1.5",
              }}
            >
              useState là một Hook trong React cho phép bạn thêm trạng thái
              (state) vào các Functional Component. Khi giá trị của state thay
              đổi, React sẽ tự động cập nhật và render lại UI.
            </div>
          )}
        </div>
      </div>

      <hr />

      <div style={{ margin: "20px 0", textAlign: "center", maxWidth: "200px" }}>
        <h3>Thử thách 3: Bật/Tắt bóng đèn</h3>
        <div
          style={{
            fontSize: "60px",
            margin: "10px 0",
            filter: isLightOn ? "drop-shadow(0 0 15px yellow)" : "none",
            transition: "filter 0.3s",
          }}
        >
          {isLightOn ? "💡" : "⚫"}
        </div>
        <button
          onClick={() => setIsLightOn(!isLightOn)}
          style={{
            padding: "8px 16px",
            backgroundColor: isLightOn ? "#ffc107" : "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {isLightOn ? "TẮT ĐÈN" : "BẬT ĐÈN"}
        </button>
      </div>
    </div>
  );
}

export default BooleanState;
