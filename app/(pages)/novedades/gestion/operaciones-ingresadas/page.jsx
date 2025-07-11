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
  Download,
  TrendingUp,
  Users,
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

// Componente principal de Operaciones Ingresadas
export default function OperacionesIngresadas() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [selectedVendor, setSelectedVendor] = useState("Adriana Suarez")
  const [formData, setFormData] = useState({
    fechaDesde: "2025-06-01",
    fechaHasta: "2025-06-12",
    producto: "Todos",
    canalVenta: "Todos",
    tipoOperaciones: "Todas (ing+cross+ref)",
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
    setShowResults(true)
    console.log("Datos del formulario:", formData)
    console.log("Vendedor seleccionado:", selectedVendor)
  }

  // Datos de ejemplo para la tabla (basados en el screenshot)
  const tableData = [
    {
      fecha: "01/06/2025",
      accidentesPersonales: 0,
      autoAntiguo: 0,
      autoClasico: 0,
      autos: 6,
      autosViejos: 0,
      biciLowCost: 0,
      biciUsoComercial: 0,
      bicicletas: 21,
      bicicletasElectricas: 0,
      boleoProtegido: 0,
      camaraFotos: 0,
      camiones: 2,
      caucion: 0,
      celulares: 0,
      ciclomotor: 0,
      comercio: 0,
      flota: 0,
      hogar: 0,
      integralComercio: 0,
      mascotas: 0,
      monopatin: 2,
      motoUsoComercial: 0,
    },
    {
      fecha: "02/06/2025",
      accidentesPersonales: 12,
      autoAntiguo: 1,
      autoClasico: 0,
      autos: 16,
      autosViejos: 0,
      biciLowCost: 0,
      biciUsoComercial: 0,
      bicicletas: 36,
      bicicletasElectricas: 0,
      boleoProtegido: 0,
      camaraFotos: 0,
      camiones: 3,
      caucion: 0,
      celulares: 0,
      ciclomotor: 1,
      comercio: 0,
      flota: 0,
      hogar: 4,
      integralComercio: 0,
      mascotas: 0,
      monopatin: 0,
      motoUsoComercial: 1,
    },
    {
      fecha: "03/06/2025",
      accidentesPersonales: 20,
      autoAntiguo: 0,
      autoClasico: 0,
      autos: 9,
      autosViejos: 1,
      biciLowCost: 0,
      biciUsoComercial: 0,
      bicicletas: 45,
      bicicletasElectricas: 1,
      boleoProtegido: 0,
      camaraFotos: 1,
      camiones: 7,
      caucion: 0,
      celulares: 2,
      ciclomotor: 0,
      comercio: 0,
      flota: 0,
      hogar: 4,
      integralComercio: 0,
      mascotas: 1,
      monopatin: 1,
      motoUsoComercial: 1,
    },
    {
      fecha: "04/06/2025",
      accidentesPersonales: 7,
      autoAntiguo: 0,
      autoClasico: 0,
      autos: 12,
      autosViejos: 0,
      biciLowCost: 0,
      biciUsoComercial: 0,
      bicicletas: 23,
      bicicletasElectricas: 0,
      boleoProtegido: 0,
      camaraFotos: 0,
      camiones: 4,
      caucion: 0,
      celulares: 0,
      ciclomotor: 0,
      comercio: 0,
      flota: 0,
      hogar: 1,
      integralComercio: 0,
      mascotas: 0,
      monopatin: 0,
      motoUsoComercial: 0,
    },
    {
      fecha: "05/06/2025",
      accidentesPersonales: 18,
      autoAntiguo: 0,
      autoClasico: 0,
      autos: 9,
      autosViejos: 0,
      biciLowCost: 0,
      biciUsoComercial: 1,
      bicicletas: 43,
      bicicletasElectricas: 0,
      boleoProtegido: 0,
      camaraFotos: 0,
      camiones: 4,
      caucion: 1,
      celulares: 0,
      ciclomotor: 0,
      comercio: 0,
      flota: 0,
      hogar: 7,
      integralComercio: 0,
      mascotas: 0,
      monopatin: 0,
      motoUsoComercial: 0,
    },
    {
      fecha: "06/06/2025",
      accidentesPersonales: 23,
      autoAntiguo: 0,
      autoClasico: 0,
      autos: 10,
      autosViejos: 0,
      biciLowCost: 0,
      biciUsoComercial: 1,
      bicicletas: 37,
      bicicletasElectricas: 1,
      boleoProtegido: 0,
      camaraFotos: 0,
      camiones: 4,
      caucion: 0,
      celulares: 3,
      ciclomotor: 0,
      comercio: 0,
      flota: 0,
      hogar: 0,
      integralComercio: 0,
      mascotas: 0,
      monopatin: 0,
      motoUsoComercial: 0,
    },
    {
      fecha: "07/06/2025",
      accidentesPersonales: 1,
      autoAntiguo: 0,
      autoClasico: 0,
      autos: 5,
      autosViejos: 0,
      biciLowCost: 0,
      biciUsoComercial: 0,
      bicicletas: 20,
      bicicletasElectricas: 1,
      boleoProtegido: 2,
      camaraFotos: 0,
      camiones: 0,
      caucion: 0,
      celulares: 0,
      ciclomotor: 0,
      comercio: 0,
      flota: 0,
      hogar: 2,
      integralComercio: 0,
      mascotas: 0,
      monopatin: 0,
      motoUsoComercial: 0,
    },
    {
      fecha: "08/06/2025",
      accidentesPersonales: 2,
      autoAntiguo: 0,
      autoClasico: 0,
      autos: 6,
      autosViejos: 0,
      biciLowCost: 0,
      biciUsoComercial: 1,
      bicicletas: 32,
      bicicletasElectricas: 0,
      boleoProtegido: 0,
      camaraFotos: 0,
      camiones: 4,
      caucion: 0,
      celulares: 0,
      ciclomotor: 0,
      comercio: 0,
      flota: 0,
      hogar: 0,
      integralComercio: 0,
      mascotas: 0,
      monopatin: 0,
      motoUsoComercial: 0,
    },
    {
      fecha: "09/06/2025",
      accidentesPersonales: 18,
      autoAntiguo: 0,
      autoClasico: 0,
      autos: 21,
      autosViejos: 0,
      biciLowCost: 0,
      biciUsoComercial: 0,
      bicicletas: 58,
      bicicletasElectricas: 1,
      boleoProtegido: 0,
      camaraFotos: 0,
      camiones: 2,
      caucion: 0,
      celulares: 3,
      ciclomotor: 0,
      comercio: 1,
      flota: 0,
      hogar: 1,
      integralComercio: 0,
      mascotas: 0,
      monopatin: 0,
      motoUsoComercial: 1,
    },
    {
      fecha: "10/06/2025",
      accidentesPersonales: 13,
      autoAntiguo: 0,
      autoClasico: 0,
      autos: 17,
      autosViejos: 0,
      biciLowCost: 0,
      biciUsoComercial: 0,
      bicicletas: 57,
      bicicletasElectricas: 1,
      boleoProtegido: 0,
      camaraFotos: 0,
      camiones: 1,
      caucion: 0,
      celulares: 1,
      ciclomotor: 0,
      comercio: 0,
      flota: 0,
      hogar: 1,
      integralComercio: 0,
      mascotas: 0,
      monopatin: 0,
      motoUsoComercial: 0,
    },
    {
      fecha: "11/06/2025",
      accidentesPersonales: 13,
      autoAntiguo: 1,
      autoClasico: 1,
      autos: 16,
      autosViejos: 0,
      biciLowCost: 2,
      biciUsoComercial: 1,
      bicicletas: 43,
      bicicletasElectricas: 1,
      boleoProtegido: 0,
      camaraFotos: 1,
      camiones: 4,
      caucion: 0,
      celulares: 2,
      ciclomotor: 0,
      comercio: 0,
      flota: 2,
      hogar: 5,
      integralComercio: 1,
      mascotas: 0,
      monopatin: 0,
      motoUsoComercial: 0,
    },
    {
      fecha: "12/06/2025",
      accidentesPersonales: 8,
      autoAntiguo: 0,
      autoClasico: 0,
      autos: 4,
      autosViejos: 0,
      biciLowCost: 0,
      biciUsoComercial: 3,
      bicicletas: 35,
      bicicletasElectricas: 0,
      boleoProtegido: 0,
      camaraFotos: 0,
      camiones: 1,
      caucion: 0,
      celulares: 3,
      ciclomotor: 0,
      comercio: 0,
      flota: 0,
      hogar: 5,
      integralComercio: 1,
      mascotas: 0,
      monopatin: 0,
      motoUsoComercial: 0,
    },
  ]

  // Calcular totales
  const totales = {
    fecha: "Totales",
    accidentesPersonales: 135,
    autoAntiguo: 2,
    autoClasico: 1,
    autos: 131,
    autosViejos: 1,
    biciLowCost: 2,
    biciUsoComercial: 7,
    bicicletas: 450,
    bicicletasElectricas: 6,
    boleoProtegido: 2,
    camaraFotos: 2,
    camiones: 36,
    caucion: 1,
    celulares: 14,
    ciclomotor: 1,
    comercio: 1,
    flota: 2,
    hogar: 33,
    integralComercio: 2,
    mascotas: 1,
    monopatin: 3,
    motoUsoComercial: 3,
  }

  const vendedores = [
    "Adriana Suarez",
    "Natalia Mosquera",
    "Carlos Rodriguez",
    "María González",
    "Juan Pérez",
    "Laura Parodi",
    "Diego Martinez",
    "Ana López",
  ]

  const productColumns = [
    { key: "accidentesPersonales", label: "Accidentes Personales" },
    { key: "autoAntiguo", label: "Auto Antiguo" },
    { key: "autoClasico", label: "Auto Clásico" },
    { key: "autos", label: "Autos" },
    { key: "autosViejos", label: "Autos Viejos" },
    { key: "biciLowCost", label: "Bici Low Cost" },
    { key: "biciUsoComercial", label: "Bici Uso Comercial" },
    { key: "bicicletas", label: "Bicicletas" },
    { key: "bicicletasElectricas", label: "Bicicletas Eléctricas" },
    { key: "boleoProtegido", label: "Boleo Protegido" },
    { key: "camaraFotos", label: "Cámara Fotos" },
    { key: "camiones", label: "Camiones" },
    { key: "caucion", label: "Caución" },
    { key: "celulares", label: "Celulares" },
    { key: "ciclomotor", label: "Ciclomotor" },
    { key: "comercio", label: "Comercio" },
    { key: "flota", label: "Flota" },
    { key: "hogar", label: "Hogar" },
    { key: "integralComercio", label: "Integral Comercio" },
    { key: "mascotas", label: "Mascotas" },
    { key: "monopatin", label: "Monopatín" },
    { key: "motoUsoComercial", label: "Moto Uso Comercial" },
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
                  <span className="text-gray-500">Gestión</span>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li>
                  <span className="text-gray-900 font-medium">Operaciones ingresadas</span>
                </li>
              </ol>
            </nav>

            {/* Page header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Operaciones Ingresadas</h1>
              </div>
              <p className="text-gray-600">Consulta las operaciones ingresadas por vendedor y período</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Operaciones Ingresadas</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                            <option value="Autos">Autos</option>
                            <option value="Bicicletas">Bicicletas</option>
                            <option value="Motos">Motos</option>
                            <option value="Hogar">Hogar</option>
                            <option value="Vida">Vida</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="canalVenta" className="block text-sm font-medium text-gray-700 mb-2">
                            Canal de Venta:
                          </label>
                          <select
                            id="canalVenta"
                            name="canalVenta"
                            value={formData.canalVenta}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="Todos">Todos</option>
                            <option value="Presencial">Presencial</option>
                            <option value="Telefónico">Telefónico</option>
                            <option value="Online">Online</option>
                            <option value="Email">Email</option>
                          </select>
                        </div>
                      </div>

                      {/* Tercera fila */}
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
                          <option value="Todas (ing+cross+ref)">Todas (ing+cross+ref)</option>
                          <option value="Ingresadas">Ingresadas</option>
                          <option value="Crosselling">Crosselling</option>
                          <option value="Referencias">Referencias</option>
                        </select>
                      </div>

                      {/* Botón de acción */}
                      <div className="flex justify-start pt-4">
                        <button
                          type="submit"
                          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                          Ver
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Selector de Vendedor */}
              <div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium text-gray-900">Seleccionar Vendedor</h3>
                  </div>
                  <div>
                    <label htmlFor="vendedor" className="block text-sm font-medium text-gray-700 mb-2">
                      Vendedor:
                    </label>
                    <select
                      id="vendedor"
                      value={selectedVendor}
                      onChange={(e) => setSelectedVendor(e.target.value)}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      {vendedores.map((vendedor) => (
                        <option key={vendedor} value={vendedor}>
                          {vendedor}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Info del vendedor seleccionado */}
                  <div className="mt-4 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm font-medium text-gray-900">Bienvenido {userInfo.name}</p>
                    <div className="mt-2 space-y-1 text-xs text-gray-600">
                      <p>Vendedor Nro.: {userInfo.vendorId}</p>
                      <p>Teléfono: {userInfo.phone}</p>
                      <p>Celular: {userInfo.mobile}</p>
                      <p>Email: {userInfo.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabla de resultados */}
            {showResults && (
              <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Operaciones Ingresadas por Día</h3>
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                      <Download className="h-4 w-4" />
                      Exportar
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 text-xs">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-2 py-2 text-left text-xs font-medium text-gray-900 sticky left-0 bg-gray-50">
                            Producto
                          </th>
                          {productColumns.map((column) => (
                            <th
                              key={column.key}
                              className="border border-gray-300 px-2 py-2 text-center text-xs font-medium text-gray-900 min-w-[60px]"
                            >
                              {column.label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((row, index) => (
                          <tr key={row.fecha} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-2 py-2 text-xs font-medium text-gray-900 sticky left-0 bg-white">
                              {row.fecha}
                            </td>
                            {productColumns.map((column) => (
                              <td
                                key={column.key}
                                className="border border-gray-300 px-2 py-2 text-xs text-center text-gray-700"
                              >
                                {row[column.key]}
                              </td>
                            ))}
                          </tr>
                        ))}
                        {/* Fila de totales */}
                        <tr className="bg-yellow-50 font-semibold">
                          <td className="border border-gray-300 px-2 py-2 text-xs font-bold text-gray-900 sticky left-0 bg-yellow-50">
                            {totales.fecha}
                          </td>
                          {productColumns.map((column) => (
                            <td
                              key={column.key}
                              className="border border-gray-300 px-2 py-2 text-xs text-center font-bold text-gray-900"
                            >
                              {totales[column.key]}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Información adicional */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-blue-900">Operaciones Ingresadas</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Consulta el detalle diario de todas las operaciones ingresadas por cada vendedor. Los datos se
                    muestran desglosados por categoría de producto para un análisis detallado del rendimiento.
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
