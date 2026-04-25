## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

### Câu A1 (5đ) — HTTP & Browser

Đọc chương 01 (`01_introduction_html_universe.md`), trả lời:

1. Khi bạn gõ `https://shopee.vn` vào trình duyệt và nhấn Enter, hãy liệt kê **đúng thứ tự** ít nhất 5 bước xảy ra (từ DNS lookup đến render).

```
   1. Request xuất phát từ PC thông qua router Wifi ở nhà
   2. Request đi đến nhà cung cấp mạng (Viettel) rồi chạy xuyên cáp quang dưới đáy đại dương
   3. Request sau đó tới hệ thống máy chủ của shopee
   4. Server xử lý: "user này muốn xem gian hàng"
   5. Response chạy ngược lại: cáp quang -> nhà mạng -> router -> PC
   6. Trình duyệt nhận reponse gồm HTML, CSS, JS -> render ra giao diện trang chủ của shopee
   (tham khảo: 01_introduction_html_universe.md + Cuộc Hành Trình 0.3 Giây Xuyên Đại Dương)
```

2. Trong DevTools của Chrome, tab **Network** cho thấy thông tin gì? Hãy mở một trang web bất kỳ, chụp screenshot tab Network và **đánh dấu** (vẽ mũi tên/khoanh tròn) vào:
   - Status Code của request đầu tiên
   - Tổng thời gian load trang
   - Một request trả về file CSS

```
      - Tab Network cho thấy thông tin trình duyệt gửi đi và response từ server
      - Status Code của request đầu tiên: 200
      - Tổng thời gian load trang: 1.94s
      - Một request trả về file CSS: svg-with-js.css
      (tham khảo: 01_introduction_html_universe.md + 1.2)
```

![Screenshot tab Network](./screenshots/Screenshot01.png)

### Câu A2 (5đ) — Semantic HTML

Đọc chương 04, trả lời: Tại sao trang web dưới đây bị Google đánh giá SEO thấp? Liệt kê **ít nhất 4 lỗi semantic** và sửa lại.

Sửa lại:

```html
<header>
  <!--Thay div thành header-->
  <div class="logo">ShopTLU</div>
  <nav class="menu">
    <!--Thay div thành nav-->
    <div><a href="/">Trang chủ</a></div>
    <div><a href="/products">Sản phẩm</a></div>
  </nav>
</header>
<main>
  <!--Thay div thành main-->
  <figure class="product">
    <!--Thay div thành figure-->
    <figcaption>
      <!--Gộp chung hai div vào figcaption-->
      <div class="title">iPhone 16 Pro</div>
      <div class="price">25.990.000đ</div>
    </figcaption>
    <div class="image"><img src="iphone.jpg" /></div>
  </figure>
</main>
<footer>© 2026 ShopTLU</footer>
<!--Thay div thành footer-->
` (tham khảo: 04_visible_part_html.md )
```

### Câu A3 (5đ) — Block vs Inline

Không chạy code, hãy **vẽ tay** (hoặc mô tả bằng text art) kết quả hiển thị của đoạn HTML sau. Giải thích tại sao.

Kết quả :
![Kết quả](./screenshots/Screenshot02.jpg)
Giải thích:

```
- <div> là element loại block do đó nó sẽ chiếm cả dòng.
=> <div> sẽ không đứng chung hàng với những element khác bất kể nó có đứng trước hay sau bất kỳ element nào
- <span>,<strong> là những element loại inline nên chúng chỉ chiếm phần nội dung mà nó chứa.
=> Các elemnt khác nếu cùng là loại inline thì đều có thể đứng cùng dòng với nhau nếu còn khoảng trống, trừ các element loại block
(tham khảo: 04_visible_part_html.md + Block vs Inline — Hai loại element cơ bản)
```

### Câu A4 (5đ) — Table

Đọc chương 05. Giải thích sự khác nhau giữa `<thead>`, `<tbody>`, `<tfoot>`. Tại sao KHÔNG NÊN dùng table để tạo layout trang web? (Ghi rõ ít nhất 3 lý do)

```
- Sự khác biệt chính giữa <thead>, <tbody>, <tfoot> đó là ở vai trò:
      - <thead> là header của bảng, nơi chứa tiêu đề
      - <tbody> là body của bảng, nơi chứa nội dung chính
      - <tfoot> là footer của bảng, nơi kết thúc, tổng kết nội dung của bảng
- Lý do không nên dùng table để tạo layout trang web:
      - Mã code sẽ trở nên dài, cồng kềnh và phức tạp
      - Vi phạm semantic, table chỉ nên dùng để khi cần tới data tabular
      - Ngày nay đã có CSS Grid/Flexbox để làm layout
