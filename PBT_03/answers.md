## PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)

### Câu A1 (5đ) — 3 Cách nhúng CSS

Inline:

```
- VD: <h1 style="font-size: 32px;">Tiêu đề</h1>
- Ưu điểm:
      - Áp dụng ngay lập tức, không cần file riêng
      - Độ ưu tiên cao nhất (chỉ sau !important)
      - Hữu ích khi debug, override tạm thời
- Nhược điểm:
      - Khó tái sử dụng, khó bảo trì
      - Trộn lẫn HTML và CSS, làm code rối, khó đọc
      - Mỗi lần load trang là phải load luôn inline css
- Khi nào nên dùng: Chỉ dùng khi khẩn cấp / override tạm thời
```

Internal:

```
- VD:
'''html
<head>
    <style>
        body{font-family: sans-serif}
    </style>
</head>
'''
- Ưu điểm:
      - Có thể quản lý cùng lúc nhiều element trong 1 trang
- Nhược điểm:
      - Không thể tái sử dụng ở trang khác
      - Vẫn phải tốn thời gian load css mỗi khi load trang
- Khi nào nên dùng: Khi làm prototype hoặc trang đơn.
```

External:

```
- VD:
'''html
<head>
  <link rel="stylesheet" href="styles.css" />
</head>
'''
'''css
/* styles.css */
body {
  font-family: sans-serif;
}
'''
- Ưu điểm:
      - Tái sử dụng trên nhiều trang HTML, cực kỳ phù hợp khi làm trên nhiều file html
      - Dễ bảo trì do tách biệt HTML và CSS
      - Về mặt caching: Browser cache được file CSS, từ lần sau không cần tải lại CSS nữa
- Nhược điểm:
      - Cần nhớ nơi đặt file CSS
- Khi nào nên dùng: Dùng cho mọi dự án thật
```

```
**Câu hỏi thêm:** Nếu cùng 1 element có cả 3 cách CSS đồng thời áp dụng, cách nào "thắng"? Giải thích tại sao.
- Nếu không xét trường hợp sử dụng !important. Inline sẽ thắng vì nó có độ ưu tiên cao nhất trong cả 3 cách.
```

### Câu A2 (8đ) — CSS Selectors — Dự đoán kết quả

Cho HTML sau:

```html
<div id="app">
  <header class="top-bar dark">
    <h1>ShopTLU</h1>
    <nav>
      <a href="/" class="active">Home</a>
      <a href="/products">Products</a>
      <a href="/about">About</a>
    </nav>
  </header>
  <main>
    <article class="product">
      <h2>iPhone 16</h2>
      <p class="price">25.990.000đ</p>
      <p>Mô tả sản phẩm...</p>
    </article>
    <article class="product featured">
      <h2>MacBook Pro</h2>
      <p class="price">45.990.000đ</p>
      <p>Mô tả sản phẩm...</p>
    </article>
  </main>
</div>
```

**Không chạy code**, cho biết mỗi selector sau chọn được element nào? (Ghi cụ thể text content)

```css
1. h1
→ Chọn: <h1>ShopTLU</h1>
2. .price
→ Chọn: <p class="price">25.990.000đ</p>; <p class="price">45.990.000đ</p>
3. #app header
→ Chọn:
'''
<header class="top-bar dark">
        <h1>ShopTLU</h1>
        <nav>
            <a href="/" class="active">Home</a>
            <a href="/products">Products</a>
            <a href="/about">About</a>
        </nav>
    </header>
'''
4. nav a:first-child
→ Chọn: <a href="/" class="active">Home</a>
5. .product.featured h2
→ Chọn: <h2>MacBook Pro</h2>
6. article > p
→ Chọn: <p class="price">25.990.000đ</p>; <p>Mô tả sản phẩm...</p>; <p class="price">45.990.000đ</p>; <p>Mô tả sản phẩm...</p>
7. a[href="/"]
→ Chọn: <a href="/" class="active">Home</a>
8. .top-bar.dark h1
→ Chọn: <h1>ShopTLU</h1>
```

![kết quả selectors_test.html](./screenshots/Screenshot_Bai_A2.png)

### Câu A3 (7đ) — Box Model — Tính toán kích thước

Đọc chương 11 (Box Model). Tính **kích thước thực tế** (chiều rộng thực tế render trên browser) cho mỗi trường hợp sau:

```css
/* Trường hợp 1: content-box (mặc định) */
.box-1 {
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
→ Chiều rộng hiển thị = 400 + 20*2 + 5*2 = 450px
→ Không gian chiếm trên trang = 450 + 10*2 = 570px

/* Trường hợp 2: border-box */
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
→ Chiều rộng hiển thị = 400px
→ Kích thước content thực tế = 400 - 20*2 - 5*2 = 350px
→ Không gian chiếm trên trang = 400 + 10*2 = 470px

/* Trường hợp 3: Margin collapse */
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
→ Khoảng cách giữa box-a và box-b = max(25,40) = 40px
→ Giải thích tại sao KHÔNG PHẢI 65px: Vì đây là margin collapse, nên margin dọc giữa 2 block sẽ gộp lại.
```

**Nâng cao:** Nếu `.box-a` có `margin-bottom: -10px` và `.box-b` có `margin-top: 40px`, khoảng cách = 30. Vì box-a có margin-bottom âm nên box-b được kéo lên

### Câu A4 (5đ) — Specificity (Độ ưu tiên)

Cho các CSS rules sau cùng target 1 element `<p class="price" id="main-price">`:

```css
p {
  color: black;
} /* Rule A */
.price {
  color: blue;
} /* Rule B */
#main-price {
  color: red;
} /* Rule C */
p.price {
  color: green;
} /* Rule D */
```

1. Tính specificity score (a, b, c) cho mỗi rule
   | Selector | A(ID #) | B(Class .) | C(Tag) | Tổng |
   |---|---|---|---|---|
   | Rule A| 0 | 0 | 1 | 1 |
   | Rule B | 0 | 1 | 0 | 10 |
   | Rule C | 1 | 0 | 0 | 100 |
   | Rule D | 0 | 1 | 1 | 11 |
2. Element sẽ có màu `red`, vì Rule C có điểm specificity cao nhất (100)
3. Nếu thêm `<p class="price" id="main-price" style="color: orange;">`, element sẽ có màu `orange`, vì thẻ <p> đang sử dụng nhúng CSS Inline có 1000+ điểm specificity
4. Nếu Rule A thêm `!important`, element có màu `black`, vì !important giúp Rule A có vô hạn diểm specificity
