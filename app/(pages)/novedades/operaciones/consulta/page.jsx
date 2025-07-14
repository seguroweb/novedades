"use client"

import { useEffect, useState } from "react"
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
  ArrowDownUp,
  Printer,
  CheckCircle,
  Edit,
  Trash2,
  MoreHorizontal,
  User2,
  UserCircle,
  Filter,
  UserCircleIcon,
} from "lucide-react"
import Link from "next/link"
import Sidebar from "@/app/components/Sidebar"
import MobileMenu from "@/app/components/MobileMenu"
import ConsultaOperacionesForm from "@/app/components/forms/ConsultaOperacionesForm"
import { API_URL } from "@/app/constants/api"
import { TableSkeleton } from "./loading"
import { EditOperationModal } from "@/app/components/modals/EditOperationModal"

// Componente principal de Consulta de Operaciones
export default function ConsultaOperaciones() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showResults, setShowResults] = useState(true) // State to control table visibility
  const [operations, setOperations] = useState([]) // State to store fetched operations
  const [isLoading, setIsLoading] = useState(false) // State for loading indicator
  const [fetchError, setFetchError] = useState(null) // State for fetch errors
  const [isFilterOpen, setIsFilterOpen] = useState(false) // State to control filter section visibility
  const [isModalOpen, setIsModalOpen] = useState(false) // State for modal visibility
  const [selectedOperation, setSelectedOperation] = useState(null) // State to hold data of the operation being edited

  const [formData, setFormData] = useState({
    buscarPor: "Fecha",
    tipo: "Vendedor",
    estados: "Abiertos",
    fechaDesde: "2025-05-26",
    fechaHasta: "2025-06-10",
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

  const getStatusClasses = (status) => {
    switch (status) {
      case "Pending":
        return "bg-orange-100 text-orange-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Refunded":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Function to fetch operations from the backend
  const fetchOperations = async () => {
    setIsLoading(true)
    setFetchError(null)
    setOperations([]) // Clear previous results
    try {
      // Replace with your actual backend URL
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/operations`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log(data)
      // Assuming the backend returns data in a format similar to operationsData
      // You might need to transform the data here if the backend structure is different
      setOperations(data)
    } catch (error) {
      console.error("Error fetching operations:", error)
      setFetchError("Error al cargar las operaciones. Por favor, inténtelo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Datos del formulario:", formData)
    setShowResults(true) // Show the results section container
    fetchOperations() // Trigger data fetch
  }

  useEffect(() => {
    fetchOperations()
  }, [])

  const handleEditClick = (operation) => {
    setSelectedOperation(operation)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedOperation(null)
  }

  const handleSaveOperation = (updatedOperation) => {
    console.log("Guardar operación:", updatedOperation)
    // Here you would typically send the updatedOperation to your backend
    // For now, let's update the local state to reflect the change
    setOperations((prevOperations) =>
      prevOperations.map((op) => (op.nro === updatedOperation.nro ? updatedOperation : op)),
    )
    handleModalClose()
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
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Consulta de Operaciones</h1>
                <p className="text-gray-600 mt-1">Busca y filtra operaciones según tus criterios</p>
              </div>
              <div className="flex gap-3">
                <Link href={"/novedades/operaciones/consulta/nueva-operacion"}>
                  <button
                    type="button"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Nueva Operación
                  </button>
                </Link>
                <button
                  type="button"
                  className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md text-sm transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Descargar Excel
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 rounded-md text-sm transition-colors"
                >
                  <AlertTriangle className="h-4 w-4" />
                  Alerta
                </button>
              </div>
            </div>

            {/* Form */}
            {/* Filter Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 pb-0">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center justify-between w-full text-lg font-semibold text-gray-900 mb-4 pb-4 border-b border-gray-200"
                >
                  <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-blue-600" />
                    <span>Filtros de Búsqueda</span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              {isFilterOpen && (
                <div className="p-6 pt-0 transition-all duration-300 ease-in-out">
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
                            value={formData.fechaDesde}
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
                            value={formData.fechaHasta}
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
                        Aplicar filtros
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Results Table */}
            {showResults && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6 overflow-x-auto">
                {isLoading ? (
                  <TableSkeleton />
                ) : fetchError ? (
                  <div className="text-center py-8 text-red-600">{fetchError}</div>
                ) : operations.length === 0 ? (
                  <div className="text-center py-8 text-gray-600">No hay resultados aún.</div>
                ) : (
                  <>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg"
                          >
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Nro
                            <ArrowDownUp className="inline-block ml-1 h-3 w-3" />
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Producto
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Vendedor
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Fecha
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Primera gestión
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Cliente
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            CP
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Teléfono
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Forma pago
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Estado
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Estado de emisión
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Motivo baja
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Canal venta
                            <ArrowDownUp className="inline-block ml-1 h-3 w-3" />
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Ultima gestion
                            <ArrowDownUp className="inline-block ml-1 h-3 w-3" />
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Proximo contacto
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg"
                          >
                            Acción
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {operations.map((row, index) => (
                          <tr key={index} className="hover:bg-gray-50 text-gray-900 text-sm">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600 rounded" />
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-gray-900 font-medium">{row.numero}</td>
                            <td className="px-4 py-3 whitespace-nowrap">{row?.product.descripcion}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {row?.seller?.nombre}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">{row.fecha}</td>
                            <td className="px-4 py-3 whitespace-nowrap">{row.primeraGestion}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <UserCircleIcon />
                                <span>{row.nombre}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">{row.codigo_postal}</td>
                            <td className="px-4 py-3 whitespace-nowrap">{row.telefono}</td>
                            <td className="px-4 py-3 whitespace-nowrap">{row.email}</td>
                            <td className="px-4 py-3 whitespace-nowrap">{row?.paymentMethod?.description ?? '-'}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(row.status)}`}
                              >
                                {row.status.descripcion}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">{row?.acStatus?.descripcion ?? '-'}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {row?.cancellationReason?.descripcion ?? '-'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {row.channel.descripcion}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">{row.ultimaGestion}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center gap-1">
                                <input
                                  type="date"
                                  value={row.proximoContacto}
                                  className="w-28 rounded-md border border-gray-300 py-1 px-2 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <button className="text-gray-600 hover:text-blue-600 p-1 rounded-md hover:bg-gray-100" onClick={() => handleEditClick(row)}>
                                  <Edit className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* Pagination */}
                    <nav className="flex items-center justify-between px-4 py-3 sm:px-6">
                      <div className="flex-1 flex justify-between sm:hidden">
                        <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                          Previous
                        </button>
                        <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                          Next
                        </button>
                      </div>
                      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm text-gray-700">
                            Mostrando <span className="font-medium">1</span> a{" "}
                            <span className="font-medium">{operations.length}</span> de{" "}
                            <span className="font-medium">{operations.length}</span> entradas
                          </p>
                        </div>
                        <div>
                          <nav
                            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                            aria-label="Pagination"
                          >
                            <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                              <span className="sr-only">Previous</span>
                              <ChevronDown className="h-5 w-5 rotate-90" aria-hidden="true" />
                            </button>
                            <button
                              aria-current="page"
                              className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                            >
                              1
                            </button>
                            <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                              <span className="sr-only">Next</span>
                              <ChevronDown className="h-5 w-5 -rotate-90" aria-hidden="true" />
                            </button>
                          </nav>
                        </div>
                      </div>
                    </nav>
                  </>
                )}
              </div>
            )}

          </div>
        </main>
      </div>

      {/* Edit Operation Modal */}
      <EditOperationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        operationData={selectedOperation}
        onSave={handleSaveOperation}
      />
    </div>
  )
}
