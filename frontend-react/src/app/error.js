"use client";

import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-9xl font-black text-gray-800">404</h1>
          <div className="h-1 w-20 bg-blue-600 mx-auto mt-4"></div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Página no encontrada</h2>
        <p className="text-gray-600 mb-8">
          La página que buscas no existe o ha sido movida a otra ubicación.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            Ir al Inicio
          </Link>
          <Link
            href="/usuarios"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium transition-colors"
          >
            Ver Usuarios
          </Link>
        </div>
      </div>

      <footer className="mt-12 text-gray-500 text-sm">
        © 2026 Sistema de Facturación Electrónica
      </footer>
    </div>
  );
}
