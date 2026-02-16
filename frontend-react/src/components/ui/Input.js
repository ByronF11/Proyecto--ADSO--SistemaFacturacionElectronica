export default function Input({ type = "text", placeholder, value, onChange, required = false, styleCustom = {} }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      style={{
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        width: "100%",
        boxSizing: "border-box",
        ...styleCustom,
      }}
    />
  );
}
