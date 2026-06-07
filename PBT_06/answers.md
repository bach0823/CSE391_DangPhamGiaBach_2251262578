### PHẦN A — ĐỌC HIỂU (20 điểm)

#### Câu A1 (10đ) — Grid System

Đọc tài liệu Grid System. Không chạy code, vẽ layout cho HTML sau ở 3 kích thước:

```html
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6 col-lg-3">Box 1</div>
    <div class="col-12 col-md-6 col-lg-3">Box 2</div>
    <div class="col-12 col-md-6 col-lg-3">Box 3</div>
    <div class="col-12 col-md-6 col-lg-3">Box 4</div>
  </div>
</div>
```

| Kích thước | < 768px                                  | 768px - 991px                      | ≥ 992px                         |
| ---------- | ---------------------------------------- | ---------------------------------- | ------------------------------- |
| Số cột     | 1                                        | 2                                  | 4                               |
| Box layout | [Box 1]<br>[Box 2]<br>[Box 3]<br>[Box 4] | [Box 1] [Box 2]<br>[Box 3] [Box 4] | [Box 1] [Box 2] [Box 3] [Box 4] |

**Câu hỏi thêm:** `col-md-6` nghĩa là gì: Có nghĩa là từ chiều rộng viewport là 768px trở đi cột sẽ có chiều dài chiếm 6/12 phần chiều rộng. Tại sao không cần viết `col-sm-12`: vì đã có col-12, nó có nghĩa là mặc định cột sẽ chiếm toàn bộ chiều rộng viewport

#### Câu A2 (10đ) — Utilities & Components

1. Giải thích class `d-none d-md-block`. Element này hiển thị khi nào, ẩn khi nào?

- Element hiển thị ở `display: block` khi đạt viewport rộng tối thiểu 768px, còn mặc định sẽ ẩn đi do `d-none` (`display:none`)

2. Liệt kê 5 spacing utilities (margin/padding) và giải thích. VD: `mt-3`, `px-4`, `mb-auto`

- `mb-1`: căn lề bên dưới 0.25rem.
- `pt-2`: căn lề trong bên trên 0.5rem;
- `ps-4`: căn lề trong bên trái 1.5rem.
- `me-3`: căn lề bên phải 1rem.
- `mx-auto`: Tự động căn giữa theo chiều ngang.

3. Sự khác nhau giữa `.container`, `.container-fluid`, `.container-md`

- `.container`: Có `max-width tự thay đổi theo breakpoint`, căn giữa theo cha. cho nội dung text, form.
- `.container-fluid`: Luôn `100% width` ở mọi kích thước màn hình. Dùng cho hero/footer/banner.
- `.container-md`: khi chưa đạt breakpoint md: hoạt động như `.container-fluid`, khi đạt breakpoint md: hoạt động như `.container`.

---

### PHẦN C — PHÂN TÍCH (20 điểm)

#### Câu C1 (10đ) — Tùy biến Bootstrap

**1. Quy trình đổi màu `$primary` sang `#E63946`:**
* **Công cụ cần:** Node.js (npm) và trình biên dịch `SASS`.
* **Quy trình:**
  - Khởi tạo npm, cài `bootstrap` và `sass`.
  - Tạo file `custom.scss`.
  - Khai báo `$primary: #E63946;` **trước** dòng `@import "bootstrap/scss/bootstrap";` (do Bootstrap sử dụng `!default` nên phải khai báo trước để ghi đè).
  - Biên dịch file `.scss` thành `.css` rồi link file CSS đó vào HTML.

**2. Tại sao nên dùng SASS variables thay vì override CSS trực tiếp:**
- Màu `$primary` liên quan đến rất nhiều class khác (button hover/active state, outline buttons, `.text-primary`, `.bg-primary`, `.border-primary`, link, badge, focus ring của form...).
- Override trực tiếp bằng CSS sẽ rất tốn công viết đè thủ công từng class, dễ bị sót và không đồng bộ. Dùng SASS variable sẽ tự động cập nhật đồng bộ cho toàn bộ hệ thống.

---

#### Câu C2 (10đ) — So sánh (với CSS thuần đã làm ở PBT trước)

- **Số dòng CSS cần viết:** CSS thuần mất khoảng 80 - 100 dòng (cho flexbox, media queries, hover, checkbox hack navbar). Bootstrap mất 0 dòng.
- **Thời gian phát triển:** CSS thuần mất 1 - 2 tiếng để viết và test responsive. Bootstrap chỉ mất 5 - 10 phút để ghép class vào HTML.
- **Khả năng tùy biến:** CSS thuần tùy biến tự do 100%. Bootstrap khó tùy biến sâu nếu dùng CDN (dễ bị đụng style mặc định), nhưng rất dễ nếu dùng SASS.
- **Khi nào NÊN dùng:** Các dự án cần làm nhanh (MVP, admin dashboard, landing page), hoặc khi làm việc nhóm cần chuẩn chung để dễ bảo trì.
- **Khi nào KHÔNG NÊN dùng:** Các trang web có thiết kế độc lạ hoàn toàn, ứng dụng cần tối ưu hiệu năng/dung lượng tải trang tối đa, hoặc khi đang học CSS căn bản.

## 🎬 PHẦN D — VIDEO THỰC HÀNH OBS (25 điểm)

https://youtu.be/ujyAfsbnOC8