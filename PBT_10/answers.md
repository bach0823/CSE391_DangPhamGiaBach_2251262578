## PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

### Câu A1 (5đ) — Sync vs Async

1. Thứ tự output:
```text
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms
```

2. Giải thích cơ chế:

- Call Stack: Chạy các lệnh đồng bộ trực tiếp (in ra 1 và 4 trước).
- Microtask Queue: Chứa các callback của Promise (in ra 3 và 6). Trình duyệt luôn ưu tiên chạy hết Microtask Queue trước khi chuyển qua Macrotask.
- Macrotask Queue: Chứa callback của setTimeout (in ra 2, 7 và 5). Chỉ được chạy khi Microtask Queue đã trống.
- Event Loop: Bộ điều phối, kiểm tra nếu Call Stack trống thì lôi tác vụ trong Microtask ra chạy trước, sau đó mới chạy từng tác vụ trong Macrotask.

---

### Câu A2 (5đ) — Fetch API

Giải thích từng dòng code:

```javascript
async function getData() {
    try {
        const response = await fetch("https://api.example.com/data");
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed:", error.message);
        return null;
    }
}
```

Giải thích:  
- `async function getData() {`: Khai báo hàm bất đồng bộ.
- `try {`: Khối thử lỗi.
- `const response = await fetch("https://api.example.com/data");`: Gọi API và đợi lấy phản hồi.
- `if (!response.ok) {`: Kiểm tra nếu phản hồi lỗi.
- `throw new Error(`HTTP ${response.status}`);`: Tự ném ra lỗi nếu status code sai.
- `}`: Hết khối if.
- `const data = await response.json();`: Đợi chuyển đổi dữ liệu phản hồi sang JSON.
- `return data;`: Trả về dữ liệu thành công.
- `} catch (error) {`: Khối xử lý lỗi.
- `console.error("Failed:", error.message);`: In ra lỗi.
- `return null;`: Trả về null khi xảy ra lỗi.
- `}`: Kết thúc hàm.

Trả lời câu hỏi:

1. `await fetch(...)` — `fetch` trả về gì? Tại sao cần `await`?
- fetch trả về một Promise chứa đối tượng Response. Cần dùng await để đợi cho Promise được giải quyết (resolved) để nhận được dữ liệu Response thật.

2. `response.ok` — Khi nào `false`? Liệt kê 3 status codes tương ứng.
- response.ok trả về false khi mã trạng thái HTTP nằm ngoài khoảng 200-299. Ví dụ 3 mã tương ứng: 400 (Yêu cầu lỗi), 404 (Không tìm thấy), 500 (Lỗi hệ thống).

3. `response.json()` — Tại sao cần `await` lần nữa?
- Vì việc đọc và giải nén dữ liệu từ body của Response thành định dạng JSON là thao tác bất đồng bộ (trả về một Promise). Cần await để đợi quá trình parse hoàn tất.

4. `try...catch` — Catch những lỗi gì? (Network error? 404? JSON parse error?)
- Bắt được các lỗi: lỗi mạng (network error không kết nối được), lỗi throw thủ công khi !response.ok (ví dụ lỗi 404, 500 do code chủ động ném ra), và lỗi cú pháp JSON (JSON parse error khi phản hồi không đúng cấu trúc JSON).

