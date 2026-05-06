## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

### Câu A1 (10đ) — 5 Loại Positioning

| Position   | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case                                     |
| ---------- | ------------------------- | ----------------- | ---------------- | -------------------------------------------- |
| `static`   | có                        | không             | có               | Mặc định                                     |
| `relative` | có                        | có                | có               | Làm anchor cho absolute con, dịch chuyển nhẹ |
| `absolute` | không                     | có                | không            | Badge, dropdown, tooltip, overlay            |
| `fixed`    | không                     | có                | có               | Chat button, cookie banner, header cố định   |
| `sticky`   | có -> không               | có                | không -> có      | Sticky header, sticky table header, sidebar  |

**Câu hỏi thêm:**  
Khi nào `absolute` tham chiếu `body`: Khi body có thuộc tính `position` khác `static` và các thẻ con cháu của nó nhưng vẫn là tổ tiên của `absolute` không có cái nào có thuộc tính `position` khác `static`.  
Khi nào tham chiếu parent: Khi thẻ cha của absolute có thuộc tính `position` khác `static`.  
Giải thích khái niệm "nearest positioned ancestor": là thẻ tổ tiên gần nhất có `position` khác `static`.

### Câu A2 (10đ) — Flexbox vs Grid

Không chạy code, dự đoán layout cho mỗi trường hợp. **Vẽ sơ đồ bố cục** (text art hoặc vẽ tay chụp ảnh).

```css
/* Trường hợp 1 */
.container {
  display: flex;
}
.item {
  flex: 1;
}
/* 4 items → 
Bố cục = |[ item1 ][ item2 ][ item3 ][ item4 ]|
4 item có cùng chiều rộng do được chia đều  */

/* Trường hợp 2 */
.container {
  display: flex;
  flex-wrap: wrap;
}
.item {
  width: 45%;
  margin: 2.5%;
}
/* 6 items → 
Bố cục = 
|[ item1 ][ item2 ]|
|[ item3 ][ item4 ]|
|[ item5 ][ item6 ]|
 (3 hàng, 2 cột) 
 mỗi item đều chiếm 45%+2*2.5% = 50% chiều rộng của container*/

/* Trường hợp 3 */
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* 3 items → 
Bố cục = 
|                                     |    
|[ item1 ]     [ item2 ]     [ item3 ]|
|                                     |    
 */

/* Trường hợp 4 */
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  gap: 20px;
}
/* 3 items → 
Bố cục = 
|[ 200px ]  (20px)   [ container_width - 200px*2 - 20px*2 ]  (20px)   [ 200px ]|
*/

/* Trường hợp 5 */
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
/* 7 items → 
Bố cục =  
|[ item1 ]  (10px)   [ item2 ]  (10px)   [ item3 ]|
|[ item4 ]  (10px)   [ item5 ]  (10px)   [ item6 ]|
|[ item7 ]                                        |
(3 hàng item cuối nằm ở hàng cuối cột đầu tiên?) 
Tất cả item đều có width = container_width/3 
mỗi hàng chỉ có 3 chỗ nhưng có tổng 7 item nên khi hàng có đủ item rồi thì các item còn lại sẽ xuống dòng*/
```

---
