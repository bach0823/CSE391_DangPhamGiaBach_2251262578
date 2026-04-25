## PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)

### Câu A1 (5đ) — Input Types

```
1. type="email" → Ô nhập text, tự kiểm tra có @ → Dùng cho form đăng ký
2. type="text" →  Ô nhập text → nhập họ tên, địa chỉ
3. type="password" → ô nhập text, ẩn ký tự → nhập mật khẩu
4. type="number" → ô nhập số, có nút tăng, giảm → nhập số lượng hàng
5. type="tel" → bàn phím số (mobile)→ nhập số điện thoại
6. type="date" → ô chọn ngày → nhập ngày sinh
7. type="color" → ô chọn màu → chọn màu cho sản phẩm
8. type="range" → slider → chọn khoảng giá theo mong muốn
9. type="file" →  panel để chọn file → upload file, ảnh,...
10. type="search" → ô tìm kiếm + nút X → thanh tìm kiếm
(tham khảo: 07_forms_interactive.md)
```

### Câu A2 (5đ) — Validation Attributes

Đọc chương 07. Không chạy code, hãy **dự đoán** điều gì xảy ra khi user bấm Submit cho mỗi trường hợp sau. Giải thích TẠI SAO.

```html
<!-- Trường hợp 1 -->
<input type="text" required value="" />
<!-- User để trống -->
<!-- Bắt buộc phải nhập mới submit được do required -->

<!-- Trường hợp 2 -->
<input type="email" value="abc" />
<!-- User gõ "abc" -->
<!-- nhập sai format nên ko submit được, type email yêu cầu phải có @ -->

<!-- Trường hợp 3 -->
<input type="number" min="1" max="10" value="15" />
<!-- User gõ 15 -->
<!-- nhập giá trị ngoài khoảng cho phép, 15 > max(10) -->

<!-- Trường hợp 4 -->
<input type="text" pattern="[0-9]{10}" value="abc123" />
<!-- User gõ "abc123" -->
<!-- pattern="[0-9]{10}" yêu cầu 10 chữ số => sai format -->

<!-- Trường hợp 5 -->
<input type="password" minlength="8" value="123" />
<!-- User gõ "123" -->
<!-- độ dài tối thiếu là 8 nhưng ở đây chỉ có 3 -->
```

### Câu A3 (5đ) — Accessibility

Đọc phần Accessibility trong chương 07. Giải thích:

1. Tại sao `<label for="email">` quan trọng cho người dùng screen reader?
   - Giúp cho người dùng biết nên nhập vào ô nhập gì, ngoài ra label cũng kết nối với ô nên nhập vào label thì cũng như nhập vào ô
2. Khi nào dùng `<fieldset>` + `<legend>`? Cho ví dụ cụ thể.
   - Dùng khi có các mục nhập liên quan tới nhau
   - VD: Nhập địa chỉ gồm các mục: số nhà, đường, phường, thành phố
3. `aria-label` dùng khi nào? Tại sao KHÔNG nên dùng `aria-label` khi đã có `<label>`?
   - `aria-label` dùng khi element không hiển thị nội dung có vài trò label trên màn hình
   - Lý do không nên dùng `aria-label` khi đã có `<label>` vì `<label>` đã đảm nhiệm vài trò của `aria-label` và cũng đã hiển thị nội dung trên màn hình

### Câu A4 (5đ) — Media

1. Giải thích thuộc tính `loading="lazy"` trên thẻ `<img>`. Nó cải thiện gì? Khi nào KHÔNG nên dùng?
   - Mặc định trình duyệt load tất cả ảnh khi load trang. Còn với loading="lazy", trình duyệt chỉ load ảnh khi người dùng sắp cuộn tới nơi có ảnh đó.
   - Điều này giúp tối ưu thời gian load trang, giúp giảm tài nguyên không cần thiết.
   - Tránh dùng khi ảnh đã ở ngay đầu trang.
2. Tại sao nên cung cấp nhiều `<source>` trong thẻ `<video>`? Liệt kê ít nhất 3 format video web phổ biến.
   - Có nhiều nguồn phòng trường hợp có nguồn bị hỏng
   - Hỗ trợ đa nhiều định dạng trong trường hợp trình duyệt không hỗ trợ định dạng ở một vài nguồn
   - Format phổ biến: MP4, WebM, OGG
