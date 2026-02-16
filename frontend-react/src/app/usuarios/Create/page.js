"use client";
import { useState } from "react";
import { UsuariosAPI } from "@/services/usuario.service";

export default function CreateUsuarioPage() {
  const [cargando, setCargando] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contrasena_hash: "",
    rol: "admin",
  });

  const inputStyle =
    "w-full px-5 py-3 rounded-full bg-gray-800 text-white border-2 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all font-bold placeholder:text-gray-500";

  const labelStyle = "text-[10px] uppercase font-black text-blue-400 mb-1 tracking-widest block";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      await UsuariosAPI.create(formData);
      alert("✅ Usuario creado correctamente");
      handleLimpiarFormulario();
    } catch (error) {
      console.error(error);
      alert("❌ Error al crear usuario: " + (error.message || "Verifica los datos"));
    } finally {
      setCargando(false);
    }
  };

  const handleLimpiarFormulario = () => {
    setFormData({
      nombre: "",
      correo: "",
      contrasena_hash: "",
      rol: "admin",
    });
  };
  return (
    <div
      className="flex flex-col min-h-full w-full items-center justify-start p-0 mt-0 overflow-y-auto"
      style={{ animation: "fadeSlide 0.5s ease-out" }}
    >
      <div className="bg-gray-900 border border-gray-700 rounded-3xl shadow-2xl overflow-hidden w-full max-w-3xl mx-auto">
        {/* CABECERA ESTILO SISTEMA CENTRAL */}
        <div className="bg-gray-800 p-3 border-b-4 border-blue-600">
          <h1 className="text-3xl font-black text-white tracking-tight uppercase">
            Nuevo <span className="text-blue-500 underline decoration-yellow-400 decoration-4">Registro</span>
          </h1>
          <p className="text-[9px] uppercase tracking-[2px] font-bold text-gray-400 mt-1">Base de Datos Central</p>
        </div>

        {/* CUERPO */}
        <div className="p-8">
          <div className="bg-gray-800/50 p-2 rounded-2xl border border-gray-700 space-y-2">
            {/* FORMULARIO */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div className="flex flex-col">
                <label className={labelStyle}>Nombre Completo</label>
                <input
                  type="text"
                  className={inputStyle}
                  placeholder="Nombre del usuario"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                />
              </div>

              {/* Correo */}
              <div className="flex flex-col">
                <label className={labelStyle}>Correo Electrónico *</label>
                <input
                  type="email"
                  required
                  className={`${inputStyle} border-blue-900/50`}
                  placeholder="user@dominio.com"
                  value={formData.correo}
                  onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                />
              </div>

              {/* Contraseña Hash */}
              <div className="flex flex-col md:col-span-2">
                <label className={labelStyle}>Contraseña_Hash (Debe empezar con "hash") *</label>
                <input
                  type="text"
                  required
                  className={`${inputStyle} border-yellow-500/20 font-mono text-yellow-400`}
                  placeholder="hash_ejemplo123..."
                  value={formData.contrasena_hash}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contrasena_hash: e.target.value,
                    })
                  }
                />
              </div>

              {/* Rol */}
              <div className="flex flex-col">
                <label className={labelStyle}>Rol de Acceso</label>
                <select
                  className={`${inputStyle} appearance-none cursor-pointer`}
                  value={formData.rol}
                  onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                >
                  <option value="admin">Administrador</option>
                  <option value="vendedor">Vendedor</option>
                  <option value="auditor">Auditor</option>
                  <option value="comprador">Comprador</option>
                </select>
              </div>

              {/* BOTONES */}
              <div className="md:col-span-2 flex justify-end items-center gap-4 pt-4 border-t border-gray-800 mt-2">
                <button
                  type="button"
                  onClick={handleLimpiarFormulario}
                  className="px-4 py-2 text-xs rounded-full bg-blue-600 text-white font-black shadow-[0_0_20px_rgba(37,99,235,0.4)] border-2 border-yellow-400 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
                >
                  🗑️ LIMPIAR FORMULARIO
                </button>

                <button
                  type="submit"
                  disabled={cargando}
                  className="px-4 py-2 text-xs rounded-full bg-blue-600 text-white font-black shadow-[0_0_20px_rgba(37,99,235,0.4)] border-2 border-yellow-400 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
                >
                  {cargando ? "⌛ Guardando..." : "💾 Guardar Usuario"}
                </button>
              </div>
            </form>
          </div>

          {/* FOOTER */}
          <p className="text-center text-gray-500 text-[10px] mt-4 uppercase font-bold tracking-tighter">
            Los campos marcados con (*) son estrictamente necesarios para la base de datos
          </p>
        </div>

        {/* FOOTER DECORATIVO */}
        <div className="bg-gray-950 p-3 text-center border-t border-gray-800">
          <p className="text-[10px] text-gray-600 font-mono">SYSTEM_READY // INSERT_DATA</p>
        </div>
      </div>
    </div>
  );
}
