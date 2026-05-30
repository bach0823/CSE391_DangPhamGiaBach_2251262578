import "./App.css";
import ProductCard from "./components/ProductCard";
import UserCard from "./components/UserCard";
import PriceTag from "./components/PriceTag";

function App() {
  const products = [
    {
      id: 1,
      name: "iPhone 15",
      price: "25.000.000",
      image: "https://via.placeholder.com/200",
    },
    {
      id: 2,
      name: "Samsung S24",
      price: "22.000.000",
      image: "https://via.placeholder.com/200",
    },
    {
      id: 3,
      name: "Xiaomi 14",
      price: "15.000.000",
      image: "https://via.placeholder.com/200",
    },
  ];
  // Dữ liệu cho UserCard
  const users = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nva@gmail.com",
      avatar: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "ttb@gmail.com",
      avatar: "https://via.placeholder.com/100",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "lvc@gmail.com",
      avatar: "https://via.placeholder.com/100",
    },
  ];
  // Dữ liệu cho PriceTag
  const saleProducts = [
    { id: 101, name: "iPhone 15", original: "25.000.000", sale: "22.000.000" },
    { id: 102, name: "Tai nghe", original: "1.000.000", sale: "800.000" },
    { id: 103, name: "Sạc nhanh", original: "500.000", sale: "450.000" },
  ];

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Cửa hàng điện thoại</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>

      <h1 style={{ textAlign: "center" }}>Danh sách nhân viên</h1>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {users.map((user) => (
          <UserCard
            key={user.id}
            name={user.name}
            email={user.email}
            avatar={user.avatar}
          />
        ))}
      </div>
      <hr style={{ margin: "40px 0" }} />

      <h1 style={{ textAlign: "center" }}>Bảng giá sản phẩm khuyến mại</h1>

      <div style={{ textAlign: "center" }}>
        {saleProducts.map((saleProduct) => (
          <div key={saleProduct.id} style={{ marginBottom: "20px" }}>
            <h3>{saleProduct.name}</h3>
            <PriceTag
              originalPrice={saleProduct.original}
              salePrice={saleProduct.sale}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
