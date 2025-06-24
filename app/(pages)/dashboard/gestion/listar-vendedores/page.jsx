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
  Users,
  Check,
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
      { name: "Última Gestión Vendedor", href: "/dashboard/gestion/ultima-gestion" },
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
  const [openMenus, setOpenMenus] = useState({ Gestión: true }) // Gestión abierto por defecto
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

// Datos de ejemplo para la tabla de vendedores
const vendedoresData = [
  {
    numero: 2,
    nombre: "Leandro Mareque",
    telefono: "104",
    activo: "Activado",
    tipo: "Gerente Comercial",
    turno: "Full Time",
  },
  {
    numero: 36,
    nombre: "Web Vairo",
    telefono: "",
    activo: "Desactivado",
    tipo: "",
    turno: "Full Time",
  },
  {
    numero: 40,
    nombre: "Vanesa Verde",
    telefono: "120",
    activo: "Activado",
    tipo: "Ejecutiva de Ventas",
    turno: "Turno Tarde",
  },
  {
    numero: 46,
    nombre: "Bicicleterias",
    telefono: "",
    activo: "Desactivado",
    tipo: "",
    turno: "Full Time",
  },
  {
    numero: 50,
    nombre: "Autogestion",
    telefono: "",
    activo: "Desactivado",
    tipo: "",
    turno: "Full Time",
  },
  {
    numero: 56,
    nombre: "At Cliente",
    telefono: "",
    activo: "Desactivado",
    tipo: "",
    turno: "Full Time",
  },
  {
    numero: 89,
    nombre: "Sin Asignar",
    telefono: "",
    activo: "Desactivado",
    tipo: "Ejecutivo de Ventas",
    turno: "Full Time",
  },
  {
    numero: 97,
    nombre: "Laura Parodi",
    telefono: "145",
    activo: "Activado",
    tipo: "Ejecutiva de Ventas",
    turno: "Full Time",
  },
  {
    numero: 114,
    nombre: "Francisco Ledesma",
    telefono: "137",
    activo: "Activado",
    tipo: "Ejecutivo de Ventas",
    turno: "Full Time",
  },
  {
    numero: 157,
    nombre: "Usuario312",
    telefono: "153",
    activo: "Desactivado",
    tipo: "Ejecutivo de Ventas",
    turno: "Turno Mañana",
  },
  {
    numero: 158,
    nombre: "Usuario301",
    telefono: "154",
    activo: "Desactivado",
    tipo: "Ejecutivo de Ventas",
    turno: "Turno Mañana",
  },
  {
    numero: 159,
    nombre: "Usuario302",
    telefono: "155",
    activo: "Desactivado",
    tipo: "Ejecutivo de Ventas",
    turno: "Turno Mañana",
  },
  {
    numero: 166,
    nombre: "Usuario303",
    telefono: "148",
    activo: "Desactivado",
    tipo: "Ejecutivo de Ventas",
    turno: "Turno Mañana",
  },
  {
    numero: 167,
    nombre: "Usuario304",
    telefono: "150",
    activo: "Desactivado",
    tipo: "Ejecutivo de Ventas",
    turno: "Turno Mañana",
  },
  {
    numero: 169,
    nombre: "Usuario305",
    telefono: "159",
    activo: "Desactivado",
    tipo: "Ejecutivo de Ventas",
    turno: "Turno Mañana",
  },
  {
    numero: 170,
    nombre: "Usuario306",
    telefono: "162",
    activo: "Desactivado",
    tipo: "Ejecutivo de Ventas",
    turno: "Turno Mañana",
  },
  {
    numero: 171,
    nombre: "Usuario307",
    telefono: "163",
    activo: "Desactivado",
    tipo: "Ejecutivo de Ventas",
    turno: "Turno Mañana",
  },
  {
    numero: 172,
    nombre: "Usuario308",
    telefono: "164",
    activo: "Desactivado",
    tipo: "Ejecutivo de Ventas",
    turno: "Turno Mañana",
  },
  {
    numero: 179,
    nombre: "Usuario309",
    telefono: "168",
    activo: "Desactivado",
    tipo: "Ejecutivo de Ventas",
    turno: "Turno Mañana",
  },
  {
    numero: 180,
    nombre: "Usuario310",
    telefono: "160",
    activo: "Desactivado",
    tipo: "Ejecutivo de Ventas",
    turno: "Turno Mañana",
  },
  {
    numero: 181,
    nombre: "Usuario311",
    telefono: "147",
    activo: "Desactivado",
    tipo: "Ejecutivo de Ventas",
    turno: "Turno Mañana",
  },
  {
    numero: 216,
    nombre: "Usuario313",
    telefono: "167",
    activo: "Desactivado",
    tipo: "Ejecutivo de Ventas",
    turno: "Turno Mañana",
  },
  {
    numero: 217,
    nombre: "Usuario314",
    telefono: "166",
    activo: "Desactivado",
    tipo: "Ejecutivo de Ventas",
    turno: "Turno Mañana",
  },
  {
    numero: 218,
    nombre: "Usuario315",
    telefono: "136",
    activo: "Desactivado",
    tipo: "Ejecutivo de Ventas",
    turno: "Turno Mañana",
  },
]