3. Thuộc tính `alt` trên `<img>` dùng để làm gì? Viết `alt` tốt cho 3 trường hợp:
   - `alt` dùng khi hiển thị text thay thế khi ảnh không load được, hỗ trợ cho người khiếm thính nghe và vì mục đích semantic
   - Ảnh sản phẩm iPhone 16 : alt="iPhone 16 Pro 128GB"
   - Ảnh trang trí (decorative) : alt="" (vì khi để trống, screen reader sẽ hiểu đây là ảnh trang trí và bỏ qua)
   - Ảnh biểu đồ doanh thu Q1/2026 : alt="Doanh thu Q1/2026: Tăng 50% so với cùng kỳ năm ngoài"

### Câu A5 (5đ) — So sánh `<figure>` vs `<img>`

Khi nào dùng Cách 1, khi nào dùng Cách 2? Cho 2 ví dụ thực tế cho mỗi cách. - Dùng cách 1 khi mà chỉ cần một img độc lập là đủ để thể hiện nội dung (VD: ảnh đại diện, logo) - Dùng cách 2 khi cần một cụm gồm ảnh và chú thích (VD: Mục sản phẩm, bưu thiếp)

## PHẦN B — THỰC HÀNH CODE (55 điểm)

### Bài B1 (20đ) — Form Đăng ký Tài khoản

Tại sao HTML không thể validate confirm password: vì pattern chỉ nhận một chuỗi regex cố định — nó không có cơ chế nào để tham chiếu đến giá trị của input khác.

## PHẦN C — PHÂN TÍCH & SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Debug Form

Form dưới đây có **8 lỗi** về validation, accessibility, và best practices. Tìm và sửa tất cả.

```
Lỗi 1: Dòng 1 — <form> thiếu method và action, vi phạm best practices
Sửa: <form action="." method="post">

Lỗi 2: Dòng 2 — Input "Tên" không có <label for="...">, thiếu id, name, required, vi phạm accessibility và validation
Sửa:
<label for="name">Tên:</label>
<input type="text" id="name" name="name" required>

Lỗi 3: Dòng 4 — Input "Email" không có <label for="...">, thiếu id, name, required, vi phạm accessibility và validation
Sửa:
<label for="email">Email:</label>
<input type="email" id="email" name="email" placeholder="Email của bạn" required>

Lỗi 4: Dòng 6–7 — Cả 2 input "Password" thiếu <label>, id, name riêng biệt, vi phạm accessibility và best practices
Sửa:
<label for="password">Mật khẩu:</label>
<input type="password" id="password" name="password" required>
<label for="confirm-password">Nhập lại mật khẩu:</label>
<input type="password" id="confirm-password" name="confirm_password" required>

Lỗi 5: Dòng 9 — Input "Phone" không có <label for="...">, thiếu id, name, vi phạm accessibility và best practices
Sửa:
<label for="phone">Phone:</label>
<input type="text" id="phone" name="phone" value="0901234567">

Lỗi 6: Dòng 11 — <select> không có <label>, thiếu id, name, các <option> thiếu value, vi phạm accessibility và best practices
Sửa:
<label for="city">Địa chỉ:</label>
<select id="city" name="city">
    <option value="hanoi">Hà Nội</option>
    <option value="hcm">TP.HCM</option>
</select>

Lỗi 7: Dòng 16 — <label> không có <input type="..."> đi kèm, vi phạm accessibility và validation
Sửa:
<input type="checkbox" id="agree" name="agree" required>
<label for="agree">Tôi đồng ý điều khoản</label>

Lỗi 8: Dòng 20 — <input type="submit"> nên dùng <button type="submit">, vi phạm best practices
Sửa:
<button type="submit">Xác nhận</button>
```

### Câu C2 (10đ) — Thiết kế chiến lược Validation

```
1. Pattern:
   - CMND/CCCD: "\d{12}"
   - Số tài khoản: "\d{10,15}"
   - PIN: "/d{6}
2. HTML5 validation chưa đủ an toàn cho ứng dụng ngân hàng vì:
   - Người dùng có thể thay đổi code html trên trình duyệt, chẳng hạn như thay đổi pattern khiến trình duyệt gửi thông tin sai, dễ dàng bị bypass
   - HTML không có đủ năng lực để thực hiện các phép logic phức tạp cần thiết
3. Những validation mà HTML5 không thể làm:
   - So sánh hai giá trị
   - Kiểm tra những logic phức tạp (mã CCCD có hợp lệ theo quy định số thẻ CCCD ko)
   - HTML không thể biết dữ liệu bạn nhập đã tồn tại trong csdl hay chưa.
4. 2 rủi ro bảo mật nếu chỉ validate trên Frontend mà không validate Backend:
   - Người dùng dễ dàng bypass validate html
   - Người dùng có thể truyền request thẳng vào máy chủ mà ko cần đi qua html
```

## 🎬 PHẦN D — VIDEO THỰC HÀNH OBS (25 điểm)

https://youtu.be/U5SeoaUa-rI
