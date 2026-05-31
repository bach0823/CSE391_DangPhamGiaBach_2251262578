import { useState } from "react";

function StringState() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isEmailValid = email.includes("@");

  return (
    <div
      style={{
        padding: "25px",
        maxWidth: "450px",
        margin: "20px auto",
        border: "1px solid #ddd",
        borderRadius: "8px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ borderBottom: "2px solid #007bff", paddingBottom: "10px" }}>
        Nhập thông tin
      </h2>

      {/* Thử thách 1 */}
      <div style={{ marginBottom: "15px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label>
            <strong>Tên:</strong>
          </label>
          <span
            style={{
              fontSize: "0.85em",
              color: name.length >= 100 ? "red" : "#666",
            }}
          >
            {name.length}/100 ký tự
          </span>
        </div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên..."
          maxLength={100}
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "5px",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Thử thách 2 */}
      <div style={{ marginBottom: "15px" }}>
        <label>
          <strong>Email:</strong>
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập email..."
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "5px",
            boxSizing: "border-box",
          }}
        />
        {email && (
          <div style={{ marginTop: "5px", fontSize: "0.85em" }}>
            {isEmailValid ? (
              <span style={{ color: "green" }}>
                ✅ Email hợp lệ (có chứa @)
              </span>
            ) : (
              <span style={{ color: "red" }}>
                ❌ Email không hợp lệ (thiếu ký tự @)
              </span>
            )}
          </div>
        )}
      </div>

      {/* Thử thách 3 */}
      <div style={{ marginBottom: "20px" }}>
        <label>
          <strong>Mật khẩu:</strong>
        </label>
        <div style={{ display: "flex", marginTop: "5px" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu..."
            style={{ flex: 1, padding: "8px", boxSizing: "border-box" }}
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            style={{
              padding: "8px 12px",
              cursor: "pointer",
              background: "#eee",
              border: "1px solid #ccc",
              borderLeft: "none",
            }}
          >
            {showPassword ? "👁️ Ẩn" : "👁️‍🗨️ Hiện"}
          </button>
        </div>
      </div>

      <h3 style={{ borderTop: "1px solid #eee", paddingTop: "15px" }}>
        Thông tin đã nhập:
      </h3>
      <p>Tên: {name || <em style={{ color: "#aaa" }}>(chưa nhập)</em>}</p>
      <p>Email: {email || <em style={{ color: "#aaa" }}>(chưa nhập)</em>}</p>
      <p>
        Mật khẩu:{" "}
        {password ? "••••••••" : <em style={{ color: "#aaa" }}>(chưa nhập)</em>}
      </p>

      {name && (
        <div
          style={{
            background: "#e6f7ff",
            padding: "12px",
            borderRadius: "4px",
            borderLeft: "4px solid #1890ff",
            marginTop: "15px",
          }}
        >
          Xin chào <strong>{name}</strong>!{" "}
          {email && `Email của bạn là: ${email}`}
        </div>
      )}
    </div>
  );
}

export default StringState;
