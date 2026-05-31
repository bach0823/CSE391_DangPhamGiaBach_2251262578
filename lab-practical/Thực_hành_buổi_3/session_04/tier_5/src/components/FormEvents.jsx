import { useState } from "react";

function FormEvents() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    confirmPassword: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    let currentErrors = { ...errors };

    if (name === "email") {
      if (value !== "" && !value.includes("@")) {
        currentErrors.email = "Email phải có ký tự @";
      } else {
        currentErrors.email = "";
      }
    }

    if (name === "password" || name === "confirmPassword") {
      const passwordVal = name === "password" ? value : formData.password;
      const confirmVal =
        name === "confirmPassword" ? value : formData.confirmPassword;

      if (
        passwordVal !== "" &&
        confirmVal !== "" &&
        passwordVal !== confirmVal
      ) {
        currentErrors.confirmPassword = "Mật khẩu xác nhận không trùng khớp";
      } else {
        currentErrors.confirmPassword = "";
      }
    }

    setErrors(currentErrors);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.confirmPassword === ""
    ) {
      alert("Vui lòng nhập đầy đủ các trường thông tin bắt buộc!");
      return;
    }

    if (errors.email || errors.confirmPassword) {
      alert("Vui lòng sửa các lỗi trước khi gửi!");
      return;
    }

    setSubmitted(true);
  }

  function handleReset() {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      message: "",
    });
    setErrors({ email: "", confirmPassword: "" });
    setSubmitted(false);
  }

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "400px",
        margin: "20px auto",
        border: "1px solid #ddd",
        borderRadius: "8px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>Form Events & Challenges</h2>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontWeight: "bold" }}>
              Tên *
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
                marginTop: "4px",
              }}
              required
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontWeight: "bold" }}>
              Email *
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
                marginTop: "4px",
                borderColor: errors.email ? "red" : "#ccc",
              }}
              required
            />
            {errors.email && (
              <p
                style={{ color: "red", fontSize: "0.85em", margin: "4px 0 0" }}
              >
                {errors.email}
              </p>
            )}
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontWeight: "bold" }}>
              Mật khẩu *
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
                marginTop: "4px",
              }}
              required
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontWeight: "bold" }}>
              Xác nhận mật khẩu *
            </label>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
                marginTop: "4px",
                borderColor: errors.confirmPassword ? "red" : "#ccc",
              }}
              required
            />
            {errors.confirmPassword && (
              <p
                style={{ color: "red", fontSize: "0.85em", margin: "4px 0 0" }}
              >
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", fontWeight: "bold" }}>
              Tin nhắn
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
                marginTop: "4px",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: "10px",
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Gửi
            </button>
            <button
              type="button"
              onClick={handleReset}
              style={{
                padding: "10px 15px",
                background: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Xóa
            </button>
          </div>
        </form>
      ) : (
        <div
          style={{
            background: "#d4edda",
            padding: "15px",
            borderRadius: "4px",
            color: "#155724",
          }}
        >
          <h3>✅ Đã gửi thành công!</h3>
          <p>
            <strong>Tên:</strong> {formData.name}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Mật khẩu:</strong> ••••••••
          </p>
          {formData.message && (
            <p>
              <strong>Tin nhắn:</strong> {formData.message}
            </p>
          )}
          <button
            onClick={handleReset}
            style={{
              marginTop: "10px",
              padding: "8px 12px",
              background: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Gửi lại
          </button>
        </div>
      )}
    </div>
  );
}

export default FormEvents;
