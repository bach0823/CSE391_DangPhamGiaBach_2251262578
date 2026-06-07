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
