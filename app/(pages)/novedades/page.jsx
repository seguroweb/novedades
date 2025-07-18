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
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/app/contexts/AuthContext"
import Sidebar from "@/app/components/Sidebar"

// Datos de ejemplo
const userInfo = {
  name: "Natalia Mosquera",
  role: "Adriana Suarez",
  vendorId: "293",
  phone: "153",
  mobile: "11 5930 2119",
  email: "adrianas@segurobici.com.ar",
}

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
          {user?.nombre?.charAt(0)}
        </div>
        <div className="hidden md:block text-left">
          <p className="font-medium text-gray-900">{user?.nombre}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="font-medium text-gray-900">{user?.nombre}</p>
            <p className="text-sm text-gray-500">{user?.tipo}</p>
          </div>

          {/* <div className="px-4 py-2 border-b border-gray-100">
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
          </div> */}

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

// Componentes para el dashboard
const WelcomeCard = ({ userName }) => (
  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white dark:from-blue-700 dark:to-blue-800">
    <h2 className="text-2xl font-bold">Bienvenido, {userName}</h2>
    <p className="mt-2 opacity-90">Aquí tienes un resumen de tu actividad reciente.</p>
  </div>
)

const StatsCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white rounded-lg border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-lg">
    <div className="flex justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold mt-1 dark:text-gray-100">{value}</p>
        {trend && (
          <p className={`text-xs mt-2 ${trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
            {trend.isPositive ? "↑" : "↓"} {trend.value} desde el mes pasado
          </p>
        )}
      </div>
      <div className="bg-blue-50 rounded-full p-3 h-fit dark:bg-blue-900">
        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      </div>
    </div>
  </div>
)

const RecentActivityCard = () => {
  const activities = [
    { id: 1, title: "Ticket #4582 actualizado", time: "Hace 10 minutos", status: "En progreso" },
    { id: 2, title: "Nueva operación #9854 creada", time: "Hace 2 horas", status: "Completado" },
    { id: 3, title: "Ticket #4581 cerrado", time: "Hace 5 horas", status: "Cerrado" },
    { id: 4, title: "Operación #9853 modificada", time: "Ayer", status: "Pendiente" },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm">
      <div className="border-b border-gray-100 p-4">
        <h3 className="font-medium">Actividad reciente</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {activities.map((activity) => (
          <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between">
              <p className="font-medium">{activity.title}</p>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  activity.status === "Completado"
                    ? "bg-green-100 text-green-800"
                    : activity.status === "En progreso"
                      ? "bg-blue-100 text-blue-800"
                      : activity.status === "Cerrado"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {activity.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-100">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">Ver todas las actividades</button>
      </div>
    </div>
  )
}

const UpcomingEventsCard = () => {
  const events = [
    { id: 1, title: "Reunión con cliente", date: "Hoy, 15:00", type: "Reunión" },
    { id: 2, title: "Vencimiento póliza #12458", date: "Mañana, 00:00", type: "Vencimiento" },
    { id: 3, title: "Llamada de seguimiento", date: "24 Jun, 10:30", type: "Llamada" },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm">
      <div className="border-b border-gray-100 p-4">
        <h3 className="font-medium">Próximos eventos</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {events.map((event) => (
          <div key={event.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between">
              <p className="font-medium">{event.title}</p>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  event.type === "Reunión"
                    ? "bg-purple-100 text-purple-800"
                    : event.type === "Vencimiento"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                }`}
              >
                {event.type}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{event.date}</p>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-100">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">Ver calendario completo</button>
      </div>
    </div>
  )
}

// Componente principal del Dashboard
export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
            {/* Welcome section */}
            <div className="mb-6">
              <WelcomeCard userName={userInfo.name.split(" ")[0]} />
            </div>

            {/* Stats section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatsCard
                title="Operaciones activas"
                value="24"
                icon={ClipboardList}
                trend={{ value: "12%", isPositive: true }}
              />
              <StatsCard
                title="Tickets pendientes"
                value="7"
                icon={FileText}
                trend={{ value: "3%", isPositive: false }}
              />
              <StatsCard title="Clientes nuevos" value="12" icon={User} trend={{ value: "8%", isPositive: true }} />
              <StatsCard title="Eventos programados" value="5" icon={Calendar} />
            </div>

            {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RecentActivityCard />
              </div>
              <div>
                <UpcomingEventsCard />
              </div>
            </div> */}
          </div>
        </main>
      </div>
    </div>
  )
}
