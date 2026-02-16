"use client";
import { useState } from "react";
import BotonBuscar from "@/components/ui/button/BotonBuscar";
import BotonEliminar from "@/components/ui/button/BotonEliminar";
import { UsuariosAPI } from "@/services/usuario.service";

export default function EliminarUsuario() {
  const [usuario, setUsuario] = useState(null);
  const [idBusqueda, setIdBusqueda] = useState("");
  const [cargando, setCargando] = useState(false);

  const inputStyle =
    "w-full px-6 py-3 rounded-full bg-gray-800 text-white border-2 border-transparent focus:border-red-500 focus:ring-2 focus:ring-red-500/30 outline-none transition-all font-bold placeholder:text-gray-500";

  const labelStyle = "text-[10px] uppercase font-black text-blue-400 mb-1 tracking-widest block";

  const handleBuscar = async () => {
    if (!idBusqueda) return alert("Ingrese un ID válido");
    setCargando(true);
    try {
      const user = await UsuariosAPI.getById(idBusqueda);
      setUsuario({
        id: user.id_usuario,
        nombre: user.nombre,
        correo: user.correo,
        contrasena_hash: user.contrasena_hash,
        rol: user.rol,
        activo: user.activo,
      });
    } catch {
      alert("Usuario no encontrado");
      setUsuario(null);
    } finally {
      setCargando(false);
    }
  };

  const handleEliminar = async () => {
    if (!usuario) return;
    if (!confirm("¿Eliminar este usuario?")) return;
    setCargando(true);
    try {
      await UsuariosAPI.remove(usuario.id);
      alert("Usuario eliminado correctamente");
      setUsuario(null);
      setIdBusqueda("");
    } catch {
      alert("Error al eliminar");
    } finally {
      setCargando(false);
    }
  };

  const handleCerrar = () => {
    setUsuario(null);
    setIdBusqueda("");
    console.log("Cerrando...");
  };

  return (
    <div className="flex flex-col min-h-full w-full items-center justify-start p-6 mt-2 bg-transparent">
      <div className="w-full max-w-2xl relative">
        {/* ============================
            CARD 1 — FORMULARIO DE BÚSQUEDA
        ============================ */}
        {!usuario && (
          <div className="bg-gray-900 border border-gray-700 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Cabecera */}
            <div className="bg-gray-800 p-8 border-b-4 border-red-600">
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
                Eliminar <span className="text-red-500 underline decoration-yellow-400 decoration-4">usuario</span>
              </h2>
              <p className="text-[10px] uppercase tracking-[3px] font-bold text-gray-400 mt-2">Base de Datos Central</p>
            </div>

            {/* Cuerpo */}
            <div className="p-8">
              <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 space-y-4">
                <div>
                  <label className={labelStyle}>Identificador (ID)</label>
                  <input
                    value={idBusqueda}
                    onChange={(e) => setIdBusqueda(e.target.value)}
                    className={inputStyle}
                    placeholder="Ingrese ID (Ej: 101)..."
                    autoFocus
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <div className="hover:scale-105 active:scale-95 transition-transform">
                    <BotonBuscar onClick={handleBuscar} disabled={cargando} />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-950 p-3 text-center border-t border-gray-800">
              <p className="text-[10px] text-gray-600 font-mono">SYSTEM_READY // WAITING_INPUT</p>
            </div>
          </div>
        )}

        {/* ============================
            CARD 2 — CONFIRMACIÓN DE ELIMINACIÓN
        ============================ */}
        {usuario && (
          <div className="bg-gray-900 border border-red-500/30 rounded-3xl shadow-[0_0_50px_rgba(239,68,68,0.15)] overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-500">
            {/* Cabecera */}
            <div className="bg-red-600 p-6 text-white border-b-4 border-yellow-400">
              <span className="text-[10px] font-black uppercase tracking-[4px] text-red-100 opacity-80">
                Confirmación de Eliminación
              </span>
              <h3 className="font-black text-2xl text-white uppercase mt-1">Usuario #{usuario.id}</h3>
            </div>

            {/* Datos */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                <p className={labelStyle}>Nombre del Usuario</p>
                <p className="text-white text-lg font-bold truncate">{usuario.nombre}</p>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                <p className={labelStyle}>Correo Electrónico</p>
                <p className="text-white text-lg font-bold truncate">{usuario.correo}</p>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                <p className={labelStyle}>Rol del Sistema</p>
                <p className="text-blue-400 text-lg font-bold uppercase tracking-widest">{usuario.rol}</p>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 flex flex-col justify-center">
                <p className={labelStyle}>Estado Actual</p>
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      usuario.activo ? "bg-green-500 shadow-[0_0_10px_#22c55e]" : "bg-red-500 shadow-[0_0_10px_#ef4444]"
                    }`}
                  ></div>
                  <span className={`text-sm font-bold ${usuario.activo ? "text-green-400" : "text-red-400"}`}>
                    {usuario.activo ? "ACTIVO" : "INACTIVO"}
                  </span>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="bg-gray-800 p-6 border-t border-gray-700 flex justify-between">
              <button
                onClick={handleCerrar}
                className="text-xs font-black uppercase tracking-[3px] text-gray-400 hover:text-white transition-colors"
              >
                ← Cancelar
              </button>

              <div className="hover:scale-105 transition-transform">
                <BotonEliminar onClick={handleEliminar} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
