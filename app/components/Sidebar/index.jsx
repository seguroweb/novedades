"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
const { LINKS_MENU } = require("../../constants/menuItems");
import { ChevronDown } from "lucide-react";

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({});
  const pathname = usePathname();

  const toggleSubmenu = (name) => {
    setOpenMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const isActive = (href) => pathname === href;

  return (
    <div className="hidden lg:block w-64 border-r border-gray-200 h-[calc(100vh-64px)] sticky top-16 dark:border-gray-700 dark:bg-gray-800">
      <nav className="w-full h-full overflow-y-auto py-4">
        <div className="mt-6 space-y-1 px-3">
          {LINKS_MENU.map((item) => (
            <div key={item.name}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={`flex items-center justify-between w-full rounded-md px-3 py-2 text-sm font-medium ${
                      openMenus[item.name]
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 dark:text-gray-400" />
                      <span>{item.name}</span>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        openMenus[item.name] ? "rotate-180" : ""
                      } dark:text-gray-400`}
                    />
                  </button>

                  {openMenus[item.name] && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className={`block rounded-md px-3 py-2 text-sm ${
                            isActive(subitem.href)
                              ? "bg-blue-100 text-blue-700 font-medium dark:bg-blue-800 dark:text-blue-100"
                              : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
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
                    isActive(item.href)
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <item.icon className="h-5 w-5 dark:text-gray-400" />
                  <span>{item.name}</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
