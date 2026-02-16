"use client";

import { useState } from "react";
import { UsuariosAPI } from "@/services/usuario.service";
import BotonBuscar from "@/components/ui/button/BotonBuscar";

export default function Page() {
  const [usuario, setUsuario] = useState(null);
  const [idBusqueda, setIdBusqueda] = useState("");
  const [cargando, setCargando] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contrasena_hash: "",
    rol: "admin",
    activo: 1,
  });

  const inputStyle =
    "w-full px-6 py-3 rounded-full bg-gray-800 text-white border-2 border-transparent focus:border-green-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all font-bold placeholder:text-gray-500";
  const labelStyle = "text-[10px] uppercase font-black text-blue-400 mb-1 tracking-widest block";

  const handleBuscar = async () => {
    if (!idBusqueda) {
      return alert("Ingresa un ID numérico válido.");
    }

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

      setFormData({
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

  const handleActualizar = async (e) => {
    e.preventDefault();
    if (!usuario) return;
    setCargando(true);
    try {
      await UsuariosAPI.update(usuario.id, formData);
      alert("✅ Usuario actualizado (Datos y Estado guardados)");
    } catch (e) {
      alert("❌ Error al actualizar");
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
      alert("Usuario eliminado");
      setUsuario(null);
    } catch {
      alert("Error al eliminar");
    } finally {
      setCargando(false);
    }
  };

  const handleCrearNuevo = async () => {
    setCargando(true);
    try {
      const creado = await UsuariosAPI.create(formData);

      setUsuario({
        id: creado.id_usuario,
        nombre: creado.nombre,
        correo: creado.correo,
        contrasena_hash: creado.contrasena_hash,
        rol: creado.rol,
        activo: creado.activo,
      });

      alert(`Usuario creado con ID ${creado.id_usuario}`);
    } catch {
      alert("Error al crear");
    } finally {
      setCargando(false);
    }
  };

  const handleCerrar = () => {
    setUsuario(null);
    setFormData({
      nombre: "",
      correo: "",
      contrasena_hash: "",
      rol: "admin",
    });
    setIdBusqueda("");
  };

  return (
    <div className="flex flex-col min-h-full w-full items-center justify-start p-6 mt-2 bg-transparent">
      <div className="w-full max-w-2xl relative">
        {!usuario && (
          <div className="bg-gray-900 border border-gray-700 rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gray-800 p-8 border-b-4 border-green-600">
              <h1 className="text-3xl font-black text-white uppercase">
                Editando{" "}
                <span className="text-blue-500 underline decoration-yellow-400 decoration-4">
                  Registro #{usuario?.id ?? "?"}
                </span>
              </h1>
              <p className="text-[10px] uppercase tracking-[3px] font-bold text-gray-400 mt-2">Base de Datos Central</p>
            </div>

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
                <div className="flex justify-end">
                  <BotonBuscar onClick={handleBuscar} disabled={cargando} />
                </div>
              </div>
            </div>
          </div>
        )}

        {usuario && (
          <div className="bg-gray-900 border border-blue-500/30 rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gray-800 p-3 border-b-4 border-blue-600">
              <h1 className="text-3xl font-black text-white uppercase">
                Editando{" "}
                <span className="text-blue-500 underline decoration-yellow-400 decoration-4">
                  Registro #{usuario.id}
                </span>
              </h1>
            </div>

            <div className="p-8">
              <div className="bg-gray-800/50 p-4 rounded-2xl border border-gray-700">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleActualizar(e);
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {/* NOMBRE */}
                  <div className="flex flex-col">
                    <label className={labelStyle}>Nombre Completo</label>
                    <input
                      className={inputStyle}
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    />
                  </div>

                  {/* CORREO */}
                  <div className="flex flex-col">
                    <label className={labelStyle}>Correo</label>
                    <input
                      type="email"
                      className={`${inputStyle} border-blue-900/50`}
                      value={formData.correo}
                      onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                    />
                  </div>

                  {/* ROL */}
                  <div className="flex flex-col">
                    <label className={labelStyle}>Rol</label>
                    <select
                      className={inputStyle}
                      value={formData.rol}
                      onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                    >
                      <option value="admin">Administrador</option>
                      <option value="vendedor">Vendedor</option>
                      <option value="auditor">Auditor</option>
                      <option value="comprador">Comprador</option>
                    </select>
                  </div>

                  {/* ESTADO */}
                  <div className="flex flex-col">
                    <label className={labelStyle}>Estado</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, activo: 1 })}
                        className={`flex-1 py-2 text-xs font-black rounded-lg border-2 ${
                          formData.activo === 1 ? "border-green-500 text-green-400" : "border-gray-700 text-gray-500"
                        }`}
                      >
                        ACTIVO
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, activo: 0 })}
                        className={`flex-1 py-2 text-xs font-black rounded-lg border-2 ${
                          formData.activo === 0 ? "border-red-500 text-red-400" : "border-gray-700 text-gray-500"
                        }`}
                      >
                        INACTIVO
                      </button>
                    </div>
                  </div>

                  {/* BOTÓN ÚNICO */}
                  <div className="md:col-span-2 flex justify-end pt-4 border-t border-gray-800">
                    <button
                      type="submit"
                      disabled={cargando}
                      className="px-6 py-2 text-xs rounded-full bg-blue-600 text-white font-black border-2 border-yellow-400 uppercase"
                    >
                      💾 Actualizar Usuario
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
