import { useState } from "react";

function InputEvents() {
  const [text, setText] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [email, setEmail] = useState("");

  function handleChange(event) {
    const newValue = event.target.value;
    setText(newValue);
    setCharCount(newValue.length);
  }

  const trimmedText = text.trim();
  const wordCount = trimmedText === "" ? 0 : trimmedText.split(/\s+/).length;
  const isEmailValid = email.includes("@");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Input Events & Challenges</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          value={text}
          onChange={handleChange}
          placeholder="Nhập gì đó..."
          maxLength={100}
          style={{ padding: "8px", width: "300px" }}
        />
        <p>Ký tự: {charCount}/100</p>

        {charCount > 80 && <p style={{ color: "red" }}>⚠️ Sắp hết ký tự!</p>}
      </div>

      <hr />

      <div style={{ margin: "20px 0" }}>
        <h3>Thử thách 1: Ô nhập email với validation</h3>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập địa chỉ email..."
          style={{ padding: "8px", width: "300px" }}
        />
        {email && (
          <p
            style={{ color: isEmailValid ? "green" : "red", marginTop: "5px" }}
          >
            {isEmailValid
              ? "✅ Email hợp lệ (có chứa @)"
              : "❌ Email không hợp lệ (thiếu ký tự @)"}
          </p>
        )}
      </div>

      <hr />

      <div style={{ margin: "20px 0" }}>
        <h3>Thử thách 2: Hiển thị preview</h3>
        <div
          style={{
            padding: "10px",
            background: "#f9f9f9",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        >
          <strong>Nội dung xem trước: </strong>
          {text ? (
            <span>{text}</span>
          ) : (
            <span style={{ color: "#aaa" }}>(chưa nhập nội dung)</span>
          )}
        </div>
      </div>

      <hr />

      <div style={{ margin: "20px 0" }}>
        <h3>Thử thách 3: Đếm số từ</h3>
        <p>
          Số từ hiện tại: <strong>{wordCount}</strong> từ
        </p>
      </div>
    </div>
  );
}

export default InputEvents;
