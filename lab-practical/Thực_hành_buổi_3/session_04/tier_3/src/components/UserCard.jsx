function UserCard({ name, email, avatar }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        margin: "10px",
        width: "250px",
        textAlign: "center",
      }}
    >
      <img
        src={avatar}
        alt="Avatar"
        style={{ width: "100px", height: "100px", borderRadius: "50%" }}
      />
      <h3>{name}</h3>
      <p style={{ color: "gray" }}>{email}</p>
    </div>
  );
}
export default UserCard;
