"use client";

import { useState, useRef, useEffect } from "react";
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
  Eye,
  Plus,
  AlertTriangle,
  ArrowDownUp,
  Printer,
  CheckCircle,
  Edit,
  Trash2,
  MoreHorizontal,
  User2,
  UserCircle,
  Filter,
  UserCircleIcon,
  ArrowDown,
  CalendarDays,
  MoreVertical,
} from "lucide-react";
import DashboardLayout from "@/app/components/DashboardLayout";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { useTheme } from "@/app/contexts/ThemeContext";
import MobileMenu from "@/app/components/MobileMenu";
import Link from "next/link";
import Button from "@/app/components/Button";
import { TableSkeleton } from "../../operaciones/consulta/loading";
import Pagination from "@/app/components/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";

const vendors = [
  {
    id: 1,
    name: "Jane Cooper",
    email: "janecoop@gmail.com",
    avatar: "/placeholder.svg?height=40&width=40",
    payroll: "121948ASH3",
    department: "Finance",
    role: "Sr. Accountant",
    joiningDate: "Feb 23, 2025",
    contractType: "Full-time",
  },
  {
    id: 2,
    name: "Brooklyn Simmons",
    email: "brooklynsmms@gmail.com",
    avatar: "/placeholder.svg?height=40&width=40",
    payroll: "BHABHD127",
    department: "Engineer",
    role: "Lead. Back End Dev",
    joiningDate: "Feb 18, 2025",
    contractType: "Freelance",
  },
  {
    id: 3,
    name: "Leslie Alexander",
    email: "alexanderis@gmail.com",
    avatar: "/placeholder.svg?height=40&width=40",
    payroll: "18219ADANJ",
    department: "Product",
    role: "Jr. Technical Product",
    joiningDate: "Dec 25, 2024",
    contractType: "Internship",
  },
  {
    id: 4,
    name: "Esther Howard",
    email: "esthrrhoward@gmail.com",
    avatar: "/placeholder.svg?height=40&width=40",
    payroll: "MMZKAO811",
    department: "Finance",
    role: "Lead. Accountant",
    joiningDate: "Jan 10, 2025",
    contractType: "Part-time",
  },
  {
    id: 5,
    name: "Cameron Williamson",
    email: "williamcn@gmail.com",
    avatar: "/placeholder.svg?height=40&width=40",
    payroll: "HSASH8188",
    department: "Engineer",
    role: "Sr. DevOps",
    joiningDate: "Mar 30, 2025",
    contractType: "Freelance",
  },
  {
    id: 6,
    name: "Albert Flores",
    email: "albertflrs@gmail.com",
    avatar: "/placeholder.svg?height=40&width=40",
    payroll: "NXAHCH100",
    department: "Marketing",
    role: "Jr. Digital Marketing",
    joiningDate: "Oct 4, 2024",
    contractType: "Part-time",
  },
  {
    id: 7,
    name: "Annette Black",
    email: "annetblack@gmail.com",
    avatar: "/placeholder.svg?height=40&width=40",
    payroll: "SJABV81742",
    department: "Engineer",
    role: "Jr. Front End Dev",
    joiningDate: "Dec 19, 2024",
    contractType: "Internship",
  },
  {
    id: 8,
    name: "Darlene Robertson",
    email: "darlenerobert@gmail.com",
    avatar: "/placeholder.svg?height=40&width=40",
    payroll: "71738KAQN",
    department: "Content Writer",
    role: "Sr. Content Writer",
    joiningDate: "Jan 28, 2025",
    contractType: "Full-time",
  },
  {
    id: 9,
    name: "Grande Ariana",
    email: "grandeari@gmail.com",
    avatar: "/placeholder.svg?height=40&width=40",
    payroll: "JAHDG6661",
    department: "Product",
    role: "Lead. Product Manager",
    joiningDate: "Feb 12, 2025",
    contractType: "Full-time",
  },
  {
    id: 10,
    name: "Arlene McCoy",
    email: "mccoyarlene@gmail.com",
    avatar: "/placeholder.svg?height=40&width=40",
    payroll: "LAKD089137",
    department: "Product",
    role: "Sr. UI/UX Designer",
    joiningDate: "Nov 10, 2024",
    contractType: "Part-time",
  },
];

