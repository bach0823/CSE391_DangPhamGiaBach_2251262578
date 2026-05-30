function PriceTag({ originalPrice, salePrice }) {
  return (
    <div style={{ margin: "10px" }}>
      <span
        style={{
          textDecoration: "line-through",
          color: "gray",
          marginRight: "10px",
        }}
      >
        {originalPrice}đ
      </span>

      <span style={{ color: "red", fontWeight: "bold", fontSize: "20px" }}>
        {salePrice}đ
      </span>
    </div>
  );
}
export default PriceTag;
