"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SubMenuUsuarios() {
  const pathname = usePathname();

  const isActive = (route) => pathname === route;

  // Estilos base para los botones
  const activeStyle =
    "px-6 py-2 rounded-full bg-blue-600 text-white font-black shadow-[0_0_20px_rgba(250,204,21,0.4)] scale-105 border-2 border-yellow-400 ring-2 ring-yellow-400/30 transition-all animate-pulse";

  const inactiveStyle =
    "px-6 py-2 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-all border-2 border-transparent font-bold";

  return (
    <div className="mb-3 text-center" style={{ animation: "fadeSlide 0.5s ease-out" }}>
      <h1 className="text-3xl font-black text-white-800 mb-6 tracking-tight uppercase">
        Sistema de Gestión <span className="text-blue-600">Usuarios</span>
      </h1>

      <div className="w-full flex justify-center">
        <div className="bg-gray-900 py-4 px-5 rounded-2xl shadow-2xl flex flex-wrap gap-4 w-full max-w-5xl justify-center items-center border border-gray-700">
          <Link href="/">
            <button className={isActive("/") ? activeStyle : inactiveStyle}>🏠 Inicio</button>
          </Link>

          <Link href="/usuarios">
            <button className={isActive("/usuarios") ? activeStyle : inactiveStyle}>📋 Listado</button>
          </Link>

          <Link href="/usuarios/Create">
            <button className={isActive("/usuarios/Create") ? activeStyle : inactiveStyle}>➕ Nuevo</button>
          </Link>

          <Link href="/usuarios/Id">
            <button className={isActive("/usuarios/Id") ? activeStyle : inactiveStyle}>🔍 Buscar ID</button>
          </Link>

          <Link href="/usuarios/Update">
            <button className={isActive("/usuarios/Update") ? activeStyle : inactiveStyle}>✏️ Editar</button>
          </Link>

          <Link href="/usuarios/Delete">
            <button className={isActive("/usuarios/Delete") ? activeStyle : inactiveStyle}>🗑️ Eliminar</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
