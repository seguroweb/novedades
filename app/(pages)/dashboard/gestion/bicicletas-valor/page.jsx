"use client"

import { useState } from "react"
import {
  Bell,
  Calendar,
  ChevronDown,
  ChevronLeft,
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

// Menú de navegación
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

// Componentes
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
  const [openMenus, setOpenMenus] = useState({})
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

// Datos de ejemplo para la tabla de bicicletas por valor
const bicicletasData = [
  {
    nro: "576148",
    producto: "Bicicletas",
    vendedor: "Florencia Pepe",
    fechaIngreso: "02/06/2025 09:33",
    cliente: "Lucas Anibal Navarro",
    telefono: "1122446311",
    email: "lucasnavarro504@gmail.com",
    canalVenta: "Referido del vendedor",
    ultimaGestion: "02/06/2025 09:38",
    prima: "0",
    valorEstimado: "de $0 a $10000",
  },
  {
    nro: "576308",
    producto: "Bicicletas",
    vendedor: "Ivana Maltez",
    fechaIngreso: "03/06/2025 11:40",
    cliente: "Ramon Gonzalez",
    telefono: "1158903336",
    email: "ramongonzalezvillalba@yahoo.com.ar",
    canalVenta: "Retención - (solo calidad)",
    ultimaGestion: "03/06/2025 11:46",
    prima: "0",
    valorEstimado: "de $0 a $10000",
  },
  {
    nro: "576438",
    producto: "Bicicletas",
    vendedor: "Lucas Garay",
    fechaIngreso: "04/06/2025 16:23",
    cliente: "no se",
    telefono: "1136206172",
    email: "nose@gmail.com",
    canalVenta: "Whatsapp Marketing",
    ultimaGestion: "12/06/2025 10:27",
    prima: "0",
    valorEstimado: "de $0 a $10000",
  },
  {
    nro: "576548",
    producto: "Bicicletas",
    vendedor: "Martin Caceres",
    fechaIngreso: "05/06/2025 18:43",
    cliente: "JULIAN",
    telefono: "1166870696",
    email: "notiene@gmail.com",
    canalVenta: "Bicicleterias",
    ultimaGestion: "12/06/2025 17:55",
    prima: "0",
    valorEstimado: "de $0 a $10000",
  },
  {
    nro: "576566",
    producto: "Bicicletas",
    vendedor: "Ivana Maltez",
    fechaIngreso: "06/06/2025 10:39",
    cliente: "prueba",
    telefono: "1125017496",
    email: "ppp@gmail.com",
    canalVenta: "Cobranzas - (solo calidad)",
    ultimaGestion: "06/06/2025 17:45",
    prima: "0",
    valorEstimado: "de $0 a $10000",
  },
  {
    nro: "576622",
    producto: "Bicicletas",
    vendedor: "Sebastián Mosqueda",
    fechaIngreso: "06/06/2025 15:21",
    cliente: "vanesa",
    telefono: "1123695251",
    email: "notienebotiene@gmail.com",
    canalVenta: "Referido del vendedor",
    ultimaGestion: "06/06/2025 16:52",
    prima: "0",
    valorEstimado: "de $0 a $10000",
  },
  {
    nro: "576833",
    producto: "Bicicletas",
    vendedor: "Patricio Zapata",
    fechaIngreso: "09/06/2025 15:05",
    cliente: "gisela poggi",
    telefono: "1123251384",
    email: "gis@gmail.com",
    canalVenta: "Crosselling",
    ultimaGestion: "09/06/2025 15:11",
    prima: "0",
    valorEstimado: "de $0 a $10000",
  },
]

// Componente principal de la página Bicicletas por valor
export default function BicicletasValor() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [fechaDesde, setFechaDesde] = useState("01/06/2025")
  const [fechaHasta, setFechaHasta] = useState("12/06/2025")
  const [valorDesde, setValorDesde] = useState("$0")
  const [valorHasta, setValorHasta] = useState("Todos")
  const [buscarPor, setBuscarPor] = useState("Fecha")
  const [resultados, setResultados] = useState([])
  const [mostrarResultados, setMostrarResultados] = useState(false)

  // Función para manejar la búsqueda
  const handleBuscar = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para buscar en el backend
    // Por ahora usamos los datos de ejemplo
    setResultados(bicicletasData)
    setMostrarResultados(true)
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
            {/* Breadcrumbs */}
            <nav className="mb-6 text-sm font-medium">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link href="/dashboard" className="text-gray-500 hover:text-gray-900">
                    Inicio
                  </Link>
                </li>
                <li className="flex items-center">
                  <ChevronLeft className="h-4 w-4 text-gray-500" />
                  <Link href="/dashboard/gestion" className="ml-1 text-gray-500 hover:text-gray-900">
                    Gestión
                  </Link>
                </li>
                <li className="flex items-center">
                  <ChevronLeft className="h-4 w-4 text-gray-500" />
                  <span className="ml-1 text-blue-600">Bicicletas por valor</span>
                </li>
              </ol>
            </nav>

            {/* Page title */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Bicicletas por valor asegurado</h1>
              <p className="mt-1 text-sm text-gray-500">Consulta las bicicletas aseguradas según su valor estimado.</p>
            </div>

            {/* Search form */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
              <div className="p-6">
                <form onSubmit={handleBuscar}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="buscarPor" className="block text-sm font-medium text-gray-700 mb-1">
                        Buscar por:
                      </label>
                      <select
                        id="buscarPor"
                        value={buscarPor}
                        onChange={(e) => setBuscarPor(e.target.value)}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Fecha">Fecha</option>
                        <option value="Vendedor">Vendedor</option>
                        <option value="Cliente">Cliente</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="fechaDesde" className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha desde:
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="fechaDesde"
                          value={fechaDesde}
                          onChange={(e) => setFechaDesde(e.target.value)}
                          className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <Calendar className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="fechaHasta" className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha hasta:
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="fechaHasta"
                          value={fechaHasta}
                          onChange={(e) => setFechaHasta(e.target.value)}
                          className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <Calendar className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="valorDesde" className="block text-sm font-medium text-gray-700 mb-1">
                        Valor desde:
                      </label>
                      <select
                        id="valorDesde"
                        value={valorDesde}
                        onChange={(e) => setValorDesde(e.target.value)}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="$0">$0</option>
                        <option value="$10000">$10000</option>
                        <option value="$20000">$20000</option>
                        <option value="$30000">$30000</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="valorHasta" className="block text-sm font-medium text-gray-700 mb-1">
                        Valor hasta:
                      </label>
                      <select
                        id="valorHasta"
                        value={valorHasta}
                        onChange={(e) => setValorHasta(e.target.value)}
                        className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Todos">Todos</option>
                        <option value="$10000">$10000</option>
                        <option value="$20000">$20000</option>
                        <option value="$30000">$30000</option>
                        <option value="$40000">$40000</option>
                      </select>
                    </div>

                    <div className="flex items-end">
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                      >
                        Ver
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Results table */}
            {mostrarResultados && (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Nro
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Producto
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Vendedor
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Fecha Ingreso
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Cliente
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Teléfono
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Canal venta
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Ultima gestión
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Prima
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Valor Estimado
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {resultados.map((bicicleta, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{bicicleta.nro}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{bicicleta.producto}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{bicicleta.vendedor}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                            {bicicleta.fechaIngreso}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{bicicleta.cliente}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{bicicleta.telefono}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{bicicleta.email}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{bicicleta.canalVenta}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                            {bicicleta.ultimaGestion}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{bicicleta.prima}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                            {bicicleta.valorEstimado}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {resultados.length === 0 && (
                  <div className="py-6 text-center">
                    <p className="text-gray-500">No se encontraron resultados para la búsqueda.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
