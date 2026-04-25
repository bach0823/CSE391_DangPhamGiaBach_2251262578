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
