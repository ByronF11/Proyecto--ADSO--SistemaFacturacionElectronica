"use client";

export default function BotonImprimir({ onClick }) {
  return (
    <button 
      onClick={onClick}
      className="bg-emerald-500 hover:bg-emerald-400 text-white px-3 py-1 rounded text-[10px] font-bold transition-all cursor-pointer shadow-sm active:scale-90 flex items-center gap-1"
    >
      🖨️ IMPRIMIR
    </button>
  );
}