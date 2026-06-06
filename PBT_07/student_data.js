const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

// 1. Tính điểm trung bình và 2. Xếp loại
for (let i = 0; i < students.length; i++) {
    let student = students[i];
    let avg = student.math * 0.4 + student.physics * 0.3 + student.cs * 0.3;
    student.avg = Number(avg.toFixed(2));

    let grade = "";
    if (student.avg >= 8.0) {
        grade = "Giỏi";
    } else if (student.avg >= 6.5) {
        grade = "Khá";
    } else if (student.avg >= 5.0) {
        grade = "Trung bình";
    } else {
        grade = "Yếu";
    }
    student.grade = grade;
}

// 3. In bảng kết quả
console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");
for (let i = 0; i < students.length; i++) {
    let s = students[i];
    let stt = String(i + 1).padEnd(3, ' ');
    let name = s.name.padEnd(6, ' ');
    let avg = String(s.avg).padEnd(4, ' ');
    let grade = s.grade.padEnd(11, ' ');
    console.log(`| ${stt} | ${name} | ${avg} | ${grade} |`);
}

// 4. Đếm số SV mỗi xếp loại
let gradeCount = { "Giỏi": 0, "Khá": 0, "Trung bình": 0, "Yếu": 0 };
for (let i = 0; i < students.length; i++) {
    gradeCount[students[i].grade]++;
}
console.log("\n4. Số SV mỗi xếp loại:");
console.log(gradeCount);

// 5. Tìm SV có điểm TB cao nhất và thấp nhất
let maxStudent = students[0];
let minStudent = students[0];
for (let i = 1; i < students.length; i++) {
    if (students[i].avg > maxStudent.avg) {
        maxStudent = students[i];
    }
    if (students[i].avg < minStudent.avg) {
        minStudent = students[i];
    }
}
console.log("\n5. Sinh viên có điểm TB cao nhất:", maxStudent.name, `(${maxStudent.avg})`);
console.log("   Sinh viên có điểm TB thấp nhất:", minStudent.name, `(${minStudent.avg})`);

// 6. Tính điểm TB toàn lớp cho từng môn
let sumMath = 0, sumPhysics = 0, sumCs = 0;
for (let i = 0; i < students.length; i++) {
    sumMath += students[i].math;
    sumPhysics += students[i].physics;
    sumCs += students[i].cs;
}
let avgMath = sumMath / students.length;
let avgPhysics = sumPhysics / students.length;
let avgCs = sumCs / students.length;
console.log("\n6. Điểm TB toàn lớp từng môn:");
console.log(`   Toán: ${avgMath.toFixed(2)}, Lý: ${avgPhysics.toFixed(2)}, CS: ${avgCs.toFixed(2)}`);

// 7. Bonus: Tính điểm TB theo giới tính
let sumMaleAvg = 0, countMale = 0;
let sumFemaleAvg = 0, countFemale = 0;
for (let i = 0; i < students.length; i++) {
    if (students[i].gender === "M") {
        sumMaleAvg += students[i].avg;
        countMale++;
    } else if (students[i].gender === "F") {
        sumFemaleAvg += students[i].avg;
        countFemale++;
    }
}

let avgMale = countMale > 0 ? sumMaleAvg / countMale : 0;
let avgFemale = countFemale > 0 ? sumFemaleAvg / countFemale : 0;

console.log("\n7. Điểm TB theo giới tính:");
console.log(`   Nam (M): ${avgMale.toFixed(2)}`);
console.log(`   Nữ (F): ${avgFemale.toFixed(2)}`);