export default function VendedoresPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State to control filter section visibility

  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const filterButtonRef = useRef(null);
  const sortButtonRef = useRef(null);
  const filterMenuRef = useRef(null);
  const sortMenuRef = useRef(null);
  const [vendedores, setVendedores] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [fetchError, setFetchError] = useState(null); // State for fetch errors

  // States for custom dropdowns
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  const { theme } = useTheme();

  // Paginación
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParam = searchParams.get("page");
  const [page, setPage] = useState(Number(pageParam) || 1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(50);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage);
    router.push(`?${params.toString()}`);
    setPage(newPage);
  };

  useEffect(() => {
    setPage(Number(pageParam) || 1);
  }, [pageParam]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target)
      ) {
        setFilterMenuOpen(false);
      }
      if (
        sortMenuRef.current &&
        !sortMenuRef.current.contains(event.target) &&
        sortButtonRef.current &&
        !sortButtonRef.current.contains(event.target)
      ) {
        setSortMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getActiveClasses = (baja) => {
    switch (baja) {
      case "N":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const fetchVendedores = async () => {
    setIsLoading(true);
    setFetchError(null);
    setVendedores([]); // Clear previous results
    try {
      console.log("HELLO");
      // Replace with your actual backend URL
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sellers`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const vendedores = await response.json();
      console.log(vendedores);
      // Assuming the backend returns data in a format similar to operationsData
      // You might need to transform the data here if the backend structure is different
      setVendedores(vendedores);
    } catch (error) {
      console.error("Error fetching operations:", error);
      setFetchError(
        "Error al cargar las operaciones. Por favor, inténtelo de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVendedores();
  }, []);

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
                  <Link
                    href="/dashboard"
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <span className="text-gray-400 dark:text-gray-600">/</span>
                </li>
                <li>
                  <Link
                    href="/dashboard/operaciones/consulta"
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    Operaciones
                  </Link>
                </li>
                <li>
                  <span className="text-gray-400 dark:text-gray-600">/</span>
                </li>
                <li>
                  <span className="text-gray-900 font-medium dark:text-gray-100">
                    Consulta
                  </span>
                </li>
              </ol>
            </nav>

            {/* Page header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Vendedores
                </h1>
                <p className="text-gray-600 mt-1 dark:text-gray-300">
                  Visualiza y gestiona la lista de vendedores.
                </p>
              </div>
              <div className="flex gap-3">
                <Link href={"/novedades/gestion/vendedores/nuevo-vendedor"}>
                  <button
                    type="button"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Nuevo Vendedor
                  </button>
                </Link>
              </div>
            </div>

            {/* Table Header with Filter and Sort Buttons */}
            <div className="flex justify-end gap-2 mb-4 mt-4 relative">
              {/* Sort Button and Dropdown */}
              <div className="relative">
                <Button
                  ref={sortButtonRef}
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                >
                  <ArrowDown className="h-4 w-4" />
                  Ordenar
                </Button>
                {isSortMenuOpen && (
                  <div
                    ref={sortMenuRef}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10"
                  >
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Fecha (Más reciente)
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Fecha (Más antigua)
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Cliente (A-Z)
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Cliente (Z-A)
                    </button>
                  </div>
                )}
              </div>

              {/* Filter Button and Dropdown */}
              <div className="relative">
                <Button
                  ref={filterButtonRef}
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                >
                  <Filter className="h-4 w-4" />
                  Filtrar
                </Button>
                {isFilterMenuOpen && (
                  <div
                    ref={filterMenuRef}
                    className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-100 p-4 z-10"
                  >
                    <h4 className="text-base font-semibold leading-none mb-4">
                      Filter
                    </h4>

                    {/* Date range */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Date range
                        </label>
                        <button
                          type="button"
                          className="text-blue-600 text-sm hover:underline"
                        >
                          Reset
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label
                            htmlFor="filterDateFrom"
                            className="block text-xs text-gray-500 mb-1"
                          >
                            From:
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              id="filterDateFrom"
                              className="w-full text-sm pr-8"
                            />
                            <CalendarDays className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="filterDateTo"
                            className="block text-xs text-gray-500 mb-1"
                          >
                            To:
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              id="filterDateTo"
                              className="w-full text-sm pr-8"
                            />
                            <CalendarDays className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Activity type */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <label
                          htmlFor="activityType"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Activity type
                        </label>
                        <button
                          type="button"
                          className="text-blue-600 text-sm hover:underline"
                        >
                          Reset
                        </button>
                      </div>
                      <select
                        id="activityType"
                        className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option>All warehouses</option>
                        <option>Warehouse A</option>
                        <option>Warehouse B</option>
                      </select>
                    </div>

                    {/* Status */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <label
                          htmlFor="status"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Status
                        </label>
                        <button
                          type="button"
                          className="text-blue-600 text-sm hover:underline"
                        >
                          Reset
                        </button>
                      </div>
                      <select
                        id="status"
                        className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Pending</option>
                      </select>
                    </div>

                    {/* Keyword search */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <label
                          htmlFor="keywordSearch"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Keyword search
                        </label>
                        <button
                          type="button"
                          className="text-blue-600 text-sm hover:underline"
                        >
                          Reset
                        </button>
                      </div>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          id="keywordSearch"
                          placeholder="Search..."
                          className="w-full text-sm py-2 pl-10 pr-4"
                        />
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-between gap-2">
                      <button
                        type="button"
                        className="flex-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md font-medium text-sm transition-colors"
                      >
                        Reset all
                      </button>
                      <button
                        type="button"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors"
                        onClick={() => setIsFilterMenuOpen(false)} // Close on apply
                      >
                        Apply now
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Results Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6 overflow-x-auto">
              <div className="border-b border-gray-200 px-4 py-3">
                <h2 className="font-medium text-gray-900">Vendedores</h2>
              </div>
              {isLoading ? (
                <TableSkeleton />
              ) : fetchError ? (
                <div className="text-center py-8 text-red-600">
                  {fetchError}
                </div>
              ) : vendedores.length === 0 ? (
                <div className="text-center py-8 text-gray-600">
                  No hay resultados aún.
                </div>
              ) : (
                <>
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                        >
                          Nombre
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                        >
                          Id
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                        >
                          Rol
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                        >
                          Fecha de Ingreso
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                        >
                          Estado
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Acción</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      {vendedores.map((vendor) => (
                        <tr
                          key={vendor.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
                              {vendor.nombre.charAt(0)}{vendor.nombre.split("")[1].charAt(0)}
                            </div>
                              {/* <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={vendor.avatar || "/placeholder.svg"}
                                  alt={`Avatar de ${vendor.nombre}`}
                                />
                              </div> */}
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                  {vendor.nombre}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {vendor.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {vendor.numero}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {vendor.tipo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              {vendor.fch_ingreso}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getActiveClasses(vendor.baja)}`}
                            >
                              {vendor.baja === "N" ? "Activo" : "Baja"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                              <MoreVertical className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <Pagination
                    total={total}
                    page={page}
                    setPage={handlePageChange}
                    limit={limit}
                  />
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
