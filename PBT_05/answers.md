## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

### Câu A1 (5đ) — Viewport & Mobile-First

1. Viết chính xác thẻ `<meta viewport>` chuẩn. Giải thích từng thuộc tính.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

`<meta name="viewport"/>`: khai báo cho trình duyệt biết đây là thiết lập liên quan đến khung hình hiển thị (viewport).  
`content`: Chứa các thông tin cấu hình liên quan.  
`width=device-width`: đặt chiều rộng của trang web bằng chiều rộng màn hình thiết bị.  
`initial-scale=1.0`: tỉ lệ kích cỡ giữa các element ban đầu với khi hiển thị trên màn hình là bằng nhau (1:1).

2. Nếu THIẾU thẻ này, iPhone sẽ hiển thị trang web như thế nào? (Đọc chương 13):  
   Thiếu viewport meta tag → mobile browser sẽ giả định view hiện tại rộng ~980px (desktop width) → khi scale toàn bộ xuống thì chữ nhỏ xíu, không readable.

3. Mobile-First và Desktop-First khác nhau thế nào? Viết ví dụ CSS cho mỗi cách với breakpoint 768px. Tại sao Mobile-First được khuyên dùng?  
   Cách 1: Mobile-First: dùng `@media (min-width:)` => "từ kích thước này trở lên"

```css
/* Code cho mobile trước (không cần @media) */
.product-grid {
  grid-template-columns: 1fr; /* 1 cột trên mobile */
}

/* desktop */
@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr); /* 4 cột cho desktop */
  }
}
```

Cách 2: Desktop-First: dùng `@media (max-width:)` => "từ kích thước này trở xuống"

```css
.product-grid {
  grid-template-columns: repeat(4, 1fr); /* 4 cột trên desktop*/
}

/* mobile */
@media (max-width: 768px) {
  /* 1 cột trên mobile */
}
```

Lý do Mobile-First tốt hơn:

- Mobile tải ít CSS hơn (mobile chỉ tải mobile styles, không download desktop styles), thời gian load ít nhất, trải nghiệm người dùng tốt hơn
- Buộc người tạo trang web phải ưu tiên nội dung quan trọng trước (content thinking): Màn hình nhỏ => không gian ít => buộc phải quyết định cái gì quan trọng nhất hiển thị trước.
- Google và performance tools đánh giá cao hơn: 60% người dùng trên điện thoại, trang load nhanh hơn, ranking tốt hơn

### Câu A2 (5đ) — Breakpoints

Ghi lại breakpoints chuẩn (theo tài liệu hoặc Bootstrap). Cho mỗi breakpoint:

- Kích thước pixel
- Thiết bị đại diện
- Ví dụ: lưới sản phẩm nên hiển thị mấy cột?

  | Tên            | Width    | Thiết bị đại diện             | Số cột |
  | -------------- | -------- | ----------------------------- | ------ |
  | **Mobile**     | < 576px  | iPhone SE, các điện thoại nhỏ | 1      |
  | **Mobile L**   | ≥ 576px  | iPhone Plus, điện thoại ngang | 2      |
  | **Tablet**     | ≥ 768px  | iPad dọc, tablet              | 2      |
  | **Desktop**    | ≥ 992px  | Laptop nhỏ                    | 2      |
  | **Desktop L**  | ≥ 1200px | Desktop, laptop lớn           | 3      |
  | **Desktop XL** | ≥ 1400px | Màn hình 4K, ultrawide        | 4      |

### Câu A3 (5đ) — Media Queries

Giả định `*{box-sizing: border-box;}`, nếu `box-sizing: content-box;` thì width cộng thêm 20px do tính thêm padding

| Chiều rộng màn hình | `.container` width |
| ------------------- | ------------------ |
| 375px (iPhone SE)   | 375px              |
| 600px               | 540px              |
| 800px               | 720px              |
| 1000px              | 960px              |
| 1400px              | 1140px             |

### Câu A4 (5đ) — SCSS Basics

Đọc chương 16. Giải thích 4 tính năng chính của SCSS và cho ví dụ:

1. Variables (`$primary-color`)
2. Nesting (viết CSS lồng nhau)
3. Mixins (`@mixin`, `@include`)
4. `@extend` / Inheritance

Tại sao trình duyệt KHÔNG đọc được file `.scss`? Cần bước gì để chuyển SCSS → CSS?

---
