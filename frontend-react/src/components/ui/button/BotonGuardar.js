"use client";

export default function BotonGuardar({ cargando, ...props }) {
  return (
    <button
      {...props}
      type="submit"
      disabled={cargando}
      className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 text-xs font-bold rounded-lg shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span>{cargando ? "⌛" : "💾"}</span>
      {cargando ? "Guardando..." : "Guardar Usuario"}
    </button>
  );
}