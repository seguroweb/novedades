"use client"

import { useState } from "react"
import {
  Bell,
  ChevronDown,
  ClipboardList,
  FileText,
  Grid3X3,
  HelpCircle,
  Home,
  LogOut,
  Mail,
  Menu,
  Phone,
  Search,
  Settings,
  Shield,
  User,
  X,
  Eye,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Sidebar from "../../../../components/Sidebar"
import MobileMenu from "../../../../components/MobileMenu"

// Datos de ejemplo
const userInfo = {
  name: "Natalia Mosquera",
  role: "Adriana Suarez",
  vendorId: "293",
  phone: "153",
  mobile: "11 5930 2119",
  email: "adrianas@segurobici.com.ar",
}

// Componente principal de Bloquear DNI
export default function BloquearDNI() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dni, setDni] = useState("")
  const [showList, setShowList] = useState(false)
  const [dniList, setDniList] = useState([
    { dni: "30123456", fecha: "10/06/2025", usuario: "admin" },
    { dni: "28987654", fecha: "08/06/2025", usuario: "supervisor" },
    { dni: "33456789", fecha: "05/06/2025", usuario: "natalia" },
  ])

  const handleBloquearDNI = (e) => {
    e.preventDefault()
    if (dni.trim() !== "") {
      // Aquí iría la lógica para bloquear el DNI en el backend
      alert(`DNI ${dni} bloqueado correctamente`)
      setDniList([{ dni: dni, fecha: new Date().toLocaleDateString(), usuario: "natalia" }, ...dniList])
      setDni("")
    } else {
      alert("Por favor ingrese un DNI válido")
    }
  }

  const handleListarDNI = () => {
    setShowList(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <Sidebar />
      </MobileMenu>

      {/* Main content */}
      <div className="flex">
        {/* Desktop sidebar */}
        <div className="hidden lg:block w-64 border-r border-gray-200 h-[calc(100vh-64px)] sticky top-16">
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumbs */}
            <div className="text-sm text-gray-500 mb-6">
              <Link href="/dashboard" className="hover:text-blue-600">
                Inicio
              </Link>{" "}
              /{" "}
              <Link href="#" className="hover:text-blue-600">
                Gestión
              </Link>{" "}
              / Bloquear DNI
            </div>

            {/* Título principal */}
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <Shield className="text-green-600 h-5 w-5" />
              </div>
              <h1 className="text-2xl font-bold">Bloquear DNI</h1>
            </div>

            {/* Descripción */}
            <p className="text-gray-600 mb-6">Gestiona el bloqueo de DNIs para prevenir operaciones no autorizadas</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {/* Formulario de bloqueo */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                  <form onSubmit={handleBloquearDNI}>
                    <div className="mb-4">
                      <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-1">
                        DNI:
                      </label>
                      <input
                        type="text"
                        id="dni"
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ingrese el DNI a bloquear"
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center"
                      >
                        <Shield className="mr-2 h-4 w-4" /> Bloquear DNI
                      </button>

                      <button
                        type="button"
                        onClick={handleListarDNI}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                      >
                        <Eye className="mr-2 h-4 w-4" /> Listar DNI
                      </button>
                    </div>
                  </form>
                </div>

                {/* Lista de DNIs bloqueados */}
                {showList && (
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-4 bg-green-50 border-l-4 border-green-500">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <Shield className="text-green-600 h-4 w-4" />
                        </div>
                        <h2 className="text-lg font-semibold">DNIs Bloqueados</h2>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Lista de DNIs que han sido bloqueados en el sistema</p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              DNI
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Fecha de Bloqueo
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Usuario
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {dniList.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {item.dni}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.fecha}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.usuario}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
