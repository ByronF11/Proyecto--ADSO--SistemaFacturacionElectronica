export default function Button({ children, onClick, type = "button", styleCustom = {} }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: "10px 20px",
        backgroundColor: "#0070f3",
        color: "#fff",
        fontWeight: "bold",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        ...styleCustom,
      }}
    >
      {children}
    </button>
  );
}
