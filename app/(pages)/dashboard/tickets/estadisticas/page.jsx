"use client"

import { useState } from "react"
import {
  Bell,
  Calendar,
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
  BarChart3,
  PieChart,
  TrendingUp,
  Eye,
  Download,
  Filter,
  Clock,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

// Datos de ejemplo
const userInfo = {
  name: "Natalia Mosquera",
  role: "Adriana Suarez",
  vendorId: "293",
  phone: "153",
  mobile: "11 5930 2119",
  email: "adrianas@segurobici.com.ar",
}

const menuItems = [
  {
    name: "Inicio",
    icon: Home,
    href: "/dashboard",
  },
  {
    name: "Operaciones",
    icon: ClipboardList,
    href: "/dashboard/operaciones",
    submenu: [
      { name: "Consulta", href: "/dashboard/operaciones/consulta" },
      { name: "Crosselling", href: "/dashboard/operaciones/crosselling" },
      { name: "Solicitudes de Edición", href: "/dashboard/operaciones/solicitudes" },
    ],
  },
  {
    name: "Tickets",
    icon: FileText,
    href: "/dashboard/tickets",
    submenu: [
      { name: "Consulta", href: "/dashboard/tickets/consulta" },
      { name: "Importar", href: "/dashboard/tickets/importar" },
      { name: "Estadísticas", href: "/dashboard/tickets/estadisticas" },
    ],
  },
  {
    name: "Gestión",
    icon: Settings,
    href: "/dashboard/gestion",
    submenu: [
      { name: "Operaciones concretadas", href: "/dashboard/gestion/operaciones-concretadas" },
      { name: "Operaciones ingresadas", href: "/dashboard/gestion/operaciones-ingresadas" },
      { name: "Inversión Publicitaria", href: "/dashboard/gestion/inversion-publicitaria" },
      { name: "Información por Vendedor", href: "/dashboard/gestion/informacion-vendedor" },
      { name: "Prima por Vendedor", href: "/dashboard/gestion/prima-vendedor" },
      { name: "Objetivos por Vendedor", href: "/dashboard/gestion/objetivos-vendedor" },
      { name: "Gestiones por Vendedor", href: "/dashboard/gestion/gestiones-vendedor" },
      { name: "Listar Vendedores", href: "/dashboard/gestion/listar-vendedores" },
      { name: "Listar Bajas", href: "/dashboard/gestion/listar-bajas" },
      { name: "Bicicleterías", href: "/dashboard/gestion/bicicleterias" },
      { name: "Bicicletas por valor", href: "/dashboard/gestion/bicicletas-valor" },
      { name: "Última Gestión Vendedor", href: "/dashboard/gestion/ultima-gestion-vendedor" },
      { name: "Bloquear DNI", href: "/dashboard/gestion/bloquear-dni" },
      { name: "Go Digital", href: "/dashboard/gestion/go-digital" },
      { name: "Objetivos Vendedor Diario", href: "/dashboard/gestion/objetivos-diario" },
      { name: "Delivery", href: "/dashboard/gestion/delivery" },
      { name: "Dar de alta Usuario", href: "/dashboard/gestion/alta-usuario" },
    ],
  },
  {
    name: "Tablas",
    icon: Grid3X3,
    href: "/dashboard/tablas",
  },
]

// Componentes reutilizados
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

const Sidebar = ({ items }) => {
  const [openMenus, setOpenMenus] = useState({ Tickets: true }) // Tickets abierto por defecto
  const pathname = usePathname()

  const toggleSubmenu = (name) => {
    setOpenMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }))
  }

  const isActive = (href) => pathname === href

  return (
    <nav className="w-full h-full overflow-y-auto py-4">

      <div className="mt-6 space-y-1 px-3">
        {items.map((item) => (
          <div key={item.name}>
            {item.submenu ? (
              <>
                <button
                  onClick={() => toggleSubmenu(item.name)}
                  className={`flex items-center justify-between w-full rounded-md px-3 py-2 text-sm font-medium ${
                    openMenus[item.name] ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${openMenus[item.name] ? "rotate-180" : ""}`} />
                </button>

                {openMenus[item.name] && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        href={subitem.href}
                        className={`block rounded-md px-3 py-2 text-sm ${
                          isActive(subitem.href)
                            ? "bg-blue-100 text-blue-700 font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {subitem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                  isActive(item.href) ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            )}
          </div>
        ))}
      </div>
    </nav>
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
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-64px)]">{children}</div>
      </div>
    </>
  )
}

// Componentes para estadísticas
const StatCard = ({ title, value, icon: Icon, color = "blue", trend }) => (
  <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
        {trend && (
          <p className={`text-sm mt-2 ${trend.isPositive ? "text-green-600" : "text-red-600"}`}>
            {trend.isPositive ? "↗" : "↘"} {trend.value} vs período anterior
          </p>
        )}
      </div>
      <div className={`bg-${color}-50 rounded-full p-3`}>
        <Icon className={`h-8 w-8 text-${color}-600`} />
      </div>
    </div>
  </div>
)

const ChartPlaceholder = ({ title, type = "bar" }) => (
  <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
      {type === "bar" ? (
        <BarChart3 className="h-16 w-16 text-gray-400" />
      ) : (
        <PieChart className="h-16 w-16 text-gray-400" />
      )}
      <div className="ml-4 text-gray-500">
        <p className="font-medium">Gráfico {type === "bar" ? "de Barras" : "Circular"}</p>
        <p className="text-sm">Los datos aparecerán aquí</p>
      </div>
    </div>
  </div>
)

// Componente principal de Estadísticas de Tickets
export default function EstadisticasTickets() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [formData, setFormData] = useState({
    fechaDesde: "2025-06-01",
    fechaHasta: "2025-06-11",
    sector: "Todos",
    estado: "Todos",
    motivo: "Todos",
    compania: "Todos",
    tipoListado: "Total por Fecha de Alta",
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
    setShowStats(true)
    console.log("Datos del formulario de estadísticas:", formData)
  }

  // Datos de ejemplo para las estadísticas
  const statsData = [
    {
      title: "Total Tickets",
      value: "1,247",
      icon: FileText,
      color: "blue",
      trend: { value: "12%", isPositive: true },
    },
    {
      title: "Tickets Pendientes",
      value: "89",
      icon: Clock,
      color: "orange",
      trend: { value: "5%", isPositive: false },
    },
    {
      title: "Tickets Resueltos",
      value: "1,158",
      icon: CheckCircle,
      color: "green",
      trend: { value: "18%", isPositive: true },
    },
    { title: "Tiempo Promedio", value: "2.4h", icon: TrendingUp, color: "purple" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left section */}
            <div className="flex items-center">
              <button
                type="button"
                className="lg:hidden -ml-2 p-2 text-gray-500 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="hidden lg:flex lg:items-center lg:space-x-4">
                <Shield className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-blue-600">SeguroWeb</span>
              </div>
            </div>

            {/* Center section - Search */}
            <div className="hidden md:block flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full">
                <HelpCircle className="h-5 w-5" />
              </button>
              <div className="h-6 w-px bg-gray-200 mx-1"></div>
              <UserProfile user={userInfo} />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <Sidebar items={menuItems} />
      </MobileMenu>

      {/* Main content */}
      <div className="flex">
        {/* Desktop sidebar */}
        <div className="hidden lg:block w-64 border-r border-gray-200 h-[calc(100vh-64px)] sticky top-16">
          <Sidebar items={menuItems} />
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
                  <span className="text-gray-500">Tickets</span>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li>
                  <span className="text-gray-900 font-medium">Estadísticas</span>
                </li>
              </ol>
            </nav>

            {/* Page header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-violet-100 p-2 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-violet-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Estadísticas de Tickets</h1>
              </div>
              <p className="text-gray-600">Analiza métricas y tendencias de tickets por período y categorías</p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Primera fila - Fechas */}
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

                  {/* Segunda fila */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-2">
                        Sector:
                      </label>
                      <select
                        id="sector"
                        name="sector"
                        value={formData.sector}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Todos">Todos</option>
                        <option value="Ventas">Ventas</option>
                        <option value="Siniestros">Siniestros</option>
                        <option value="Atención al Cliente">Atención al Cliente</option>
                        <option value="Técnico">Técnico</option>
                        <option value="Administración">Administración</option>
                        <option value="Cobranzas">Cobranzas</option>
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
                        <option value="Pendiente">Pendiente</option>
                        <option value="En Proceso">En Proceso</option>
                        <option value="Resuelto">Resuelto</option>
                        <option value="Cerrado">Cerrado</option>
                      </select>
                    </div>
                  </div>

                  {/* Tercera fila */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="motivo" className="block text-sm font-medium text-gray-700 mb-2">
                        Motivo:
                      </label>
                      <select
                        id="motivo"
                        name="motivo"
                        value={formData.motivo}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Todos">Todos</option>
                        <option value="Consulta General">Consulta General</option>
                        <option value="Reclamo">Reclamo</option>
                        <option value="Siniestro">Siniestro</option>
                        <option value="Modificación de Póliza">Modificación de Póliza</option>
                        <option value="Cancelación">Cancelación</option>
                        <option value="Renovación">Renovación</option>
                        <option value="Problema Técnico">Problema Técnico</option>
                        <option value="Rechazo tarjeta o CBU">Rechazo tarjeta o CBU</option>
                      </select>
                    </div>

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
                        <option value="Sancor Seguros">Sancor Seguros</option>
                        <option value="Federación Patronal">Federación Patronal</option>
                        <option value="Mercantil Andina">Mercantil Andina</option>
                        <option value="Prudencia">Prudencia</option>
                      </select>
                    </div>
                  </div>

                  {/* Cuarta fila - Tipo de Listado */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="tipoListado" className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Listado:
                      </label>
                      <select
                        id="tipoListado"
                        name="tipoListado"
                        value={formData.tipoListado}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Total por Fecha de Alta">Total por Fecha de Alta</option>
                        <option value="Total por Fecha de Cierre">Total por Fecha de Cierre</option>
                        <option value="Por Sector">Por Sector</option>
                        <option value="Por Estado">Por Estado</option>
                        <option value="Por Motivo">Por Motivo</option>
                        <option value="Por Compañía">Por Compañía</option>
                        <option value="Por Usuario">Por Usuario</option>
                        <option value="Tiempo de Resolución">Tiempo de Resolución</option>
                      </select>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      Ver Estadísticas
                    </button>
                    {showStats && (
                      <button
                        type="button"
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                      >
                        <Download className="h-4 w-4" />
                        Exportar Reporte
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Estadísticas */}
            {showStats && (
              <div className="space-y-6">
                {/* Cards de estadísticas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard
                    title="Total Tickets"
                    value="1,247"
                    icon={FileText}
                    color="blue"
                    trend={{ value: "12%", isPositive: true }}
                  />
                  <StatCard
                    title="Tickets Pendientes"
                    value="89"
                    icon={Filter}
                    color="orange"
                    trend={{ value: "5%", isPositive: false }}
                  />
                  <StatCard
                    title="Tickets Resueltos"
                    value="1,158"
                    icon={CheckCircle}
                    color="green"
                    trend={{ value: "18%", isPositive: true }}
                  />
                  <StatCard title="Tiempo Promedio" value="2.4h" icon={TrendingUp} color="purple" />
                </div>

                {/* Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ChartPlaceholder title="Tickets por Fecha" type="bar" />
                  <ChartPlaceholder title="Distribución por Estado" type="pie" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ChartPlaceholder title="Tickets por Sector" type="bar" />
                  <ChartPlaceholder title="Tiempo de Resolución" type="bar" />
                </div>
              </div>
            )}

            {/* Información adicional */}
            <div className="mt-6 bg-violet-50 border border-violet-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <BarChart3 className="h-5 w-5 text-violet-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-violet-900">Análisis de Estadísticas</h3>
                  <p className="text-sm text-violet-700 mt-1">
                    Utiliza los filtros para generar reportes específicos. Los gráficos se actualizarán automáticamente
                    según los criterios seleccionados para proporcionar insights detallados.
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
