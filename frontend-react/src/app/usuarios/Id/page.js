"use client";
import { useState } from "react";
import BotonBuscar from "@/components/ui/button/BotonBuscar";
import BotonImprimir from "@/components/ui/button/BotonImprimir";
import { UsuariosAPI } from "@/services/usuario.service";

export default function LeerPorId() {
  const [usuario, setUsuario] = useState(null);
  const [idBusqueda, setIdBusqueda] = useState("");
  const [cargando, setCargando] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputStyle =
    "w-full px-6 py-3 rounded-full bg-gray-800 text-white border-2 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all font-bold placeholder:text-gray-500";
  const labelStyle = "text-[10px] uppercase font-black text-blue-400 mb-1 tracking-widest block";

  const handleBuscar = async () => {
    if (!idBusqueda) return alert("Ingrese un ID válido");
    setCargando(true);
    setUsuario(null);

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
    } catch (e) {
      alert("Usuario no encontrado");
      setUsuario(null);
    } finally {
      setCargando(false);
    }
  };

  const handleCerrar = () => {
    setUsuario(null);
    setIdBusqueda("");
    setShowPassword(false);
  };

  return (
    <div className="flex flex-col min-h-full w-full items-center justify-start p-6 mt-2 bg-transparent">
      <div className="w-full max-w-2xl relative">
        {/* --- VISTA 1: FORMULARIO DE BÚSQUEDA --- */}
        {!usuario && (
          <div className="bg-gray-900 border border-gray-700 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Cabecera */}
            <div className="bg-gray-800 p-8 border-b-4 border-blue-600">
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
                Consulta de <span className="text-blue-500 underline decoration-yellow-400 decoration-4">usuarios</span>
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

            {/* Footer decorativo */}
            <div className="bg-gray-950 p-3 text-center border-t border-gray-800">
              <p className="text-[10px] text-gray-600 font-mono">SYSTEM_READY // WAITING_INPUT</p>
            </div>
          </div>
        )}

        {/* --- VISTA 2: TARJETA DE RESULTADOS --- */}
        {usuario && (
          <div className="bg-gray-900 border border-blue-500/30 rounded-3xl shadow-[0_0_50px_rgba(37,99,235,0.15)] overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-500">
            {/* Cabecera de Resultados */}
            <div className="bg-blue-600 p-6 text-white flex justify-between items-center border-b-4 border-yellow-400">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[4px] text-blue-100 opacity-80">
                  Registro Localizado
                </span>
                <h3 className="font-black text-2xl text-white uppercase mt-1">Expediente #{usuario.id}</h3>
              </div>
              <div className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors cursor-pointer">
                <BotonImprimir />
              </div>
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

              {/* Contraseña Hash con toggle */}
              <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 flex flex-col">
                <p className={labelStyle}>Contraseña (Hash)</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-white text-sm font-mono break-all">
                    {showPassword ? usuario.contrasena_hash : "••••••••••••••••••••"}
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-blue-400 text-xs font-bold ml-2 hover:underline"
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
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

            {/* Botón Volver */}
            <div className="bg-gray-800 p-6 border-t border-gray-700 flex justify-center">
              <button
                onClick={handleCerrar}
                className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-full border-2 border-yellow-400 text-yellow-400 hover:text-gray-900 transition-colors duration-300 ease-out"
              >
                <span className="absolute inset-0 w-full h-full bg-yellow-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                <span className="relative text-xs font-black uppercase tracking-[3px] flex items-center gap-2">
                  <span>←</span> Cerrar Consulta
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
