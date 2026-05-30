function SimpleVariables() {
  // Các biến JavaScript
  const hientai = new Date().getHours();
  const ten = "Nguyễn Văn Minh";
  const tuoi = 20;
  const quequan = "Hà Nội";
  const laSinhVien = true;
  const monHoc = ["HTML", "CSS", "JS", "React"];
  const canNang = 70;
  const chieuCao = 1.7;

  return (
    <div style={{ padding: "20px" }}>
      <h4>Bài 2.1</h4>
      <h1>
        Chào buổi {hientai < 12 ? "sáng" : hientai < 18 ? "chiều" : "tối"} ,
        {ten}!
      </h1>
      <p>Tuổi: {tuoi}</p>
      <p>Quê quán: {quequan}</p>
      <p>Sinh viên: {laSinhVien ? "Có" : "Không"}</p>
      <p>Chiều cao: {chieuCao}m</p>
      <p>Cân nặng: {canNang}kg</p>
      <p>BMI: {(canNang / (chieuCao * chieuCao)).toFixed(4)}</p>

      <h2>Môn học yêu thích:</h2>
      <p>{monHoc.join(", ")}</p>
    </div>
  );
}

export default SimpleVariables;