// Componente principal de Listar Vendedores
export default function ListarVendedores() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [vendedores, setVendedores] = useState(vendedoresData)
  const [selectedVendor, setSelectedVendor] = useState("")

  // Función para manejar cambios en los campos de los vendedores
  const handleVendorChange = (index, field, value) => {
    const updatedVendedores = [...vendedores]
    updatedVendedores[index][field] = value
    setVendedores(updatedVendedores)
  }

  // Función para guardar cambios de un vendedor
  const handleSaveVendor = (index) => {
    console.log("Guardando cambios del vendedor:", vendedores[index])
    // Aquí iría la lógica para guardar en la base de datos
    alert(`Cambios guardados para ${vendedores[index].nombre}`)
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
                  <span className="text-gray-500">Gestión</span>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li>
                  <span className="text-gray-900 font-medium">Listar vendedores</span>
                </li>
              </ol>
            </nav>

            {/* Page header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Listar Vendedores</h1>
              </div>
              <p className="text-gray-600">Gestiona la lista de vendedores y sus configuraciones</p>
            </div>

            {/* Selector de vendedor */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-lg font-semibold text-gray-900">Bienvenido {userInfo.name}</h2>
                </div>
                <div className="w-full md:w-64">
                  <select
                    value={selectedVendor}
                    onChange={(e) => setSelectedVendor(e.target.value)}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar</option>
                    {vendedores.map((vendedor) => (
                      <option key={vendedor.numero} value={vendedor.numero}>
                        {vendedor.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Tabla de vendedores */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Nro</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Nombre</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Teléfono</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Activo</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Tipo</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Turno</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendedores.map((vendedor, index) => (
                      <tr key={vendedor.numero} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-gray-900">{vendedor.numero}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{vendedor.nombre}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">
                          <input
                            type="text"
                            value={vendedor.telefono}
                            onChange={(e) => handleVendorChange(index, "telefono", e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900">
                          <select
                            value={vendedor.activo}
                            onChange={(e) => handleVendorChange(index, "activo", e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="Activado">Activado</option>
                            <option value="Desactivado">Desactivado</option>
                          </select>
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900">
                          <input
                            type="text"
                            value={vendedor.tipo}
                            onChange={(e) => handleVendorChange(index, "tipo", e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900">
                          <select
                            value={vendedor.turno}
                            onChange={(e) => handleVendorChange(index, "turno", e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="Full Time">Full Time</option>
                            <option value="Turno Mañana">Turno Mañana</option>
                            <option value="Turno Tarde">Turno Tarde</option>
                          </select>
                        </td>
                        <td className="px-4 py-2 text-sm text-center">
                          <button
                            onClick={() => handleSaveVendor(index)}
                            className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                            title="Guardar cambios"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Información adicional */}
            <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-indigo-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-indigo-900">Gestión de Vendedores</h3>
                  <p className="text-sm text-indigo-700 mt-1">
                    En esta sección puedes administrar la información de los vendedores, cambiar su estado, tipo y
                    turno. Recuerda guardar los cambios haciendo clic en el botón verde de cada fila.
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
