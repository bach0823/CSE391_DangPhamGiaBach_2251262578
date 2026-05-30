function Dashboard() {
  const isOnline = true;
  const isLoggedIn = true;
  const stock = 0;

  return (
    <div>
      {/* Thử thách 1*/}
      <h3>Trạng thái: {isOnline ? "🟢 Đang online" : "🔴 Đang offline"}</h3>

      <hr />

      {/* Thử thách 2 */}
      {isLoggedIn && (
        <ul>
          <li>👤 Thông tin cá nhân</li>
          <li>⚙️ Cài đặt</li>
          <li>🚪 Đăng xuất</li>
        </ul>
      )}

      <hr />

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
