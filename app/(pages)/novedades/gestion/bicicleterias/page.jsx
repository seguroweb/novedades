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
  Store,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Sidebar from "@/app/components/Sidebar"
import MobileMenu from "@/app/components/MobileMenu"

// Datos de ejemplo
const userInfo = {
  name: "Natalia Mosquera",
  role: "Adriana Suarez",
  vendorId: "293",
  phone: "153",
  mobile: "11 5930 2119",
  email: "adrianas@segurobici.com.ar",
}

// Datos de ejemplo para la tabla de estados
const estadosData = [
  { estado: "9- Baja", cantidad: 58 },
  { estado: "8- Contratado", cantidad: 73 },
  { estado: "7- Pendiente de Cierre", cantidad: 3 },
  { estado: "6- Interesado", cantidad: 1 },
  { estado: "5- Se Coordina Llamado", cantidad: 1 },
  { estado: "Reasignado", cantidad: 2 },
  { estado: "1- NC - 1", cantidad: 1 },
  { estado: "2- NC - 2", cantidad: 2 },
  { estado: "99- Costo enviado", cantidad: 13 },
]

// Total de estados
const totalEstados = estadosData.reduce((sum, item) => sum + item.cantidad, 0)

// Datos de ejemplo para la tabla de comisiones
const comisionesData = [
  {
    bicicleteria: "1979 Bikeshop",
    provincia: "Buenos Aires-GBA",
    localidad: "Berazategui",
    vendedor: "Adriana Suarez",
    producto: "Bicicletas",
    cotizaciones: 1,
    contratadoTotal: 0,
    enEmisionTotal: 0,
    porcentajeVenta: "0%",
    premio: 0,
    prima: 0,
    formaPago: "escala",
  },
  {
    bicicleteria: "Alsina Bike",
    provincia: "Buenos Aires",
    localidad: "Lanús",
    vendedor: "Martin Caceres",
    producto: "Bicicletas",
    cotizaciones: 1,
    contratadoTotal: 1,
    enEmisionTotal: 0,
    porcentajeVenta: "0%",
    premio: 0,
    prima: 0,
    formaPago: "escala",
  },
  {
    bicicleteria: "Apolo Bikes",
    provincia: "Capital Federal",
    localidad: "Villa Urquiza",
    vendedor: "Adriana Suarez",
    producto: "Autos",
    cotizaciones: 1,
    contratadoTotal: 0,
    enEmisionTotal: 0,
    porcentajeVenta: "0%",
    premio: 0,
    prima: 0,
    formaPago: "escala",
  },
  {
    bicicleteria: "Aribikes Bicicleteria",
    provincia: "Buenos Aires-GBA",
    localidad: "Banfield",
    vendedor: "María Paula Alvarez",
    producto: "Bicicletas",
    cotizaciones: 13,
    contratadoTotal: 3,
    enEmisionTotal: 3,
    porcentajeVenta: "23%",
    premio: 399176,
    prima: 199588,
    formaPago: "escala",
  },
  {
    bicicleteria: "Aribikes Bicicleteria",
    provincia: "Buenos Aires-GBA",
    localidad: "Banfield",
    vendedor: "Miranda Telo Lococo",
    producto: "Bicicletas",
    cotizaciones: 1,
    contratadoTotal: 1,
    enEmisionTotal: 1,
    porcentajeVenta: "100%",
    premio: 75667,
    prima: 37833.5,
    formaPago: "escala",
  },
  {
    bicicleteria: "Aribikes Bicicleteria",
    provincia: "Buenos Aires-GBA",
    localidad: "Banfield",
    vendedor: "Raquel Belatti",
    producto: "Bicicletas",
    cotizaciones: 1,
    contratadoTotal: 0,
    enEmisionTotal: 0,
    porcentajeVenta: "0%",
    premio: 0,
    prima: 0,
    formaPago: "escala",
  },
  {
    bicicleteria: "Aribikes Bicicleteria",
    provincia: "Buenos Aires-GBA",
    localidad: "Banfield",
    vendedor: "Raquel Belatti",
    producto: "Autos",
    cotizaciones: 1,
    contratadoTotal: 1,
    enEmisionTotal: 1,
    porcentajeVenta: "100%",
    premio: 84000,
    prima: 42000,
    formaPago: "escala",
  },
  {
    bicicleteria: "Ballejos Bikes",
    provincia: "Buenos Aires",
    localidad: "Lomas del Mirador",
    vendedor: "Lucas Garay",
    producto: "Bicicletas",
    cotizaciones: 1,
    contratadoTotal: 0,
    enEmisionTotal: 0,
    porcentajeVenta: "0%",
    premio: 0,
    prima: 0,
    formaPago: "escala",
  },
  {
    bicicleteria: "Bicicletas Olimpia",
    provincia: "Buenos Aires-GBA",
    localidad: "San Martín",
    vendedor: "Adriana Suarez",
    producto: "Bicicletas",
    cotizaciones: 1,
    contratadoTotal: 0,
    enEmisionTotal: 0,
    porcentajeVenta: "0%",
    premio: 0,
    prima: 0,
    formaPago: "escala",
  },
  {
    bicicleteria: "Bicicletas Pioneer",
    provincia: "Buenos Aires",
    localidad: "San Justo",
    vendedor: "Ramiro Andres Rojas",
    producto: "Bicicletas",
    cotizaciones: 1,
    contratadoTotal: 1,
    enEmisionTotal: 1,
    porcentajeVenta: "100%",
    premio: 105000,
    prima: 52500,
    formaPago: "escala",
  },
]

