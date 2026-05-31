import { useState } from "react";

function MultipleStates() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [isStudent, setIsStudent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    if (name.trim() === "" || age === "" || email.trim() === "") {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const ageNum = Number(age);
    if (ageNum <= 0 || ageNum >= 100) {
      alert("Tuổi phải lớn hơn 0 và nhỏ hơn 100!");
      return;
    }

    setSubmitted(true);
  }

  function handleReset() {
    setName("");
    setAge("");
    setEmail("");
    setIsStudent(false);
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
      }}
    >
      <h2>Form đăng ký</h2>

      {!submitted ? (
        <div>
          <div style={{ marginBottom: "10px" }}>
            <label>Tên: </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
                marginTop: "5px",
              }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Email: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
                marginTop: "5px",
              }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Tuổi: </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
                marginTop: "5px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <input
                type="checkbox"
                checked={isStudent}
                onChange={(e) => setIsStudent(e.target.checked)}
              />
              Là sinh viên
            </label>
          </div>

          <button
            onClick={handleSubmit}
            style={{
              padding: "10px 15px",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Đăng ký
          </button>
        </div>
      ) : (
        <div
          style={{
            background: "#d4edda",
            padding: "15px",
            borderRadius: "4px",
            color: "#155724",
          }}
        >
          <h3>✅ Xin chào {name}!</h3>
          <p>Đăng ký thành công tài khoản của bạn.</p>
          <hr />
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Tuổi:</strong> {age}
          </p>
          <p>
            <strong>Sinh viên:</strong> {isStudent ? "Có" : "Không"}
          </p>
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
            Đăng ký lại
          </button>
        </div>
      )}
    </div>
  );
}

export default MultipleStates;
