function ListRendering() {
  const products = [
    { id: 1, name: "Chuột không dây", price: 250000 },
    { id: 2, name: "Bàn phím cơ", price: 1200000 },
    { id: 3, name: "Tai nghe Bluetooth", price: 800000 },
    { id: 4, name: "Màn hình 24 inch", price: 2500000 },
    { id: 5, name: "Lót chuột", price: 50000 },
  ];

  return (
    <div>
      <h4>Bài 2.3</h4>
      <h2>Danh sách trái cây</h2>

      <h2>Danh sách sản phẩm</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Tên</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Giá</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              style={{ color: product.price > 1000000 ? "red" : "black" }}
            >
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {product.name}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {product.price}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr style={{ fontWeight: "bold" }}>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Tổng</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              {products.reduce((sum, product) => sum + product.price, 0)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default ListRendering;
