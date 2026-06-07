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

