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
