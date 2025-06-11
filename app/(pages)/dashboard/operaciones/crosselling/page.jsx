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
  Eye,
  TrendingUp,
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
      { name: "Nuevo ticket", href: "/dashboard/tickets/nuevo" },
      { name: "Mis tickets", href: "/dashboard/tickets/mis-tickets" },
      { name: "Tickets asignados", href: "/dashboard/tickets/asignados" },
    ],
  },
  {
    name: "Gestión",
    icon: Settings,
    href: "/dashboard/gestion",
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
  const [openMenus, setOpenMenus] = useState({ Operaciones: true }) // Operaciones abierto por defecto
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
      <div className="px-3 py-2">
        <div className="flex items-center gap-2 px-2">
          <Shield className="h-6 w-6 text-blue-600" />
          <span className="font-semibold text-lg text-blue-600">SeguroWeb</span>
        </div>
      </div>

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

// Componente principal de Crosselling
export default function CrossellingOperaciones() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    fechaDesde: "2025-06-01",
    fechaHasta: "2025-06-11",
    producto: "Todos",
    grupoProductos: "Todos",
    estado: "0",
    cantidad: "0",
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
    console.log("Datos del formulario de crosselling:", formData)
  }

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
                  <span className="text-gray-500">Operaciones</span>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li>
                  <span className="text-gray-900 font-medium">Crosselling</span>
                </li>
              </ol>
            </nav>

            {/* Page header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Selección de Operaciones para Crosselling</h1>
              </div>
              <p className="text-gray-600">
                Identifica oportunidades de venta cruzada basadas en el historial de clientes
              </p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
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

                  {/* Segunda fila - Productos */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <option value="Seguro Moto">Seguro Moto</option>
                        <option value="Seguro Comercial">Seguro Comercial</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="grupoProductos" className="block text-sm font-medium text-gray-700 mb-2">
                        Grupo de productos:
                      </label>
                      <select
                        id="grupoProductos"
                        name="grupoProductos"
                        value={formData.grupoProductos}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Todos">Todos</option>
                        <option value="Seguros Personales">Seguros Personales</option>
                        <option value="Seguros Patrimoniales">Seguros Patrimoniales</option>
                        <option value="Seguros de Vida">Seguros de Vida</option>
                        <option value="Seguros Comerciales">Seguros Comerciales</option>
                      </select>
                    </div>
                  </div>

                  {/* Tercera fila - Estado y Cantidad */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-2">
                        Estado:
                      </label>
                      <input
                        type="number"
                        id="estado"
                        name="estado"
                        value={formData.estado}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Ingrese el estado"
                      />
                      <p className="text-xs text-gray-500 mt-1">Estado de la operación (0 = Activo, 1 = Inactivo)</p>
                    </div>

                    <div>
                      <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700 mb-2">
                        Cantidad:
                      </label>
                      <input
                        type="number"
                        id="cantidad"
                        name="cantidad"
                        value={formData.cantidad}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Cantidad de operaciones"
                      />
                      <p className="text-xs text-gray-500 mt-1">Número máximo de operaciones a mostrar</p>
                    </div>
                  </div>

                  {/* Botón de acción */}
                  <div className="flex justify-start pt-4 border-t border-gray-200">
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-md font-medium transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      Ver Oportunidades
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Información adicional */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900">¿Qué es el Crosselling?</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    El crosselling te permite identificar clientes existentes que podrían estar interesados en productos
                    adicionales basándose en su historial de compras y perfil de riesgo.
                  </p>
                </div>
              </div>
            </div>

            {/* Área de resultados (placeholder) */}
            <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Resultados de Crosselling</h3>
                <p className="text-gray-500">
                  Los resultados aparecerán aquí después de ejecutar la búsqueda de oportunidades.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
