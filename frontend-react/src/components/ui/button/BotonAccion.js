"use client";

export default function BotonAccion({ children, variant = "blue", icon, ...props }) {
  const variants = {
    blue: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-100",
    emerald: "bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-100",
    red: "bg-red-600 hover:bg-red-700 focus:ring-red-100",
    gray: "bg-gray-400 hover:bg-gray-500 focus:ring-gray-100",
  };

  return (
    <button
      {...props}
      className={`
        flex items-center gap-2 px-5 py-2 text-xs font-bold text-white 
        rounded-lg shadow-md transition-all cursor-pointer
        hover:scale-105 active:scale-95 
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-4
        ${variants[variant] || variants.blue}
      `}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
