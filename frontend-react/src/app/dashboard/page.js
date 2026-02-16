"use client";

import { useEffect, useState } from "react";
import { UsuariosAPI } from "@/services/usuario.service";
import Link from "next/link";

export default function DashboardPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await UsuariosAPI.list();
        setUsuarios(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar usuarios");
      } finally {
        setCargando(false);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <nav className="flex gap-4">
            <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">
              Inicio
            </Link>
            <Link href="/usuarios" className="text-gray-600 hover:text-blue-600 font-medium">
              Usuarios
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Resumen General</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 uppercase">Total Usuarios</h3>
              <p className="text-4xl font-bold text-blue-600 mt-2">
                {cargando ? "..." : usuarios.length}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 uppercase">Usuarios Activos</h3>
              <p className="text-4xl font-bold text-green-600 mt-2">
                {cargando ? "..." : usuarios.filter((u) => Number(u.activo) === 1).length}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 uppercase">Administradores</h3>
              <p className="text-4xl font-bold text-purple-600 mt-2">
                {cargando ? "..." : usuarios.filter((u) => u.rol === "admin").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Últimos Usuarios</h2>
          </div>

          <div className="p-6">
            {cargando ? (
              <p className="text-center text-gray-500 py-8">Cargando usuarios...</p>
            ) : error ? (
              <p className="text-center text-red-500 py-8">{error}</p>
            ) : usuarios.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No hay usuarios registrados.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">ID</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Nombre</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Correo</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Rol</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {usuarios.slice(0, 10).map((u) => (
                      <tr key={u.id_usuario} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700 font-mono">#{u.id_usuario}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 font-medium">{u.nombre}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{u.correo}</td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                              u.rol === "admin"
                                ? "bg-red-100 text-red-700"
                                : u.rol === "vendedor"
                                ? "bg-green-100 text-green-700"
                                : u.rol === "auditor"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {u.rol}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-bold ${
                              Number(u.activo) === 1
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {Number(u.activo) === 1 ? "Activo" : "Inactivo"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {!cargando && usuarios.length > 10 && (
              <div className="mt-6 text-center">
                <Link
                  href="/usuarios"
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Ver todos los usuarios
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-12 py-6 text-center text-gray-500 text-sm border-t">
        © 2026 Sistema de Facturación Electrónica - ADSO S_F_E
      </footer>
    </div>
  );
}
