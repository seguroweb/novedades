"use client"

import { useState } from "react"
import {
  Bell,
  Calendar,
  ChevronDown,
  ClipboardList,
  Download,
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
  Plus,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import Sidebar from "@/app/components/Sidebar"
import MobileMenu from "@/app/components/MobileMenu"
import ConsultaOperacionesForm from "@/app/components/forms/ConsultaOperacionesForm"

// Componente principal de Consulta de Operaciones
export default function ConsultaOperaciones() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    buscarPor: "Fecha",
    tipo: "Vendedor",
    estados: "Abiertos",
    fechaDesde: "26/05/2025",
    fechaHasta: "10/06/2025",
    formaPago: "Todas",
    estado: "Todos",
    producto: "Todos",
    compania: "Todos",
    tipoOperaciones: "Todas",
    canalesVenta: "Todos",
    ranking: "Todos",
    opciones: "Vendedor actual",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Datos del formulario:", formData)
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
                  <span className="text-gray-500">Operaciones</span>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li>
                  <span className="text-gray-900 font-medium">Consulta</span>
                </li>
              </ol>
            </nav>

            {/* Page header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Consulta de Operaciones</h1>
              <p className="text-gray-600 mt-1">Busca y filtra operaciones según tus criterios</p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Primera fila */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="buscarPor" className="block text-sm font-medium text-gray-700 mb-2">
                        Buscar por:
                      </label>
                      <select
                        id="buscarPor"
                        name="buscarPor"
                        value={formData.buscarPor}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Fecha">Fecha</option>
                        <option value="Cliente">Cliente</option>
                        <option value="Poliza">Póliza</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tipo:</label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="tipo"
                            value="Vendedor"
                            checked={formData.tipo === "Vendedor"}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700">Vendedor</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="tipo"
                            value="At.cliente"
                            checked={formData.tipo === "At.cliente"}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700">At.cliente</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="estados" className="block text-sm font-medium text-gray-700 mb-2">
                        Estados:
                      </label>
                      <select
                        id="estados"
                        name="estados"
                        value={formData.estados}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Abiertos">Abiertos</option>
                        <option value="Cerrados">Cerrados</option>
                        <option value="Todos">Todos</option>
                      </select>
                    </div>
                  </div>

                  {/* Segunda fila - Fechas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fechaDesde" className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha desde:
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          id="fechaDesde"
                          name="fechaDesde"
                          value="2025-05-26"
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="fechaHasta" className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha hasta:
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          id="fechaHasta"
                          name="fechaHasta"
                          value="2025-06-10"
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Tercera fila */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="formaPago" className="block text-sm font-medium text-gray-700 mb-2">
                        Forma de Pago:
                      </label>
                      <select
                        id="formaPago"
                        name="formaPago"
                        value={formData.formaPago}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Todas">Todas</option>
                        <option value="Efectivo">Efectivo</option>
                        <option value="Tarjeta">Tarjeta</option>
                        <option value="Transferencia">Transferencia</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-2">
                        Estado:
                      </label>
                      <select
                        id="estado"
                        name="estado"
                        value={formData.estado}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Todos">Todos</option>
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                        <option value="Pendiente">Pendiente</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="producto" className="block text-sm font-medium text-gray-700 mb-2">
                        Producto:
                      </label>
                      <select
                        id="producto"
                        name="producto"
                        value={formData.producto}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Todos">Todos</option>
                        <option value="Seguro Auto">Seguro Auto</option>
                        <option value="Seguro Hogar">Seguro Hogar</option>
                        <option value="Seguro Vida">Seguro Vida</option>
                      </select>
                    </div>
                  </div>

                  {/* Cuarta fila */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="compania" className="block text-sm font-medium text-gray-700 mb-2">
                        Compañía:
                      </label>
                      <select
                        id="compania"
                        name="compania"
                        value={formData.compania}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Todos">Todos</option>
                        <option value="Allianz">Allianz</option>
                        <option value="Zurich">Zurich</option>
                        <option value="La Caja">La Caja</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="tipoOperaciones" className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Operaciones:
                      </label>
                      <select
                        id="tipoOperaciones"
                        name="tipoOperaciones"
                        value={formData.tipoOperaciones}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Todas">Todas</option>
                        <option value="Venta">Venta</option>
                        <option value="Renovación">Renovación</option>
                        <option value="Modificación">Modificación</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="canalesVenta" className="block text-sm font-medium text-gray-700 mb-2">
                        Canales de venta:
                      </label>
                      <select
                        id="canalesVenta"
                        name="canalesVenta"
                        value={formData.canalesVenta}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Todos">Todos</option>
                        <option value="Presencial">Presencial</option>
                        <option value="Telefónico">Telefónico</option>
                        <option value="Online">Online</option>
                      </select>
                    </div>
                  </div>

                  {/* Quinta fila */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="ranking" className="block text-sm font-medium text-gray-700 mb-2">
                        Ranking:
                      </label>
                      <select
                        id="ranking"
                        name="ranking"
                        value={formData.ranking}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Todos">Todos</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="opciones" className="block text-sm font-medium text-gray-700 mb-2">
                        Opciones:
                      </label>
                      <select
                        id="opciones"
                        name="opciones"
                        value={formData.opciones}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Vendedor actual">Vendedor actual</option>
                        <option value="Todos los vendedores">Todos los vendedores</option>
                        <option value="Mi equipo">Mi equipo</option>
                      </select>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      Ver
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      Nueva
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                    >
                      <AlertTriangle className="h-4 w-4" />
                      Alerta
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-md font-medium transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      Descargar Excel
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <ConsultaOperacionesForm
                  formData={formData}
                  onChange={handleInputChange}
                  onSubmit={handleSubmit}
                />
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}
