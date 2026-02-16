"use client";
import { useState, useEffect } from "react";
import { formatearFechaLocal } from "@/utils/fecha";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [filtroRol, setFiltroRol] = useState("todos");
  const [showRoles, setShowRoles] = useState(false);
  const [estaBuscando, setEstaBuscando] = useState(false);
  const gridLayout = "grid grid-cols-[70px_1.5fr_1.8fr_1.2fr_120px_130px_1.5fr_1.5fr]";

  const cargarUsuarios = async (signal) => {
    try {
      const res = await fetch(`/api/usuarios`, {
        method: "GET",
        headers: { Accept: "application/json" },
        signal,
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data)) setUsuarios(data);
    } catch (error) {
      if (error.name !== "AbortError") console.error("Error:", error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    cargarUsuarios(controller.signal);
    const interval = setInterval(() => cargarUsuarios(controller.signal), 3000);
    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, []);

  const usuariosFiltrados = usuarios.filter((u) => {
    const coincideEstado =
      filtroEstado === "todos" ||
      (filtroEstado === "activos" && Number(u.activo) === 1) ||
      (filtroEstado === "inactivos" && Number(u.activo) === 0);
    const coincideRol = filtroRol === "todos" || u.rol.toLowerCase() === filtroRol.toLowerCase();
    return coincideEstado && coincideRol;
  });

  return (
    <div className="flex flex-col min-h-full w-full items-center justify-start p-6 mt-1 bg-transparent font-sans">
      <div className="w-full max-w-[95%] 2xl:max-w-[1400px] relative">
        <div className="bg-gray-900 border border-gray-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[73vh]">
          {/* CABECERA DE LA CARD */}
          <div className="bg-gray-800 p-4 border-b-4 border-blue-600 flex justify-between items-center z-40 shrink-0">
            <div>
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
                Listado <span className="text-blue-500 underline decoration-yellow-400 decoration-4">maestro</span>
              </h2>
              <p className="text-[10px] uppercase tracking-[3px] font-bold text-gray-400 mt-2">Base de Datos Central</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full font-black border border-blue-500/40">
                {usuariosFiltrados.length} Registros
              </span>

              {/* GRUPO DE FILTROS */}
              <div className="flex bg-gray-950 p-1 rounded-lg gap-1 border border-gray-700 relative items-center">
                {["todos", "activos", "inactivos"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFiltroEstado(f)}
                    className={`text-[10px] uppercase px-4 py-2 rounded-md transition-all ${
                      filtroEstado === f ? "bg-blue-600 text-white font-black shadow" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {f}
                  </button>
                ))}

                <div className="w-[1px] h-4 bg-gray-700 mx-1"></div>

                {/* BOTÓN ROL CON DESPLEGABLE */}
                <div className="relative">
                  <button
                    onClick={() => setShowRoles(!showRoles)}
                    className={`text-[10px] uppercase px-4 py-2 rounded-md transition-all flex items-center gap-2 ${
                      filtroRol !== "todos"
                        ? "bg-purple-600 text-white font-black shadow-lg shadow-purple-500/20"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Rol: {filtroRol}
                    <span className="text-[8px] opacity-60">{showRoles ? "▲" : "▼"}</span>
                  </button>

                  {showRoles && (
                    <div className="absolute top-full mt-2 right-0 w-44 bg-gray-900 border border-gray-700 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-[60] overflow-hidden border-t-purple-500">
                      {["todos", "admin", "auditor", "comprador", "vendedor"].map((r) => (
                        <button
                          key={r}
                          onClick={() => {
                            setFiltroRol(r);
                            setShowRoles(false);
                          }}
                          className="w-full text-left px-4 py-3 text-[10px] uppercase font-bold hover:bg-purple-600 hover:text-white text-gray-400 border-b border-gray-800 last:border-0 transition-colors"
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* CUERPO DE LA TABLA (Maneja el scroll) */}
          <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-blue-600 bg-gray-900/50">
            <div className="min-w-max">
              {/* ENCABEZADO DE COLUMNAS (STICKY) */}
              <div
                className={`${gridLayout} sticky top-0 bg-gray-900 z-30 border-b border-gray-700 text-[11px] uppercase tracking-widest text-gray-500 font-bold shadow-xl`}
              >
                {["ID", "Nombre", "Correo", "Hash", "Rol", "Estado", "Creado En", "Actualizado En"].map((h) => (
                  <div
                    key={h}
                    className="py-5 px-4 border-r border-gray-800/50 flex items-center justify-start last:border-0"
                  >
                    {h}
                  </div>
                ))}
              </div>

              {/* FILAS DE DATOS */}
              <div className="divide-y divide-gray-800">
                {usuariosFiltrados.length > 0 ? (
                  usuariosFiltrados.map((u) => (
                    <div
                      key={u.id_usuario}
                      className={`${gridLayout} hover:bg-gray-800/40 transition-all items-stretch group`}
                    >
                      <div className="py-5 px-4 border-r border-gray-800 flex items-center font-mono text-blue-400 font-bold">
                        #{u.id_usuario}
                      </div>
                      <div className="py-5 px-4 border-r border-gray-800 flex items-center font-semibold text-gray-200">
                        {u.nombre}
                      </div>
                      <div className="py-5 px-4 border-r border-gray-800 flex items-center text-gray-400 truncate">
                        {u.correo}
                      </div>
                      <div
                        className="py-5 px-4 border-r border-gray-800 flex items-center font-mono text-[11px] text-gray-500 truncate"
                        title={u.contrasena_hash}
                      >
                        {u.contrasena_hash}
                      </div>

                      <div className="py-5 px-4 border-r border-gray-800 flex items-center justify-start">
                        <span
                          className={`px-2 py-0.5 rounded uppercase text-[10px] font-black border ${
                            u.rol === "admin"
                              ? "bg-red-500/10 text-red-500 border-red-500/20"
                              : u.rol === "vendedor"
                                ? "bg-green-500/10 text-green-500 border-green-500/20"
                                : u.rol === "auditor"
                                  ? "bg-purple-500/10 text-purple-500 border-purple-500/20"
                                  : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                          }`}
                        >
                          {u.rol}
                        </span>
                      </div>

                      <div className="py-5 px-4 border-r border-gray-800 flex items-center justify-center">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border whitespace-nowrap ${
                            Number(u.activo) === 1
                              ? "bg-green-600/20 text-green-400 border-green-600/50"
                              : "bg-red-600/20 text-red-400 border-red-600/50"
                          }`}
                        >
                          {Number(u.activo) === 1 ? "● Activo" : "○ Inactivo"}
                        </span>
                      </div>

                      <div className="py-5 px-4 border-r border-gray-800 flex items-center justify-start text-gray-400 font-mono font-bold text-[13px]">
                        {formatearFechaLocal(u.creado_en)}
                      </div>
                      <div className="py-5 px-4 flex items-center justify-start text-gray-400 font-mono font-bold text-[13px]">
                        {formatearFechaLocal(u.actualizado_en)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-20 text-center text-gray-500 italic uppercase tracking-[5px] animate-pulse">
                    Sin registros coincidentes
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="bg-gray-950 p-3 text-center border-t border-gray-800 shrink-0">
            <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">
              System_Ready // Filter_Status: {filtroEstado} // Filter_Rol: {filtroRol}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
