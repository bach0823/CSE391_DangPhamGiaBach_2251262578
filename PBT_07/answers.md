## PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)

### Câu A1 (5đ) — var / let / const

Đọc chương 03. **Không chạy code**, dự đoán output cho từng đoạn:

```javascript
// Đoạn 1
console.log(x);
var x = 5;

// Đoạn 2
console.log(y);
let y = 10;

// Đoạn 3
const z = 15;
z = 20;
console.log(z);

// Đoạn 4
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);

// Đoạn 5
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);
}
console.log("Ngoài block:", a);
```

Ghi dự đoán → Tạo file `var_let_const.js`, chạy → So sánh. Giải thích các kết quả bất ngờ.

Dự đoán và giải thích:
- Đoạn 1: undefined. var có cơ chế hoisting đưa khai báo biến lên đầu phạm vi nhưng chưa gán giá trị.
- Đoạn 2: Lỗi ReferenceError. let bị hoisting nhưng nằm trong Temporal Dead Zone (TDZ), không được phép truy cập trước dòng khai báo.
- Đoạn 3: Lỗi TypeError. z khai báo bằng const là hằng số nên không thể gán lại giá trị mới.
- Đoạn 4: [1, 2, 3, 4]. const chỉ khóa tham chiếu của mảng chứ không cấm chỉnh sửa phần tử bên trong mảng.
- Đoạn 5: 
  Trong block: 2
  Ngoài block: 1
  let có block scope nên biến a trong block độc lập với biến a ngoài block.

### Câu A2 (5đ) — Data Types & Coercion

Không chạy code, dự đoán kết quả:

```javascript
console.log(typeof null);              // ???
console.log(typeof undefined);         // ???
console.log(typeof NaN);              // ???
console.log("5" + 3);                 // ???
console.log("5" - 3);                 // ???
console.log("5" * "3");              // ???
console.log(true + true);            // ???
console.log([] + []);                // ???
console.log([] + {});                // ???
console.log({} + []);                // ???
```

Sau khi trả lời, chạy code kiểm tra. Giải thích **tại sao** `"5" + 3` và `"5" - 3` cho kết quả khác nhau.

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
- Phép cộng + ưu tiên nối chuỗi nếu có một toán hạng là string, nên 3 được chuyển thành "3" và ghép với "5" thành "53".
- Phép trừ - chỉ dùng cho tính toán số học nên JS ép kiểu chuỗi "5" thành số 5 và thực hiện 5 - 3 = 2.

### Câu A3 (5đ) — So sánh == vs ===

Dự đoán `true` hay `false`:

```javascript
console.log(5 == "5");                // ???
console.log(5 === "5");               // ???
console.log(null == undefined);       // ???
console.log(null === undefined);      // ???
console.log(NaN == NaN);             // ???
console.log(0 == false);             // ???
console.log(0 === false);            // ???
console.log("" == false);            // ???
```

**Quy tắc:** Từ giờ trở đi, bạn nên dùng `==` hay `===`? Tại sao?

Dự đoán:
- 5 == "5": true
- 5 === "5": false
- null == undefined: true
- null === undefined: false
- NaN == NaN: false
- 0 == false: true
- 0 === false: false
- "" == false: true

Quy tắc: Nên dùng === vì nó so sánh cả giá trị và kiểu dữ liệu mà không ép kiểu tự động, giúp tránh lỗi logic ngầm khó phát hiện.

### Câu A4 (5đ) — Truthy & Falsy

Liệt kê TẤT CẢ giá trị Falsy trong JavaScript (đọc tài liệu). Sau đó dự đoán kết quả:

```javascript
if ("0") console.log("A");           // In hay không?
if ("") console.log("B");            // In hay không?
if ([]) console.log("C");            // In hay không?
if ({}) console.log("D");            // In hay không?
if (null) console.log("E");          // In hay không?
if (0) console.log("F");             // In hay không?
if (-1) console.log("G");            // In hay không?
if (" ") console.log("H");           // In hay không? (space)
```

Các giá trị Falsy trong JS: false, 0, -0, 0n, "", null, undefined, NaN.

Dự đoán in ra:
- "0": In (chuỗi không rỗng là truthy)
- "": Không in (chuỗi rỗng là falsy)
- []: In (mảng là truthy)
- {}: In (đối tượng là truthy)
- null: Không in (falsy)
- 0: Không in (falsy)
- -1: In (số khác 0 là truthy)
- " ": In (chuỗi chứa khoảng trắng là truthy)

### Câu A5 (5đ) — Template Literals

Viết lại 3 cách nối chuỗi sau bằng **template literal** (backtick):

```javascript
// Cách 1:
var greeting = "Xin chào " + name + "! Bạn " + age + " tuổi.";

// Cách 2:
var url = "https://api.example.com/users/" + userId + "/orders?page=" + page;

// Cách 3:
var html = "<div class=\"card\">" +
    "<h2>" + title + "</h2>" +
    "<p>" + description + "</p>" +
    "<span>Giá: " + price + "đ</span>" +
    "</div>";
```

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

---

## PHẦN C — SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Debug JavaScript

Tìm và sửa TẤT CẢ lỗi trong code sau (có ít nhất 6 lỗi):  

Các lỗi trong code:
1. Lỗi phép gán "=" trong câu lệnh "if (giaSauGiam = 0)". Cách sửa: chuyển thành so sánh "=== 0".
2. Lỗi dùng "var i = 0" trong vòng lặp for kết hợp với setTimeout. var không có block scope nên khi callback chạy thì i đã bằng 5, làm in ra 5 lần "Item 5". Cách sửa: đổi var thành let.
3. Lỗi truyền kiểu chuỗi cho giaBan ở dòng "tinhGiaGiamGia("100000", 20)". Cách sửa: đổi thành truyền số 100000.
4. Lỗi khai báo lẫn lộn giữa var giamGia và let giaSauGiam. Cách sửa: chuyển hết sang let hoặc const.
5. Hàm không kiểm tra kiểu dữ liệu đầu vào (nếu truyền chuỗi không phải số sẽ bị NaN). Cách sửa: check typeof của giaBan và phanTramGiam ở đầu hàm.
6. Thiếu dấu chấm phẩy ";" kết thúc dòng ở nhiều câu lệnh.

Code sửa lại:
```javascript
function tinhGiaGiamGia(giaBan, phanTramGiam) {
    if (typeof giaBan !== "number" || typeof phanTramGiam !== "number") {
        return "Lỗi: Đầu vào phải là số";
    }
    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ";
    }
    
    const giamGia = giaBan * phanTramGiam / 100;
    const giaSauGiam = giaBan - giamGia;
    
    if (giaSauGiam === 0) {
        console.log("Sản phẩm miễn phí!");
    }
    
    return giaSauGiam;
}

// Test
const gia = tinhGiaGiamGia(100000, 20);
console.log("Giá sau giảm: " + gia + "đ");

const gia2 = tinhGiaGiamGia(50000, 110);
console.log("Giá: " + gia2);

for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i);
    }, 1000);
}
```


### Câu C2 (10đ) — Bài toán thực tế
[Bài làm ở đây](./restaurant_bill.js)

## 🎬 PHẦN D — VIDEO THỰC HÀNH OBS (25 điểm)

https://youtu.be/lKRO0ZmLhKM