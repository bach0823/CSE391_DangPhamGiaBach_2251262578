## PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

### Câu A1 (5đ) — DOM Tree

1. Vẽ DOM tree (sơ đồ cây) cho HTML trên:
```
div#app
├── header
│   ├── h1
│   │   └── "Todo App"
│   └── nav
│       ├── a.active
│       │   └── "All"
│       ├── a
│       │   └── "Active"
│       └── a
│           └── "Completed"
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button
    │       └── "Add"
    └── ul#todoList
        ├── li.todo-item
        │   └── "Learn HTML"
        └── li.todo-item.completed
            └── "Learn CSS"
```

2. Viết querySelector cho mỗi yêu cầu:
- Chọn thẻ `<h1>`:
`document.querySelector("h1");`
- Chọn input trong form:
`document.querySelector("#todoForm input");` (hoặc `document.querySelector("#todoInput");`)
- Chọn tất cả `.todo-item`:
`document.querySelectorAll(".todo-item");`
- Chọn link đang active:
`document.querySelector("nav a.active");`
- Chọn `<li>` đầu tiên trong `#todoList`:
`document.querySelector("#todoList li");`
- Chọn tất cả `<a>` bên trong `<nav>`:
`document.querySelectorAll("nav a");`

---

### Câu A2 (5đ) — innerHTML vs textContent

Giải thích sự khác nhau và ví dụ khi nào dùng mỗi cái:
- innerHTML lấy hoặc thiết lập mã HTML bên trong element. Khi ghi đè, trình duyệt sẽ parse chuỗi sang các thẻ HTML thật. Dùng khi cần chèn cấu trúc thẻ động như danh sách.
- textContent lấy hoặc thiết lập nội dung chữ thuần (plain text). Mọi ký tự HTML truyền vào đều được hiển thị dạng chữ chứ không được parse. Dùng khi chỉ cần hiển thị text đơn giản, an toàn cho trang web.

Câu hỏi bảo mật: Tại sao innerHTML có thể gây lỗ hổng XSS? Ví dụ và cách sửa.
- Giải thích: Do innerHTML cho phép parse chuỗi nhập từ người dùng thành HTML. Nếu kẻ tấn công nhập các thẻ script hoặc thẻ img chứa mã độc như onerror, trình duyệt sẽ tự động chạy đoạn script đó.

Cách sửa code:
```javascript
// Thay vì dùng innerHTML, ta dùng textContent để chuỗi nhập vào chỉ hiển thị dạng chữ thuần
const userInput = document.querySelector("#search").value;
document.querySelector("#result").textContent = userInput;
```

### Câu A3 (5đ) — Event Bubbling

Dự đoán thứ tự console.log:

Khi click vào button:
Output:
```text
BUTTON
INNER
OUTER
```

Nếu uncomment `e.stopPropagation()`, output thay đổi thế nào:
Output:
```text
BUTTON
```
(Vì stopPropagation() ngăn chặn sự kiện nổi bọt lên các lớp cha của nút).

---

## PHẦN C — DEBUG & PHÂN TÍCH (15 điểm)

### Câu C1 (8đ) — Debug DOM Code

Các lỗi tìm thấy trong đoạn code và cách khắc phục:

1. Lỗi sự kiện click ở nút decrementBtn: Dòng `addEventListener("onclick", ...)` dùng sai tên sự kiện `"onclick"`. Khi đăng ký sự kiện bằng addEventListener thì bỏ tiền tố "on". Sửa thành `"click"`.
2. Lỗi gán đè biến hằng số countDisplay ở nút resetBtn: Dòng `countDisplay = count;` cố tình gán lại giá trị cho hằng số countDisplay dẫn đến lỗi trình duyệt. Sửa thành `countDisplay.innerHTML = count;`.
3. Dùng sai giá trị null cho innerHTML ở nút resetBtn: Dòng `historyList.innerHTML = null;` không đúng chuẩn gán giá trị HTML. Sửa thành chuỗi rỗng `historyList.innerHTML = "";`.
4. Gọi phương thức remove không có dấu ngoặc ở nút clearHistory: Dòng `item.remove;` chỉ tham chiếu đến hàm chứ không thực thi. Sửa thành `item.remove();`.
5. Ép sai kiểu dữ liệu khi lấy count từ localStorage: Dòng `count = localStorage.getItem("count");` gán chuỗi hoặc null cho biến count, làm sai phép tính cộng trừ tiếp theo. Sửa thành `count = parseInt(localStorage.getItem("count")) || 0;`.
6. Mất sự kiện click của các thẻ li khi khôi phục từ localStorage: Đoạn code cũ gán sự kiện click trực tiếp cho từng thẻ li lúc tạo ra. Khi tải lại trang, historyList được khôi phục trực tiếp qua innerHTML nên toàn bộ sự kiện click trên các thẻ li cũ bị biến mất. Khắc phục bằng cách dùng Event Delegation gắn sự kiện click cho thẻ cha historyList.
7. Thiếu khôi phục lịch sử khi load trang: Sự kiện load chỉ khôi phục count hiển thị lên giao diện nhưng bỏ qua lịch sử historyList. Cần thêm dòng khôi phục innerHTML cho historyList.

