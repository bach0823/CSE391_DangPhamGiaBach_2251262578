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
