"use client"

import { useEffect, useState, useRef } from "react"
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
  ArrowDown,
  CalendarDays,
} from "lucide-react"
import Link from "next/link"
import Sidebar from "@/app/components/Sidebar"
import MobileMenu from "@/app/components/MobileMenu"
import ConsultaOperacionesForm from "@/app/components/forms/ConsultaOperacionesForm"
import { API_URL } from "@/app/constants/api"
import { TableSkeleton } from "./loading"
import { EditOperationModal } from "@/app/components/modals/EditOperationModal"
import Button from "@/app/components/Button"
import Pagination from "@/app/components/Pagination"
import { useRouter, useSearchParams } from "next/navigation"
import useFilters from "@/app/hooks/useFilters"

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

  // States for custom dropdowns
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false)
  
  // Refs for click outside detection
  const filterButtonRef = useRef(null)
  const filterMenuRef = useRef(null)
  const sortButtonRef = useRef(null)
  const sortMenuRef = useRef(null)

  // Paginación
  const router = useRouter()
  const searchParams = useSearchParams()

  const pageParam = searchParams.get('page')
  const [page, setPage] = useState(Number(pageParam) || 1)
  const [limit] = useState(10) 
  const [total, setTotal] = useState(50)

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage)
    router.push(`?${params.toString()}`)
    setPage(newPage)
  }

  useEffect(() => {
    setPage(Number(pageParam) || 1)
  }, [pageParam])
  
  const [formData, setFormData] = useState({
    buscarPor: "",
    tipo: "",
    estados: "",
    fechaDesde: "",
    fechaHasta: "",
    formaPago: "",
    estado: "",
    producto: "",
    compania: "",
    tipoOperaciones: "",
    canalesVenta: "",
    ranking: "",
    opciones: "",
  })

  useEffect(() => {
    const initialData = {
      buscarPor: searchParams.get('buscarPor') || '',
      tipo: searchParams.get('tipo') || '',
      estados: searchParams.get('estados') || '',
      fechaDesde: searchParams.get('fechaDesde') || '',
      fechaHasta: searchParams.get('fechaHasta') || '',
      formaPago: searchParams.get('formaPago') || '',
      estado: searchParams.get('estado') || '',
      producto: searchParams.get('producto') || '',
      compania: searchParams.get('compania') || '',
      tipoOperaciones: searchParams.get('tipoOperaciones') || '',
      canalesVenta: searchParams.get('canalesVenta') || '',
      ranking: searchParams.get('ranking') || '',
      opciones: searchParams.get('opciones') || '',
    }
    setFormData(initialData)
  }, [])

  const { filters, handleChange, handleSubmit } = useFilters(formData)
  
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
    const params = new URLSearchParams(searchParams.toString())

    setIsLoading(true)
    setFetchError(null)
    setOperations([]) // Clear previous results
    try {
      // Replace with your actual backend URL
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/operations?page=${page}&limit=${limit}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const operaciones = await response.json()
      console.log(operaciones)
      // Assuming the backend returns data in a format similar to operationsData
      // You might need to transform the data here if the backend structure is different
      setOperations(operaciones.data)
      setTotal(operaciones.total)
    } catch (error) {
      console.error("Error fetching operations:", error)
      setFetchError("Error al cargar las operaciones. Por favor, inténtelo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   console.log("Datos del formulario:", formData)
  //   //setShowResults(true) // Show the results section container
  //   fetchOperations() // Trigger data fetch
  // }

  useEffect(() => {
    fetchOperations()
  }, [page, searchParams])

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

    // Click outside logic for filter and sort menus
    useEffect(() => {
      const handleClickOutside = (event) => {
        // Filter menu
        if (
          filterMenuRef.current &&
          !filterMenuRef.current.contains(event.target) &&
          filterButtonRef.current &&
          !filterButtonRef.current.contains(event.target)
        ) {
          setIsFilterMenuOpen(false)
        }
        // Sort menu
        if (
          sortMenuRef.current &&
          !sortMenuRef.current.contains(event.target) &&
          sortButtonRef.current &&
          !sortButtonRef.current.contains(event.target)
        ) {
          setIsSortMenuOpen(false)
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [])

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
                          onChange={handleChange}
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
                              onChange={handleChange}
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
                              onChange={handleChange}
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
                          onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                          onChange={handleChange}
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
                          onChange={handleChange}
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
                          onChange={handleChange}
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
                          onChange={handleChange}
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
                          onChange={handleChange}
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
                          onChange={handleChange}
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
                          onChange={handleChange}
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
                          onChange={handleChange}
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

            {/* Table Header with Filter and Sort Buttons */}
            <div className="flex justify-end gap-2 mb-4 mt-4 relative">
              {/* Sort Button and Dropdown */}
              <div className="relative">
                <Button
                  ref={sortButtonRef}
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                >
                  <ArrowDown className="h-4 w-4" />
                  Ordenar
                </Button>
                {isSortMenuOpen && (
                  <div
                    ref={sortMenuRef}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10"
                  >
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Fecha (Más reciente)
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Fecha (Más antigua)
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Cliente (A-Z)
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Cliente (Z-A)
                    </button>
                  </div>
                )}
              </div>

              {/* Filter Button and Dropdown */}
              <div className="relative">
                <Button
                  ref={filterButtonRef}
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                >
                  <Filter className="h-4 w-4" />
                  Filtrar
                </Button>
                {isFilterMenuOpen && (
                  <div
                    ref={filterMenuRef}
                    className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-100 p-4 z-10"
                  >
                    <h4 className="text-base font-semibold leading-none mb-4">Filter</h4>

                    {/* Date range */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">Date range</label>
                        <button type="button" className="text-blue-600 text-sm hover:underline">
                          Reset
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label htmlFor="filterDateFrom" className="block text-xs text-gray-500 mb-1">
                            From:
                          </label>
                          <div className="relative">
                            <input type="date" id="filterDateFrom" className="w-full text-sm pr-8" />
                            <CalendarDays className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="filterDateTo" className="block text-xs text-gray-500 mb-1">
                            To:
                          </label>
                          <div className="relative">
                            <input type="date" id="filterDateTo" className="w-full text-sm pr-8" />
                            <CalendarDays className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Activity type */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <label htmlFor="activityType" className="block text-sm font-medium text-gray-700">
                          Activity type
                        </label>
                        <button type="button" className="text-blue-600 text-sm hover:underline">
                          Reset
                        </button>
                      </div>
                      <select
                        id="activityType"
                        className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option>All warehouses</option>
                        <option>Warehouse A</option>
                        <option>Warehouse B</option>
                      </select>
                    </div>

                    {/* Status */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                          Status
                        </label>
                        <button type="button" className="text-blue-600 text-sm hover:underline">
                          Reset
                        </button>
                      </div>
                      <select
                        id="status"
                        className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Pending</option>
                      </select>
                    </div>

                    {/* Keyword search */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <label htmlFor="keywordSearch" className="block text-sm font-medium text-gray-700">
                          Keyword search
                        </label>
                        <button type="button" className="text-blue-600 text-sm hover:underline">
                          Reset
                        </button>
                      </div>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          id="keywordSearch"
                          placeholder="Search..."
                          className="w-full text-sm py-2 pl-10 pr-4"
                        />
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-between gap-2">
                      <button
                        type="button"
                        className="flex-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md font-medium text-sm transition-colors"
                      >
                        Reset all
                      </button>
                      <button
                        type="button"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors"
                        onClick={() => setIsFilterMenuOpen(false)} // Close on apply
                      >
                        Apply now
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Results Table */}
            {showResults && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6 overflow-x-auto">
                <div className="border-b border-gray-200 px-4 py-3">
                  <h2 className="font-medium text-gray-900">Operaciones</h2>
                </div>
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
                    {/* <nav className="flex items-center justify-between px-4 py-3 sm:px-6">
                      <div className="flex-1 flex justify-between sm:hidden">
                      <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        Anterior
                      </button>

                      <button
                        onClick={() => setPage((prev) => prev + 1)}
                        disabled={page * limit >= total}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        Siguiente
                      </button>

                      </div>
                      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm text-gray-700">
                            Mostrando <span className="font-medium">{(page - 1) * limit + 1}</span> a{" "}
                            <span className="font-medium">{Math.min(page * limit, total)}</span> de{" "}
                            <span className="font-medium">{total}</span> entradas
                          </p>
                        </div>
                        <div>
                          <nav
                            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                            aria-label="Pagination"
                          >
                            <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
                              <span className="sr-only">Previous</span>
                              <ChevronDown className="h-5 w-5 rotate-90" aria-hidden="true" />
                            </button>
                            <button
                              aria-current="page"
                              className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                            >
                              1
                            </button>
                            <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" onClick={() => setPage((prev) => prev + 1)}>
                              <span className="sr-only">Next</span>
                              <ChevronDown className="h-5 w-5 -rotate-90" aria-hidden="true" />
                            </button>
                          </nav>
                        </div>
                      </div>
                    </nav> */}
                    <Pagination total={total} page={page} setPage={handlePageChange} limit={limit} />
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
