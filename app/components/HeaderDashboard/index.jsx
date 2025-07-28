"use client";

import {
  Bell,
  HelpCircle,
  Menu,
  Shield,
} from "lucide-react";
import { ThemeToggle } from "./components/ThemeToggle";
import { UserProfile } from "./components/UserProfile";

const userInfo = {
  name: "Natalia Mosquera",
  role: "Adriana Suarez",
  vendorId: "293",
  phone: "153",
  mobile: "11 5930 2119",
  email: "adrianas@segurobici.com.ar",
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
              <ThemeToggle />
              <UserProfile user={userInfo} />
            </div>
          </div>
        </div>
      </header>
  )
};

export default HeaderDashboard;
