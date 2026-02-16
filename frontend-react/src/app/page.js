// app/page.js
"use client";

export default function Home() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-gray-50 p-4">
      {/* Icono Principal */}
      <div className="mb-10 relative">
        <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 animate-pulse"></div>
        <div className="relative bg-white p-8 rounded-full shadow-xl border border-gray-100">
          <span className="text-8xl">🛡️</span>
        </div>
      </div>

      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter">
          Bienvenido al <span className="text-blue-600">Portal de Gestión</span>
        </h1>
        <p className="text-gray-500 text-lg mb-10 font-medium">
          Administra de forma segura la base de datos de usuarios, roles y permisos del sistema.
        </p>
      </div>

      <a
        href="/usuarios"
        className="px-8 py-4 rounded-full text-white text-xl font-bold shadow-lg bg-gradient-to-r from-blue-600 to-indigo-700 hover:scale-105 transition-transform duration-300"
      >
        Iniciar CRUD Usuarios
      </a>

      {/* Footer integrado */}
      <div className="absolute bottom-10 flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
        <span>⚡ Powered by ADSO S_F_E</span>
      </div>
    </div>
  );
}
