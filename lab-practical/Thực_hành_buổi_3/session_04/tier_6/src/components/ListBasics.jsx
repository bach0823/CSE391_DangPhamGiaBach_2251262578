import { useState } from "react";

function ListBasics() {
  const [fruits] = useState(["Táo", "Chuối", "Cam", "Nho"]);

  const [students] = useState([
    { id: 1, name: "Minh", age: 20 },
    { id: 2, name: "An", age: 21 },
    { id: 3, name: "Linh", age: 19 },
  ]);

  const totalAge = students.reduce((sum, student) => sum + student.age, 0);
  const averageAge =
    students.length > 0 ? (totalAge / students.length).toFixed(1) : 0;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Danh sách trái cây</h2>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>

      <h2>Danh sách sinh viên</h2>
      {students.map((student, index) => {
        const isOlderThan20 = student.age >= 20;
        return (
          <div
            key={student.id}
            style={{
              padding: "8px",
              margin: "5px 0",
              background: "#f9f9f9",
              color: isOlderThan20 ? "green" : "black",
              fontWeight: isOlderThan20 ? "bold" : "normal",
              borderRadius: "4px",
            }}
          >
            {index + 1}. {student.name} - {student.age} tuổi
          </div>
        );
      })}

      <div
        style={{
          marginTop: "15px",
          padding: "10px",
          background: "#e6f7ff",
          borderRadius: "4px",
          display: "inline-block",
        }}
      >
        <strong>Tuổi trung bình của sinh viên:</strong> {averageAge} tuổi
      </div>
    </div>
  );
}

export default ListBasics;