// Datos de ejemplo para la tabla de listado
const listadoData = [
  {
    nro: 576571,
    producto: "Bicicletas",
    vendedor: "Adriana Suarez",
    bicicleteria: "1979 Bikeshop",
    fechaIngreso: "06/06/2025",
    cliente: "PRUEBA",
    telefono: "1167184843",
    email: "1167184843@gmail.com",
    estado: "9- Baja",
    motivoBaja: "Prueba",
    canalVenta: "Bicicleterias",
    ultimaGestion: "06/06/2025 10:56",
    prima: 0,
  },
  {
    nro: 576548,
    producto: "Bicicletas",
    vendedor: "Martin Caceres",
    bicicleteria: "Alsina Bike",
    fechaIngreso: "05/06/2025",
    cliente: "JULIAN",
    telefono: "1166870696",
    email: "notiene@gmail.com",
    estado: "8- Contratado",
    motivoBaja: "",
    canalVenta: "Bicicleterias",
    ultimaGestion: "12/06/2025 17:55",
    prima: 0,
  },
  {
    nro: 577064,
    producto: "Autos",
    vendedor: "Adriana Suarez",
    bicicleteria: "Apolo Bikes",
    fechaIngreso: "11/06/2025",
    cliente: "prueba nat",
    telefono: "1126154895",
    email: "ggg@gmail.com",
    estado: "9- Baja",
    motivoBaja: "Prueba",
    canalVenta: "Bicicleterias",
    ultimaGestion: "11/06/2025 16:29",
    prima: 0,
  },
  {
    nro: 576166,
    producto: "Bicicletas",
    vendedor: "Maria Paula Alvarez",
    bicicleteria: "Aribikes Bicicleteria",
    fechaIngreso: "02/06/2025",
    cliente: "ivan ry",
    telefono: "1125393340",
    email: "Ivanrevainera8@gmail.com",
    estado: "8- Contratado",
    motivoBaja: "",
    canalVenta: "Bicicleterias",
    ultimaGestion: "05/06/2025 15:57",
    prima: 63469,
  },
  {
    nro: 576167,
    producto: "Bicicletas",
    vendedor: "Maria Paula Alvarez",
    bicicleteria: "Aribikes Bicicleteria",
    fechaIngreso: "02/06/2025",
    cliente: "julian",
    telefono: "1171388116",
    email: "11 7138-8116@gmail",
    estado: "9- Baja",
    motivoBaja: "Ya contrató",
    canalVenta: "Bicicleterias",
    ultimaGestion: "06/06/2025 09:56",
    prima: 0,
  },
  {
    nro: 576168,
    producto: "Bicicletas",
    vendedor: "Raquel Belatti",
    bicicleteria: "Aribikes Bicicleteria",
    fechaIngreso: "05/06/2025",
    cliente: "cristian",
    telefono: "1135834829",
    email: "11 3583-4829@gmail",
    estado: "9- Baja",
    motivoBaja: "Dato Erroneo - Imposible de Contactar",
    canalVenta: "Bicicleterias",
    ultimaGestion: "02/06/2025 11:51",
    prima: 0,
  },
]

// Totales para la tabla de comisiones
const totalComisiones = {
  cotizaciones: comisionesData.reduce((sum, item) => sum + item.cotizaciones, 0),
  contratadoTotal: comisionesData.reduce((sum, item) => sum + item.contratadoTotal, 0),
  enEmisionTotal: comisionesData.reduce((sum, item) => sum + item.enEmisionTotal, 0),
  porcentajeVenta:
    Math.round(
      (comisionesData.reduce((sum, item) => sum + item.contratadoTotal, 0) /
        comisionesData.reduce((sum, item) => sum + item.cotizaciones, 0)) *
        100,
    ) + "%",
  premio: comisionesData.reduce((sum, item) => sum + item.premio, 0),
  prima: comisionesData.reduce((sum, item) => sum + item.prima, 0),
}

