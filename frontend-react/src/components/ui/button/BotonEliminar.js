"use client";

export default function BotonEliminar({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 text-xs font-bold rounded-lg shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
    >
      <span>🗑️</span> Eliminar Definitivamente
    </button>
  );
}