(tham khảo: 05_tables_hyperlinks.md)
```

---

## PHẦN B — THỰC HÀNH CODE (60 điểm)

### Bài B3 (15đ) — Debug HTML

```
Lỗi 1: Dòng 1 — Khai báo DOCTYPE thiếu — Sửa: <!DOCTYPE html>
Lỗi 2: Dòng 2 — Thẻ <html> thiếu thuộc tính lang — Sửa: <html lang="vi">
Lỗi 3: Dòng 4 — Thẻ <title> thiếu thẻ đóng — Sửa: <title>Trang web</title>
Lỗi 4: Dòng 5 — Giá trị charset sai chính tả — Sửa: <meta charset="UTF-8">
Lỗi 5: Trong thẻ <head> - Thiếu thẻ <meta chứa thuộc tính về viewport - Sửa: thêm "<meta name="viewport" content="width=device-width, initial-scale=1.0" />"
Lỗi 6: Dòng 8 — Thẻ <h1> thiếu thẻ đóng và nên đặt trong <header> thay vì trước — Sửa: chuyển vào trong <header> và sửa thành <h1>Welcome to ShopTLU</h1>
Lỗi 7: Dòng 12 — Thẻ <a> đầu tiên thiếu thẻ đóng và href="home" không hợp lệ — Sửa: <a href="#">Trang chủ</a>
Lỗi 8: Dòng 13 — href="products" không hợp lệ — Sửa: <a href="products.html">Sản phẩm</a>
Lỗi 9: Dòng 18 — Nội dung sản phẩm trong <main> nên được bọc bằng <article> vì là nội dung độc lập — Sửa: bọc toàn bộ section sản phẩm trong <article>
Lỗi 10: Dòng 20 — Thẻ <img> thiếu dấu ngoặc kép ở src và thiếu thuộc tính alt — Sửa: <img src="iphone.jpg" alt="iPhone 16 Pro">
Lỗi 11: Dòng 20 — Thẻ <img> không được đặt trong <figure> — Sửa: <figure><img src="iphone.jpg" alt="iPhone 16 Pro"></figure>
Lỗi 12: Dòng 22 — Thẻ <b> và </p> lồng sai thứ tự — Sửa: <p>Giá: <b>25.990.000đ</b></p>
Lỗi 13: Dòng 27 — Thẻ <table> thiếu <thead> và <tbody> để phân biệt các phần — Sửa: bọc hàng đầu trong <thead> và hàng hai trong <tbody>
Lỗi 14: Dòng 29,30 — Hàng tiêu đề dùng <td> thay vì <th> — Sửa: đổi thành <th>Tên</th> và <th>Giá</th>
Lỗi 15: Dòng 40 — Dùng thẻ <main> cho nội dung phụ— Sửa: thay bằng <aside>
Lỗi 16: Dòng 45 — Thẻ <p> trong <footer> thiếu thẻ đóng và thiếu nội dung — Sửa: <p>&copy; Copyright 2026</p>
Lỗi 17: Dòng 48 — Toàn bộ tài liệu thiếu thẻ đóng </html> — Sửa: thêm </html> ở cuối file
```

### Bài B4 (15đ) — Phân tích trang web thật

Chọn **1 trong 3 trang web** sau: `tiki.vn`, `shopee.vn`, `thegioididong.com`

Sử dụng DevTools (F12):

1. **Chụp screenshot** tab Elements, chỉ ra ít nhất:

```
   - 3 thẻ semantic HTML5: <header>, <footer>, <section> (khoanh màu đỏ)
   - 2 thẻ mà trang đó KHÔNG dùng đúng semantic: (khoanh màu đen)
    - Một thẻ <div> chứa ul class="main-menu", chức năng của nó tương tự với thẻ <nav>
    - Thẻ <div> class="body-home", chứa nội dung chính nhưng không thẻ là <main>
    (link:thegioididong.com)
```

![tab Element](./screenshots/Screenshot_Bai_B4_1.png)

2. Mở tab **Elements**, tìm 1 `<table>` trên trang. Chụp screenshot và trả lời:

```
   - Table đó hiển thị nội dung về so sánh các sản phẩm tương tự
   - Có dùng `<thead>`, `<tbody>` không: Có
   (link:https://tiki.vn/dien-thoai-samsung-galaxy-a57-5g-8gb-128gb-hang-chinh-hang-p279257510.html?spid=279257514)
```

![tab Element](./screenshots/Screenshot_Bai_B4_2.png)

3. Tìm 1 `<form>` trên trang (ví dụ ô tìm kiếm). Chụp screenshot:

```
   - Form đó có `action` và `method` gì: action="/tim-kiem", không thấy method trực tiếp
   - Input types nào được dùng: text
   (link:thegioididong.com)
```

![tab Element](./screenshots/Screenshot_Bai_B4_3.png)

## PHẦN C — SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Thiết kế cấu trúc

```
Đã làm trên iphone16pro.html
```

### Câu C2 (10đ) — So sánh & Tranh luận

Theo tôi thấy, semantic HTML thực ra không khó nhớ,tên thẻ bám sát vai trò của nó luôn, đọc là hiểu ngay. Nhưng để nói rõ vì sao cần học thì lý do chính là Google sẽ không đọc class để hiểu cấu trúc của trang web, khi Google không hiểu cấu trúc của trang web, thì SEO sẽ kém đi, trang web sẽ vô hình với internet, người dùng sẽ khó tiếp cận trang web. Ngoài ra, hiểu được cấu trúc trang còn giúp trình duyệt hỗ trợ người bị khiếm khuyết tốt hơn. Chẳng hạn, phần mềm đọc màn hình dựa vào thẻ semantic để biết trang web này dùng ngôn ngữ nào để đọc cho người mù. Ngoài ra nó cũng dựa vào thẻ semantic để biết thứ tự cần đọc như thế nào, nếu chỉ có thẻ div thì nó sẽ đọc tất cả nhưng rất dễ sai. Tất nhiên thẻ div vẫn rất có ích trong những trường hợp người ta cần div chỉ như một cái khung để căn chỉnh bố cục mà không cần mang ý nghĩa gì cụ thể.

## 🎬 PHẦN D — VIDEO THỰC HÀNH OBS (25 điểm)

https://youtu.be/ytVm3fKZvo4
