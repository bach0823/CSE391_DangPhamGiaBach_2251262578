function Dashboard() {
  const isOnline = true;
  const isLoggedIn = true;
  const stock = 0;

  return (
    <div style={{ border: "1px solid black" }}>
      <h4>Bài 2.2</h4>
      {/* Thử thách 1*/}
      <h3>Trạng thái: {isOnline ? "🟢 Đang online" : "🔴 Đang offline"}</h3>

      {/* Thử thách 2 */}
      {isLoggedIn && (
        <ul style={{ listStyle: "none" }}>
          <li>👤 Thông tin cá nhân</li>
          <li>⚙️ Cài đặt</li>
          <li>🚪 Đăng xuất</li>
        </ul>
      )}

      {/* Thử thách 3 */}
      <div>
        <h2>iPhone 16 Pro Max</h2>
        <p>Giá: 30.000.000đ</p>

        {stock === 0 && <p>Hết hàng!</p>}
        {stock > 0 && <p>Còn {stock} sản phẩm</p>}
      </div>
    </div>
  );
}

export default Dashboard;
