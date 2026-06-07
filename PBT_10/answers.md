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


---

### Câu A3 (5đ) — Promise States

Vẽ sơ đồ 3 trạng thái của Promise (`Pending → Fulfilled`, `Pending → Rejected`).

Giải thích: Callback Hell là gì? Viết ví dụ 4 cấp callback hell → Refactor thành async/await.

1. Sơ đồ 3 trạng thái của Promise:
- Pending -> Fulfilled (Thành công) hoặc Rejected (Thất bại)

2. Trả lời:
- Callback Hell: Là việc lồng quá nhiều hàm callback vào nhau khiến code bị thụt lề sâu, rất khó đọc và khó sửa lỗi.
- Ví dụ 4 cấp:
```javascript
a(function() {
    b(function() {
        c(function() {
            d(function() {
                console.log("xong");
            });
        });
    });
});
```
- Refactor thành async/await:
```javascript
async function chay() {
    try {
        await a();
        await b();
        await c();
        await d();
    } catch (e) {
        console.log(e);
    }
}
```
---

## PHẦN C — PHÂN TÍCH (20 điểm)

### Câu C1 (10đ) — Error Handling Strategy  

1. **Network errors** (mất mạng giữa chừng)

Khi mất mạng, `fetch()` sẽ throw `TypeError` thay vì trả về HTTP response. Dùng `try/catch` để bắt:

```javascript
async function fetchData(url) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    if (err instanceof TypeError) {
      alert("Mất kết nối mạng!");
    }
    throw err;
  }
}
```

2. **API errors** (server trả 500, 404, 429 Too Many Requests)  

Tuỳ status code xử lý khác nhau:
- **404**: không tìm thấy tài nguyên → hiển thị thông báo, không retry
- **429**: quá nhiều request → đọc header `Retry-After`, chờ rồi gọi lại
- **500**: lỗi server → thông báo chung cho user, log lại để debug

```javascript
async function callApi(url) {
  const res = await fetch(url);
  if (res.ok) return res.json();

  if (res.status === 404) {
    showMessage("Không tìm thấy sản phẩm");
  } else if (res.status === 429) {
    const wait = res.headers.get("Retry-After") || 3;
    await new Promise(r => setTimeout(r, wait * 1000));
    return callApi(url);
  } else if (res.status === 500) {
    showMessage("Lỗi hệ thống, thử lại sau");
  }

  throw new Error(`HTTP ${res.status}`);
}
```

3. **Timeout** (API chậm > 10 giây)  

Dùng `Promise.race` giữa `fetch` thật và một timeout promise. Nếu `fetch` chậm hơn `ms` ms thì timeout reject trước:

```javascript
function fetchWithTimeout(url, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), ms)
  );
  return Promise.race([fetch(url), timeout]);
}
```

4. **Retry logic** (thử lại 3 lần nếu lỗi network)  

Mỗi lần retry chờ thêm (1s → 2s → 3s) để tránh spam server. Chỉ retry khi lỗi network, không retry lỗi 4xx:

```javascript
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 1; i <= maxRetries; i++) {
    try {
      return await fetch(url);
    } catch (err) {
      if (i === maxRetries) throw new Error("Đã thử 3 lần nhưng thất bại");
      await new Promise(r => setTimeout(r, 1000 * i));
    }
  }
}
```

### Câu C2 (10đ) — Promise.all vs Promise.allSettled vs Promise.race

| Method | Khi nào resolve? | Khi nào reject? | Use case |
|--------|-----------------|-----------------|----------|
| `.all()` | Tất cả resolve | Có 1 cái reject | Load nhiều API bắt buộc cùng lúc |
| `.allSettled()` | Tất cả hoàn thành (kể cả lỗi) | Không bao giờ | Gửi thông báo nhiều kênh |
| `.race()` | Cái đầu tiên xong | Cái đầu tiên reject | Timeout |
| `.any()` | Có 1 cái resolve | Tất cả đều reject | Thử nhiều CDN, lấy cái nào nhanh nhất |

**`Promise.all` — load trang chi tiết sản phẩm**

Cần đủ cả 3 API mới render được trang, thiếu 1 cái là vô nghĩa nên nếu 1 cái lỗi thì catch hết:

```javascript
const [product, reviews, related] = await Promise.all([
  fetch(`/api/products/${id}`).then(r => r.json()),
  fetch(`/api/products/${id}/reviews`).then(r => r.json()),
  fetch(`/api/products/${id}/related`).then(r => r.json()),
]);
```

**`Promise.allSettled` — gửi thông báo sau khi đặt hàng**

Email/SMS/Push độc lập nhau, 1 cái lỗi không ảnh hưởng cái kia, cần biết kết quả từng kênh:

```javascript
const results = await Promise.allSettled([
  sendEmail(userId),
  sendSMS(userId),
  sendPush(userId),
]);

results.forEach((r, i) => {
  if (r.status === "rejected")
    console.log(`Gửi ${["email", "sms", "push"][i]} thất bại`);
});
```

**`Promise.race` — timeout API thanh toán**

Không để user chờ quá 8 giây, nếu API chậm hơn thì reject timeout trước:

```javascript
const result = await Promise.race([
  fetch("/api/payment", { method: "POST", body: JSON.stringify(data) }),
  new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 8000))
]);
```

**`Promise.any` — tải ảnh từ nhiều CDN**

Khác `race` ở: ignore các cái bị lỗi, chỉ cần 1 cái thành công là đủ. Chỉ throw khi tất cả đều thất bại:

```javascript
const res = await Promise.any([
  fetch("https://cdn1.example.com/img/abc.jpg"),
  fetch("https://cdn2.example.com/img/abc.jpg"),
  fetch("https://cdn3.example.com/img/abc.jpg"),
]);
```

## 🎬 PHẦN D — VIDEO THỰC HÀNH OBS (25 điểm)

https://youtu.be/zvDVZlFVVA4