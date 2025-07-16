"use client";

import {
  Bell,
  ChevronDown,
  HelpCircle,
  LogOut,
  Mail,
  Menu,
  Phone,
  Settings,
  Shield,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "../ThemeToggle";

const userInfo = {
  name: "Natalia Mosquera",
  role: "Adriana Suarez",
  vendorId: "293",
  phone: "153",
  mobile: "11 5930 2119",
  email: "adrianas@segurobici.com.ar",
};

// Componentes reutilizados del dashboard
const UserProfile = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

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
              <span className="text-sm text-gray-700">
                Vendedor Nro.: {user.vendorId}
              </span>
            </div>
            <div className="flex items-center gap-2 py-1">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">
                Teléfono: {user.phone}
              </span>
            </div>
            <div className="flex items-center gap-2 py-1">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">
                Celular: {user.mobile}
              </span>
            </div>
            <div className="flex items-center gap-2 py-1">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700 break-all">
                {user.email}
              </span>
            </div>
          </div>

          <div className="px-2 py-2">
            <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors">
              <Settings className="h-4 w-4" />
              <span>Configuración</span>
            </button>
            <Link href={"/"}>
              <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                <LogOut className="h-4 w-4" />
                <span>Cerrar sesión</span>
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const HeaderDashboard = ({ sistema }) => {
  return (
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left section */}
            <div className="flex items-center">
              <button
                type="button"
                className="lg:hidden -ml-2 p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="hidden lg:flex lg:items-center lg:space-x-4">
                <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{sistema}</span>
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-700">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-700">
                <HelpCircle className="h-5 w-5" />
              </button>
              <div className="h-6 w-px bg-gray-200 mx-1 dark:bg-gray-700"></div>
              <ThemeToggle /> {/* Theme toggle button */}
              <UserProfile user={userInfo} />
            </div>
          </div>
        </div>
      </header>
  )

  // return (
  //   <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
  //     <div className="px-4 sm:px-6 lg:px-8">
  //       <div className="flex h-16 items-center justify-between">
  //         {/* Left section */}
  //         <div className="flex items-center">
  //           <button
  //             type="button"
  //             className="lg:hidden -ml-2 p-2 text-gray-500 hover:text-gray-900"
  //             //onClick={() => setMobileMenuOpen(true)}
  //           >
  //             <Menu className="h-6 w-6" />
  //           </button>
  //           <Link href={"/sistemas"}>
  //             <div className="hidden lg:flex lg:items-center lg:space-x-4">
  //               <Shield className="h-8 w-8 text-blue-600" />
  //               <span className="text-xl font-bold text-blue-600">{sistema}</span>
  //             </div>
  //           </Link>
  //         </div>

  //         {/* Right section */}
  //         <div className="flex items-center gap-3">
  //           <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full">
  //             <Bell className="h-5 w-5" />
  //           </button>
  //           <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full">
  //             <HelpCircle className="h-5 w-5" />
  //           </button>
  //           <div className="h-6 w-px bg-gray-200 mx-1"></div>
  //           <ThemeToggle /> {/* Theme toggle button */}
  //           <UserProfile user={userInfo} />
  //         </div>
  //       </div>
  //     </div>
  //   </header>
  // );
};

export default HeaderDashboard;
