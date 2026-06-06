### PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)

#### Câu A1 (5đ) — var / let / const

Dự đoán kết quả:
- Đoạn 1: undefined. Giải thích: var được hoist lên đầu scope nhưng chưa có giá trị.
- Đoạn 2: Lỗi ReferenceError. Giải thích: let bị hoist nhưng nằm trong Temporal Dead Zone (TDZ), không được gọi trước khi khai báo.
- Đoạn 3: Lỗi TypeError. Giải thích: Hằng số const không thể gán lại giá trị mới.
- Đoạn 4: [1, 2, 3, 4]. Giải thích: const chỉ khóa tham chiếu của mảng chứ không cấm chỉnh sửa phần tử bên trong.
- Đoạn 5:
  Trong block: 2
  Ngoài block: 1
  Giải thích: let có block scope nên a trong khối và a ngoài khối độc lập với nhau.

#### Câu A2 (5đ) — Data Types & Coercion

Dự đoán:
- typeof null: "object"
- typeof undefined: "undefined"
- typeof NaN: "number"
- "5" + 3: "53"
- "5" - 3: 2
- "5" * "3": 15
- true + true: 2
- [] + []: ""
- [] + {}: "[object Object]"
- {} + []: "[object Object]"

Giải thích "5" + 3 và "5" - 3 khác nhau:
- Toán tử + ưu tiên nối chuỗi khi gặp kiểu string, nên 3 được chuyển thành "3" và ghép với "5" thành "53".
- Toán tử - ép kiểu các toán hạng về number để làm phép tính toán học, nên "5" chuyển thành 5 và lấy 5 - 3 = 2.

#### Câu A3 (5đ) — So sánh == vs ===

Dự đoán:
- 5 == "5": true
- 5 === "5": false
- null == undefined: true
- null === undefined: false
- NaN == NaN: false
- 0 == false: true
- 0 === false: false
- "" == false: true

Quy tắc: Nên dùng === vì nó so sánh chính xác cả giá trị lẫn kiểu dữ liệu mà không tự động ép kiểu ẩn, tránh các lỗi logic khó tìm.

#### Câu A4 (5đ) — Truthy & Falsy

Các giá trị Falsy trong JS: false, 0, -0, 0n, "", null, undefined, NaN.

Dự đoán in ra:
- "0": In (chuỗi không rỗng là truthy)
- "": Không in (chuỗi rỗng là falsy)
- []: In (mảng là truthy)
- {}: In (object là truthy)
- null: Không in (falsy)
- 0: Không in (falsy)
- -1: In (số khác 0 là truthy)
- " ": In (chuỗi chứa dấu cách là truthy)

#### Câu A5 (5đ) — Template Literals

Cách 1:
```javascript
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
```

Cách 2:
```javascript
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;
```

Cách 3:
```javascript
var html = `<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>`;
```
