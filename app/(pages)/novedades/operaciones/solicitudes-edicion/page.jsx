"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Check,
  XIcon,
  Home,
  ClipboardList,
  FileText,
  Settings,
  Grid3X3,
  Bell,
  ChevronDown,
  HelpCircle,
  LogOut,
  Mail,
  Menu,
  Phone,
  Search,
  Shield,
  User,
  Download,
  Plus,
} from "lucide-react"
import { usePathname } from "next/navigation"
import Sidebar from "../../../../components/Sidebar"
import { TableSkeleton } from "../consulta/loading"

// Datos de ejemplo para el perfil de usuario
const userInfo = {
  name: "Natalia Mosquera",
  role: "Adriana Suarez",
  vendorId: "293",
  phone: "153",
  mobile: "11 5930 2119",
  email: "adrianas@segurobici.com.ar",
}

// Componentes reutilizados del dashboard
const UserProfile = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false)

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
              <span className="text-sm text-gray-700">Vendedor Nro.: {user.vendorId}</span>
            </div>
            <div className="flex items-center gap-2 py-1">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">Teléfono: {user.phone}</span>
            </div>
            <div className="flex items-center gap-2 py-1">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">Celular: {user.mobile}</span>
            </div>
            <div className="flex items-center gap-2 py-1">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700 break-all">{user.email}</span>
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
  )
}

const MobileMenu = ({ isOpen, onClose, children }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <span className="font-semibold text-lg text-blue-600">SeguroWeb</span>
          </div>
          <button onClick={onClose} className="p-2 rounded-md text-gray-500 hover:bg-gray-100">
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-64px)]">{children}</div>
      </div>
    </>
  )
}

export default function SolicitudesEdicionPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Mock data for demonstration
  const mockRequests = [
    {
      id: 6,
      numSolicitud: "546335",
      operacion: "Macarena Ascueta",
      vendedor: "Juan Perez", // Added vendor for consistency with table
      fechaSolicitud: "2024-07-23",
      horaSolicitud: "13:38:01",
      mensaje:
        "YAMINOEURRICH@GMAIL.COM SOLICITO CAMBIAR EL EMAIL QUE FIGURA EN NOVEDADES, POR ESTE QUE ENVIO! GRACIAS!!",
      estado: "En revision",
    },
    {
      id: 5,
      numSolicitud: "545828",
      operacion: "Daniela Oyoque",
      vendedor: "Maria Lopez",
      fechaSolicitud: "2024-07-17",
      horaSolicitud: "14:17:29",
      mensaje: "Necesito cambio el medio de pago",
      estado: "En revision",
    },
    {
      id: 3,
      numSolicitud: "540139",
      operacion: "Adriana Suarez",
      vendedor: "Carlos Gomez",
      fechaSolicitud: "2024-06-04",
      horaSolicitud: "11:38:42",
      mensaje: "EL MEDIO DE PAGO FUE tarjeta de credito no cbu",
      estado: "En revision",
    },
    {
      id: 2,
      numSolicitud: "542477",
      operacion: "Adriana Suarez",
      vendedor: "Laura Fernandez",
      fechaSolicitud: "2024-06-04",
      horaSolicitud: "11:14:43",
      mensaje: "FINALMENTE LA CLIENTA CONTRATO ELS EGURO CON tarjeta de credito, cambiar medio de pago",
      estado: "En revision",
    },
  ]

  useEffect(() => {
    // Simulate API call
    setLoading(true)
    setError(null)
    setTimeout(() => {
      setRequests(mockRequests)
      setLoading(false)
    }, 1000)
  }, [])

  const handleApprove = (id) => {
    console.log(`Aprobar solicitud ${id}`)
    // Lógica para aprobar la solicitud
  }

  const handleReject = (id) => {
    console.log(`Rechazar solicitud ${id}`)
    // Lógica para rechazar la solicitud
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
            {/* Breadcrumb */}
            <nav className="flex mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
                    Inicio
                  </Link>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li>
                  <Link href="/dashboard/consultas" className="text-gray-500 hover:text-gray-700">
                    Consultas
                  </Link>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li>
                  <span className="text-gray-900 font-medium">Solicitudes de Edición</span>
                </li>
              </ol>
            </nav>

            {/* Page header with buttons */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Solicitudes de Edición</h1>
                <p className="text-gray-600 mt-1">Aquí puedes gestionar las solicitudes de edición de operaciones.</p>
              </div>
            </div>

            {/* Requests Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {loading ? (
                <TableSkeleton />
              ) : error ? (
                <div className="text-center p-8 text-red-600">
                  <p>Error al cargar las solicitudes: {error}</p>
                  <p>Por favor, inténtalo de nuevo más tarde.</p>
                </div>
              ) : requests.length === 0 ? (
                <div className="text-center p-8 text-gray-600">
                  <p>No se encontraron solicitudes de edición.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Num Solicitud
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Operación
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Vendedor
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Fecha solicitud
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Mensaje
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Estado
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Acciones</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {requests.map((request, index) => (
                        <tr key={request.id} className={"bg-white"}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {request.numSolicitud}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{request.operacion}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{request.vendedor}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            <div>{request.fechaSolicitud}</div>
                            <div className="text-xs text-gray-600">{request.horaSolicitud}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">{request.mensaje}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                request.estado === "En revision"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : request.estado === "Aprobada"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {request.estado}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleApprove(request.id)}
                                className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-50"
                                title="Aprobar"
                              >
                                <Check className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleReject(request.id)}
                                className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                                title="Rechazar"
                              >
                                <XIcon className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
