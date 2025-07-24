"use client";

import {
  BarChart,
  Bell,
  ChevronDown,
  HelpCircle,
  LogOut,
  Mail,
  Menu,
  Newspaper,
  Phone,
  Settings,
  Shield,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Datos de ejemplo
const userInfo = {
  name: "Natalia Mosquera",
  role: "Adriana Suarez",
  vendorId: "293",
  phone: "153",
  mobile: "11 5930 2119",
  email: "adrianas@segurobici.com.ar",
};

// Componentes reutilizados del dashboard
const UserProfile = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
          {user.name.charAt(0)}
        </div>
        <div className="hidden md:block text-left">
          <p className="font-medium text-gray-900">{user.name}</p>
          <p className="text-sm text-gray-500">{user.role}</p>
        </div>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>

          <div className="px-4 py-2 border-b border-gray-100">
            <div className="flex items-center gap-2 py-1">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">
                Vendedor Nro.: {user.vendorId}
              </span>
            </div>
            <div className="flex items-center gap-2 py-1">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">
                Teléfono: {user.phone}
              </span>
            </div>
            <div className="flex items-center gap-2 py-1">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">
                Celular: {user.mobile}
              </span>
            </div>
            <div className="flex items-center gap-2 py-1">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700 break-all">
                {user.email}
              </span>
            </div>
          </div>

          <div className="px-2 py-2">
            <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors">
              <Settings className="h-4 w-4" />
              <span>Configuración</span>
            </button>
            <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
              <LogOut className="h-4 w-4" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Sistemas() {
  // Opciones de sistemas
  const systems = [
    {
      id: "novedades",
      name: "Novedades",
      description: "Accede a las últimas noticias y actualizaciones.",
      icon: Newspaper,
      url: "/novedades",
    },
    {
      id: "novedades-productores",
      name: "Novedades Productores",
      description: "Información relevante para productores y socios.",
      icon: Users,
      url: "/novedades-productores",
    },
    {
      id: "gys",
      name: "GyS",
      description: "Gestión y seguimiento de operaciones y clientes.",
      icon: Shield,
      url: "/gys",
    },
    {
      id: "estadisticas",
      name: "Estadísticas",
      description: "Análisis de datos y reportes de rendimiento.",
      icon: BarChart,
      url: "/estadisticas",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="max-w-4xl w-full bg-white rounded-lg border border-gray-100 shadow-sm p-8 text-center dark:bg-gray-800 dark:border-gray-700">
          <h1 className="text-3xl font-bold text-gray-900 mb-1 dark:text-gray-100">
            Seleccioná un Sistema
          </h1>
          <p className="text-gray-600 mb-8 dark:text-gray-300">
            Elige el sistema al que deseas acceder para continuar.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {systems.map((system) => (
              <Link href={system.url}>
                <div
                  key={system.id}
                  // onClick={() => handleSystemSelect(system.id)}
                  className="flex flex-col items-center p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 ease-in-out cursor-pointer border border-blue-200 shadow-sm dark:bg-blue-900 dark:hover:bg-blue-800 dark:border-blue-700"
                >
                  <system.icon className="h-12 w-12 text-blue-600 mb-4 dark:text-blue-400" />
                  <h2 className="text-xl font-semibold text-blue-800 mb-2 dark:text-blue-200">
                    {system.name}
                  </h2>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {system.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