// Componente principal de Bicicleterias
export default function Bicicleterias() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("comisiones")
  const [filtros, setFiltros] = useState({
    fechaDesde: "01/06/2025",
    fechaHasta: "12/06/2025",
    estado: "Todos",
    vendedor: "Todos",
    ordenadoPor: "Bicicleteria",
  })

  // Función para manejar cambios en los filtros
  const handleFiltroChange = (e) => {
    const { name, value } = e.target
    setFiltros({
      ...filtros,
      [name]: value,
    })
  }

  // Función para realizar la búsqueda
  const handleBuscar = (e) => {
    e.preventDefault()
    console.log("Realizando búsqueda con filtros:", filtros)
    // Aquí iría la lógica para buscar en la API
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
                  <span className="text-gray-500">Gestión</span>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li>
                  <span className="text-gray-900 font-medium">Bicicleterías</span>
                </li>
              </ol>
            </nav>

            {/* Page header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Store className="h-6 w-6 text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Bicicleterías</h1>
              </div>
              <p className="text-gray-600">Gestión de bicicleterías y sus comisiones</p>
            </div>

            {/* Selector de vendedor */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-lg font-semibold text-gray-900">Bienvenido {userInfo.name}</h2>
                </div>
                <div className="w-full md:w-64">
                  <select className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option>Seleccionar</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Formulario de búsqueda */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <form onSubmit={handleBuscar}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="form-control">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Buscar por:</label>
                    <select className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                      <option>Fecha</option>
                      <option>Bicicleteria</option>
                      <option>Vendedor</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha desde:</label>
                    <div className="flex">
                      <input
                        type="text"
                        name="fechaDesde"
                        value={filtros.fechaDesde}
                        onChange={handleFiltroChange}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        className="ml-1 p-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                      >
                        <Calendar className="h-5 w-5 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha hasta:</label>
                    <div className="flex">
                      <input
                        type="text"
                        name="fechaHasta"
                        value={filtros.fechaHasta}
                        onChange={handleFiltroChange}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        className="ml-1 p-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                      >
                        <Calendar className="h-5 w-5 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estado:</label>
                    <select
                      name="estado"
                      value={filtros.estado}
                      onChange={handleFiltroChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="Todos">Todos</option>
                      <option value="9- Baja">9- Baja</option>
                      <option value="8- Contratado">8- Contratado</option>
                      <option value="7- Pendiente de Cierre">7- Pendiente de Cierre</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vendedor:</label>
                    <select
                      name="vendedor"
                      value={filtros.vendedor}
                      onChange={handleFiltroChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="Todos">Todos</option>
                      <option value="Adriana Suarez">Adriana Suarez</option>
                      <option value="Martin Caceres">Martin Caceres</option>
                      <option value="María Paula Alvarez">María Paula Alvarez</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ordenado por:</label>
                    <select
                      name="ordenadoPor"
                      value={filtros.ordenadoPor}
                      onChange={handleFiltroChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="Bicicleteria">Bicicleteria</option>
                      <option value="Vendedor">Vendedor</option>
                      <option value="Fecha">Fecha</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Ver
                  </button>
                </div>
              </form>
            </div>

            {/* Tabla de estados */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
              <div className="border-b border-gray-200 px-4 py-3">
                <h2 className="font-medium text-gray-900">Estado</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Estado</th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-gray-900">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {estadosData.map((estado, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-gray-900">{estado.estado}</td>
                        <td className="px-4 py-2 text-sm text-gray-900 text-right">{estado.cantidad}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50 font-medium">
                      <td className="px-4 py-2 text-sm text-gray-900">Total</td>
                      <td className="px-4 py-2 text-sm text-gray-900 text-right">{totalEstados}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-4 border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("comisiones")}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "comisiones"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Comisiones Bicicleterias
                </button>
                <button
                  onClick={() => setActiveTab("listado")}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "listado"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Listado
                </button>
              </div>
            </div>

            {/* Tabla de Comisiones */}
            {activeTab === "comisiones" && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div className="border-b border-gray-200 px-4 py-3">
                  <h2 className="font-medium text-gray-900">Comisiones Bicicleterias</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-900">Bicicleteria</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-900">Provincia</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-900">Localidad</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-900">Vendedor</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-900">Producto</th>
                        <th className="px-2 py-3 text-right text-xs font-medium text-gray-900">Cotizaciones</th>
                        <th className="px-2 py-3 text-right text-xs font-medium text-gray-900">Contratado Total</th>
                        <th className="px-2 py-3 text-right text-xs font-medium text-gray-900">En emisión Total</th>
                        <th className="px-2 py-3 text-right text-xs font-medium text-gray-900">% Venta Cotizaciones</th>
                        <th className="px-2 py-3 text-right text-xs font-medium text-gray-900">Premio</th>
                        <th className="px-2 py-3 text-right text-xs font-medium text-gray-900">Prima</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-900">Forma Pago</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comisionesData.map((item, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-2 py-2 text-xs text-gray-900">{item.bicicleteria}</td>
                          <td className="px-2 py-2 text-xs text-gray-900">{item.provincia}</td>
                          <td className="px-2 py-2 text-xs text-gray-900">{item.localidad}</td>
                          <td className="px-2 py-2 text-xs text-gray-900">{item.vendedor}</td>
                          <td className="px-2 py-2 text-xs text-gray-900">{item.producto}</td>
                          <td className="px-2 py-2 text-xs text-gray-900 text-right">{item.cotizaciones}</td>
                          <td className="px-2 py-2 text-xs text-gray-900 text-right">{item.contratadoTotal}</td>
                          <td className="px-2 py-2 text-xs text-gray-900 text-right">{item.enEmisionTotal}</td>
                          <td className="px-2 py-2 text-xs text-gray-900 text-right">{item.porcentajeVenta}</td>
                          <td className="px-2 py-2 text-xs text-gray-900 text-right">{item.premio.toLocaleString()}</td>
                          <td className="px-2 py-2 text-xs text-gray-900 text-right">{item.prima.toLocaleString()}</td>
                          <td className="px-2 py-2 text-xs text-gray-900">{item.formaPago}</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50 font-medium">
                        <td colSpan={5} className="px-2 py-2 text-xs text-gray-900">
                          Total
                        </td>
                        <td className="px-2 py-2 text-xs text-gray-900 text-right">{totalComisiones.cotizaciones}</td>
                        <td className="px-2 py-2 text-xs text-gray-900 text-right">
                          {totalComisiones.contratadoTotal}
                        </td>
                        <td className="px-2 py-2 text-xs text-gray-900 text-right">{totalComisiones.enEmisionTotal}</td>
                        <td className="px-2 py-2 text-xs text-gray-900 text-right">
                          {totalComisiones.porcentajeVenta}
                        </td>
                        <td className="px-2 py-2 text-xs text-gray-900 text-right">
                          {totalComisiones.premio.toLocaleString()}
                        </td>
                        <td className="px-2 py-2 text-xs text-gray-900 text-right">
                          {totalComisiones.prima.toLocaleString()}
                        </td>
                        <td className="px-2 py-2 text-xs text-gray-900"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tabla de Listado */}
            {activeTab === "listado" && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div className="border-b border-gray-200 px-4 py-3">
                  <h2 className="font-medium text-gray-900">Listado</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-900">Nro</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-900">Producto</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-900">Vendedor</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-900">Bicicleteria</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-900">Fecha Ingreso</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-900">Cliente</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-900">Teléfono</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-900">Email</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-900">Estado</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-900">Motivo baja</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-900">Canal venta</th>
                        <th className="px-2 py-3 text-left text-xs font-medium text-gray-900">Ultima gestión</th>
                        <th className="px-2 py-3 text-right text-xs font-medium text-gray-900">Prima</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listadoData.map((item, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-2 py-2 text-xs text-gray-900">{item.nro}</td>
                          <td className="px-2 py-2 text-xs text-gray-900">{item.producto}</td>
                          <td className="px-2 py-2 text-xs text-gray-900">{item.vendedor}</td>
                          <td className="px-2 py-2 text-xs text-gray-900">{item.bicicleteria}</td>
                          <td className="px-2 py-2 text-xs text-gray-900">{item.fechaIngreso}</td>
                          <td className="px-2 py-2 text-xs text-gray-900">{item.cliente}</td>
                          <td className="px-2 py-2 text-xs text-gray-900">{item.telefono}</td>
                          <td className="px-2 py-2 text-xs text-gray-900">{item.email}</td>
                          <td className="px-2 py-2 text-xs text-gray-900">{item.estado}</td>
                          <td className="px-2 py-2 text-xs text-gray-900">{item.motivoBaja}</td>
                          <td className="px-2 py-2 text-xs text-gray-900">{item.canalVenta}</td>
                          <td className="px-2 py-2 text-xs text-gray-900">{item.ultimaGestion}</td>
                          <td className="px-2 py-2 text-xs text-gray-900 text-right">{item.prima.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Panel informativo */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Store className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900">Información sobre Bicicleterías</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Esta sección permite visualizar y gestionar las comisiones y operaciones relacionadas con
                    bicicleterías. Utilice los filtros para refinar su búsqueda y las pestañas para alternar entre la
                    vista de comisiones y el listado detallado.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
