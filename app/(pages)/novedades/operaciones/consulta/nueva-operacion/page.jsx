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
  Plus
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Sidebar from "@/app/components/Sidebar"

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
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-64px)]">{children}</div>
      </div>
    </>
  )
}

export default function NuevaOperacionPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    producto: "",
    valorAsegurado: "",
    fecha: new Date().toISOString().split("T")[0], // Current date
    hora: new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", hour12: false }), // Current time
    nombre: "",
    telefono: "",
    emailUser: "",
    emailDomain: "gmail",
    emailTld: "com",
    estado: "",
    canal: "",
    fechaProximoContacto: "",
    horaProximoContacto: "",
    vendedor: "Adriana Suarez",
    dni: "",
    genero: "",
    compania: "",
    premioVendedor: "",
    prima: "",
    bicicleteria: "",
    delivery: "",
    influencer: "",
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
    console.log("Formulario Nueva Operación enviado:", formData)
    // Aquí iría la lógica para enviar los datos a tu backend
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
                  <Link href="/novedades/operaciones/consulta" className="text-gray-500 hover:text-gray-700">
                    Operaciones
                  </Link>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li>
                  <Link href="/novedades/operaciones/consulta" className="text-gray-500 hover:text-gray-700">
                    Consulta
                  </Link>
                </li>
                <li>
                  <span className="text-gray-400">/</span>
                </li>
                <li>
                  <span className="text-gray-900 font-medium">Nueva Operación</span>
                </li>
              </ol>
            </nav>

            {/* Page header with buttons */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Nueva Operación</h1>
                <p className="text-gray-600 mt-1">Completa los datos para registrar una nueva operación</p>
              </div>
            </div>

            {/* Form Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Producto */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                  <label htmlFor="producto" className="block text-sm font-medium text-gray-700">
                    Producto
                  </label>
                  <div className="md:col-span-2">
                    <select
                      id="producto"
                      name="producto"
                      value={formData.producto}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar producto</option>
                      <option value="Seguro Bicicleta">Seguro Bicicleta</option>
                      <option value="Seguro Hogar">Seguro Hogar</option>
                      <option value="Seguro Auto">Seguro Auto</option>
                    </select>
                  </div>
                </div>

                {/* Valor Asegurado */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                  <label htmlFor="valorAsegurado" className="block text-sm font-medium text-gray-700">
                    Valor Asegurado: $
                  </label>
                  <div className="md:col-span-2 flex items-center gap-2">
                    <input
                      type="text"
                      id="valorAsegurado"
                      name="valorAsegurado"
                      value={formData.valorAsegurado}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-500">(solo números, sin punto ni coma)</span>
                  </div>
                </div>

                {/* Fecha y Hora */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                  <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">
                    Fecha
                  </label>
                  <div className="md:col-span-2 flex items-center gap-4">
                    <div className="relative flex items-center">
                      <input
                        type="date"
                        id="fecha"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleInputChange}
                        className="rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    <label htmlFor="hora" className="text-sm font-medium text-gray-700">
                      Hora:
                    </label>
                    <input
                      type="time"
                      id="hora"
                      name="hora"
                      value={formData.hora}
                      onChange={handleInputChange}
                      className="w-24 rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Nombre */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Telefono */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                    Teléfono
                  </label>
                  <div className="md:col-span-2 flex items-center gap-2">
                    <input
                      type="text"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      placeholder="Ej: 1122334455"
                      className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-500">(solo números sin guiones ni paréntesis)</span>
                  </div>
                </div>

                {/* Email */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                  <label htmlFor="emailUser" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="md:col-span-2 flex items-center gap-1">
                    <input
                      type="text"
                      id="emailUser"
                      name="emailUser"
                      value={formData.emailUser}
                      onChange={handleInputChange}
                      placeholder="usuario"
                      className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">@</span>
                    <select
                      id="emailDomain"
                      name="emailDomain"
                      value={formData.emailDomain}
                      onChange={handleInputChange}
                      className="rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="gmail">gmail</option>
                      <option value="hotmail">hotmail</option>
                      <option value="outlook">outlook</option>
                      <option value="yahoo">yahoo</option>
                    </select>
                    <span className="text-gray-700">.</span>
                    <select
                      id="emailTld"
                      name="emailTld"
                      value={formData.emailTld}
                      onChange={handleInputChange}
                      className="rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="com">com</option>
                      <option value="ar">ar</option>
                      <option value="org">org</option>
                      <option value="net">net</option>
                    </select>
                  </div>
                </div>

                {/* Estado */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                  <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
                    Estado
                  </label>
                  <div className="md:col-span-2">
                    <select
                      id="estado"
                      name="estado"
                      value={formData.estado}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar estado</option>
                      <option value="Activa">Activa</option>
                      <option value="Pendiente">Pendiente</option>
                      <option value="Baja">Baja</option>
                    </select>
                  </div>
                </div>

                {/* Canal */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                  <label htmlFor="canal" className="block text-sm font-medium text-gray-700">
                    Canal
                  </label>
                  <div className="md:col-span-2">
                    <select
                      id="canal"
                      name="canal"
                      value={formData.canal}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar canal</option>
                      <option value="Whatsapp">Whatsapp</option>
                      <option value="Web">Web</option>
                      <option value="Bicicleteria">Bicicleteria</option>
                    </select>
                  </div>
                </div>

                {/* Fecha proximo contacto y Hora */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                  <label htmlFor="fechaProximoContacto" className="block text-sm font-medium text-gray-700">
                    Fecha proximo contacto
                  </label>
                  <div className="md:col-span-2 flex items-center gap-4">
                    <div className="relative flex items-center">
                      <input
                        type="date"
                        id="fechaProximoContacto"
                        name="fechaProximoContacto"
                        value={formData.fechaProximoContacto}
                        onChange={handleInputChange}
                        className="rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    <label htmlFor="horaProximoContacto" className="text-sm font-medium text-gray-700">
                      Hora:
                    </label>
                    <input
                      type="time"
                      id="horaProximoContacto"
                      name="horaProximoContacto"
                      value={formData.horaProximoContacto}
                      onChange={handleInputChange}
                      className="w-24 rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Vendedor */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                  <label htmlFor="vendedor" className="block text-sm font-medium text-gray-700">
                    Vendedor
                  </label>
                  <div className="md:col-span-2">
                    <select
                      id="vendedor"
                      name="vendedor"
                      value={formData.vendedor}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="Adriana Suarez">Adriana Suarez</option>
                      <option value="Otro Vendedor">Otro Vendedor</option>
                    </select>
                  </div>
                </div>

                {/* DNI */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                  <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
                    DNI
                  </label>
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      id="dni"
                      name="dni"
                      value={formData.dni}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Género */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                  <label htmlFor="genero" className="block text-sm font-medium text-gray-700">
                    Género
                  </label>
                  <div className="md:col-span-2">
                    <select
                      id="genero"
                      name="genero"
                      value={formData.genero}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar género</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                </div>

                {/* Compañía */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                  <label htmlFor="compania" className="block text-sm font-medium text-gray-700">
                    Compañía
                  </label>
                  <div className="md:col-span-2">
                    <select
                      id="compania"
                      name="compania"
                      value={formData.compania}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar compañía</option>
                      <option value="Allianz">Allianz</option>
                      <option value="Zurich">Zurich</option>
                      <option value="La Caja">La Caja</option>
                    </select>
                  </div>
                </div>

                {/* Premio Vendedor */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                  <label htmlFor="premioVendedor" className="block text-sm font-medium text-gray-700">
                    Premio Vendedor
                  </label>
                  <div className="md:col-span-2 flex items-center gap-2">
                    <input
                      type="text"
                      id="premioVendedor"
                      name="premioVendedor"
                      value={formData.premioVendedor}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-500">
                      Ingresar Premio Mensual x 12. No ingresar "puntos" ni "comas", utilizar el número sin decimales.
                    </span>
                  </div>
                </div>

                {/* Prima */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                  <label htmlFor="prima" className="block text-sm font-medium text-gray-700">
                    Prima
                  </label>
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      id="prima"
                      name="prima"
                      value={formData.prima}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Bicicleteria */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                  <label htmlFor="bicicleteria" className="block text-sm font-medium text-gray-700">
                    Bicicleteria
                  </label>
                  <div className="md:col-span-2">
                    <select
                      id="bicicleteria"
                      name="bicicleteria"
                      value={formData.bicicleteria}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar Bicicleteria</option>
                      <option value="Bici Centro">Bici Centro</option>
                      <option value="Rueda Libre">Rueda Libre</option>
                    </select>
                  </div>
                </div>

                {/* Delivery */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                  <label htmlFor="delivery" className="block text-sm font-medium text-gray-700">
                    Delivery
                  </label>
                  <div className="md:col-span-2">
                    <select
                      id="delivery"
                      name="delivery"
                      value={formData.delivery}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar Delivery</option>
                      <option value="Rappi">Rappi</option>
                      <option value="PedidosYa">PedidosYa</option>
                    </select>
                  </div>
                </div>

                {/* Influencer */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                  <label htmlFor="influencer" className="block text-sm font-medium text-gray-700">
                    Influencer
                  </label>
                  <div className="md:col-span-2">
                    <select
                      id="influencer"
                      name="influencer"
                      value={formData.influencer}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar Influencer</option>
                      <option value="Influencer A">Influencer A</option>
                      <option value="Influencer B">Influencer B</option>
                    </select>
                  </div>
                </div>

                {/* Botones de acción del formulario */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 mt-4 md:col-span-3">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    Grabar
                  </button>
                  <button
                    type="button"
                    onClick={() => window.history.back()} // Go back to previous page
                    className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
