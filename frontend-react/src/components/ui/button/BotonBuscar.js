"use client";

export default function BotonBuscar({ cargando, ...props }) {
  return (
    <button 
      {...props} 
      disabled={cargando}
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-xs font-bold rounded-lg shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50 flex items-center gap-2"
    >
      {cargando ? "⌛" : "🔍"} 
      {cargando ? "Buscando..." : "Localizar"}
    </button>
  );
}