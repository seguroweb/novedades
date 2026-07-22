"use client";

import { useState } from "react";
import { Calendar, ClipboardList, FileText, User } from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext";
import Sidebar from "@/app/components/Sidebar";
import { WelcomeCard } from "./components/WelcomeCard";
import { MobileMenu } from "./components/MobileMenu";
import { StatsCard } from "./components/StatsCard";
import { Charts } from "./components/Charts";
import { SellersTable } from "./components/SellersTable";
import { SellersModal } from "@/app/components/modals/SellersModal";

// Datos de ejemplo
const userInfo = {
  name: "Natalia Mosquera",
  role: "Adriana Suarez",
  vendorId: "293",
  phone: "153",
  mobile: "11 5930 2119",
  email: "adrianas@segurobici.com.ar",
};

const RecentActivityCard = () => {
  const activities = [
    {
      id: 1,
      title: "Ticket #4582 actualizado",
      time: "Hace 10 minutos",
      status: "En progreso",
    },
    {
      id: 2,
      title: "Nueva operación #9854 creada",
      time: "Hace 2 horas",
      status: "Completado",
    },
    {
      id: 3,
      title: "Ticket #4581 cerrado",
      time: "Hace 5 horas",
      status: "Cerrado",
    },
    {
      id: 4,
      title: "Operación #9853 modificada",
      time: "Ayer",
      status: "Pendiente",
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm">
      <div className="border-b border-gray-100 p-4">
        <h3 className="font-medium">Actividad reciente</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="p-4 hover:bg-gray-50 transition-colors"
          >
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
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          Ver todas las actividades
        </button>
      </div>
    </div>
  );
};

const UpcomingEventsCard = () => {
  const events = [
    {
      id: 1,
      title: "Reunión con cliente",
      date: "Hoy, 15:00",
      type: "Reunión",
    },
    {
      id: 2,
      title: "Vencimiento póliza #12458",
      date: "Mañana, 00:00",
      type: "Vencimiento",
    },
    {
      id: 3,
      title: "Llamada de seguimiento",
      date: "24 Jun, 10:30",
      type: "Llamada",
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm">
      <div className="border-b border-gray-100 p-4">
        <h3 className="font-medium">Próximos eventos</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-4 hover:bg-gray-50 transition-colors"
          >
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
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          Ver calendario completo
        </button>
      </div>
    </div>
  );
};

// Componente principal del Dashboard
export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);

  const handleOpenSeller = (seller) => setSelectedSeller(seller);
  const handleModalClose = () => setSelectedSeller(null);

  // TODO Switch isAdmin
  const isAdmin = true;
  const { user, logout } = useAuth();

  const data = [
    {
      title: "Operaciones activas",
      value: "24",
      icon: ClipboardList,
      trend: { value: "12%", isPositive: true },
    },
    {
      title: "Tickets pendientes",
      value: "7",
      icon: FileText,
      trend: { value: "3%", isPositive: false },
    },
    {
      title: "Clientes nuevos",
      value: "12",
      icon: User,
      trend: { value: "8%", isPositive: true },
    },
    {
      title: "Eventos programados",
      value: "5",
      icon: Calendar,
      trend: {},
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <Sidebar />
      </MobileMenu>

      {/* Main content */}
      <div className="flex">
        {/* Desktop sidebar */}
        <div className="hidden lg:block pl-12">
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Welcome section */}
          <div className="mb-6">
            <WelcomeCard userName={userInfo.name.split(" ")[0]} />
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {data.map((content, index) => (
              <StatsCard
                key={index}
                title={content.title}
                value={content.value}
                icon={content.icon}
                trend={content.trend}
              />
            ))}
          </div>

          <Charts />

          {isAdmin && (
            <div className="mt-5">
              <SellersTable onViewSeller={handleOpenSeller} />
            </div>
          )}
        </main>
      </div>

      <SellersModal
        isOpen={!!selectedSeller}
        onClose={handleModalClose}
        operationData={selectedSeller}
      />
    </div>
  );
}