Code hoàn chỉnh sau khi sửa:

```javascript
// App: Counter with history
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = 0;

// Dung event delegation cho the cha de tranh mat su kien khi load tu localStorage
historyList.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        deleteHistory(e.target);
    }
});

document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.innerHTML = count;
    
    // Luu history
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    historyList.append(li);
});

document.querySelector("#decrementBtn").addEventListener("click", function() {
    count--;
    countDisplay.innerHTML = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay.innerHTML = count;
    historyList.innerHTML = "";
});

function deleteHistory(element) {
    element.parentNode.removeChild(element);
}

// Clear all history
document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        item.remove();
    });
});

// Save to localStorage
window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

// Load from localStorage
window.addEventListener("load", () => {
    count = parseInt(localStorage.getItem("count")) || 0;
    countDisplay.textContent = count;
    historyList.innerHTML = localStorage.getItem("history") || "";
});
```


---

### Câu C2 (7đ) — Performance

1. Giải thích: Tại sao bind event lên 1000 elements riêng lẻ là **BAD PRACTICE**? Event Delegation giải quyết thế nào?

- Tại sao bind event lên 1000 elements là BAD PRACTICE:
  + Tốn bộ nhớ: Trình duyệt phải tạo ra và lưu trữ 1000 event listener riêng biệt trong bộ nhớ RAM. Nếu số lượng phần tử tăng lên nhiều hơn, trang web sẽ bị chậm và lag do tiêu tốn tài nguyên.
  + Khó quản lý khi thay đổi DOM: Khi thêm phần tử mới hoặc vẽ lại giao diện (render), ta lại phải viết code gán lại sự kiện cho các phần tử mới tạo, rất dễ gây ra lỗi nếu quên.

- Event Delegation giải quyết thế nào:
  + Thay vì gán sự kiện cho từng thẻ con, ta chỉ gán đúng 1 sự kiện duy nhất lên thẻ cha lớn nhất (ví dụ ul, ol hoặc thẻ div bao ngoài).
  + Nhờ cơ chế nổi bọt (Event Bubbling) của trình duyệt, khi người dùng click vào bất kỳ thẻ con nào, sự kiện sẽ tự động nổi bọt truyền lên thẻ cha.
  + Tại thẻ cha, ta chỉ cần sử dụng đối tượng sự kiện (e.g., e.target) để kiểm tra xem thẻ con nào vừa được click và xử lý hành động tương ứng. Cách này tiết kiệm bộ nhớ và không sợ bị mất sự kiện khi render lại danh sách.

2. Cho code:
```javascript
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    document.body.appendChild(div);   // ← 1000 lần reflow!
}
```
Refactor dùng **DocumentFragment** để chỉ gây 1 lần reflow. Giải thích tại sao nhanh hơn.

Code refactor:
```javascript
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);
}
document.body.appendChild(fragment);
```

Giải thích:
- Với đoạn code cũ, mỗi lần gọi appendChild trực tiếp vào document.body là một lần trình duyệt phải tính toán lại kích thước, vị trí các phần tử trên trang (gây ra 1000 lần reflow và vẽ lại màn hình repaint), làm CPU bị quá tải và chậm đi rõ rệt.
- Với đoạn code mới, ta gom hết 1000 thẻ div vào DocumentFragment (đóng vai trò là một DOM ảo nằm tạm thời trong bộ nhớ cache). Khi gán fragment này vào document.body ở dòng cuối cùng, trình duyệt chỉ phải thực hiện tính toán layout và vẽ lại màn hình đúng 1 lần duy nhất cho toàn bộ danh sách, giúp tăng tốc độ xử lý lên rất nhiều.
