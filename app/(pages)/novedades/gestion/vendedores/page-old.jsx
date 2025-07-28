"use client"

import { useState, useRef, useEffect } from "react"
import { Search, Filter, ArrowUpDown, Calendar, MoreVertical, ChevronLeft, ChevronRight, User, Sidebar } from "lucide-react"
import DashboardLayout from "@/app/components/DashboardLayout"
import { ThemeToggle } from "@/app/components/HeaderDashboard/components/ThemeToggle"
import { useTheme } from "@/app/contexts/ThemeContext"

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
]

export default function VendedoresPage() {
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)
  const [sortMenuOpen, setSortMenuOpen] = useState(false)
  const filterButtonRef = useRef(null)
  const sortButtonRef = useRef(null)
  const filterMenuRef = useRef(null)
  const sortMenuRef = useRef(null)
  const [vendedores, setVendedores] = useState([])
  const [isLoading, setIsLoading] = useState(false) // State for loading indicator
  const [fetchError, setFetchError] = useState(null) // State for fetch errors

  const { theme } = useTheme()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target)
      ) {
        setFilterMenuOpen(false)
      }
      if (
        sortMenuRef.current &&
        !sortMenuRef.current.contains(event.target) &&
        sortButtonRef.current &&
        !sortButtonRef.current.contains(event.target)
      ) {
        setSortMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const getContractTypeClasses = (type) => {
    switch (type) {
      case "Full-time":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Freelance":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Internship":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "Part-time":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    }
  }

  const getDepartmentDotClasses = (department) => {
    switch (department) {
      case "Finance":
        return "bg-yellow-500"
      case "Engineer":
        return "bg-blue-500"
      case "Product":
        return "bg-purple-500"
      case "Marketing":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const fetchVendedores = async () => {
    setIsLoading(true)
    setFetchError(null)
    setVendedores([]) // Clear previous results
    try {
      console.log("HELLO")
      // Replace with your actual backend URL
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sellers`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const vendedores = await response.json()
      console.log(vendedores)
      // Assuming the backend returns data in a format similar to operationsData
      // You might need to transform the data here if the backend structure is different
      setVendedores(vendedores)
    } catch (error) {
      console.error("Error fetching operations:", error)
      setFetchError("Error al cargar las operaciones. Por favor, inténtelo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchVendedores()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

<div className="flex">

        {/* Desktop sidebar */}
        <div className="hidden lg:block w-64 border-r border-gray-200 h-[calc(100vh-64px)] sticky top-16">
          <Sidebar />
        </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
            <User className="h-5 w-5" />
            <span className="font-medium">Total Vendedores: {vendors.length} personas</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Buscar nómina o nombre..."
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
              />
            </div>
            <div className="relative">
              <button
                ref={filterButtonRef}
                onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800"
              >
                <Filter className="h-4 w-4" />
                <span>Filtros</span>
              </button>
              {filterMenuOpen && (
                <div
                  ref={filterMenuRef}
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                >
                  <div className="py-1" role="none">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                    >
                      Opción de filtro 1
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-1"
                    >
                      Opción de filtro 2
                    </a>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                ref={sortButtonRef}
                onClick={() => setSortMenuOpen(!sortMenuOpen)}
                className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800"
              >
                <ArrowUpDown className="h-4 w-4" />
                <span>Ordenar</span>
              </button>
              {sortMenuOpen && (
                <div
                  ref={sortMenuRef}
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                >
                  <div className="py-1" role="none">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                    >
                      Ordenar por Nombre
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-1"
                    >
                      Ordenar por Fecha
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
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
                  Nómina
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300"
                >
                  Departamento
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
                  Tipo de Contrato
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Acción</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {vendedores.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={vendor.avatar || "/placeholder.svg"}
                          alt={`Avatar de ${vendor.nombre}`}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{vendor.nombre}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{vendor.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {vendor.numero}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${getDepartmentDotClasses(vendor.department)}`} />
                      {vendor.department}
                    </div>
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
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getContractTypeClasses(vendor.contractType)}`}
                    >
                      {vendor.contractType}
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
        </div>

        {/* Pagination */}
        <nav className="flex items-center justify-between pt-4" aria-label="Pagination">
          <div className="hidden sm:block">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Mostrando <span className="font-medium">1</span> a <span className="font-medium">10</span> de{" "}
              <span className="font-medium">100</span> entradas
            </p>
          </div>
          <div className="flex flex-1 justify-between sm:justify-end">
            <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Anterior
            </button>
            <div className="hidden sm:flex sm:items-center sm:space-x-2 ml-3">
              {[1, 2, 3, 4, 5, "...", 10].map((page, index) => (
                <button
                  key={index}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${
                    page === 1
                      ? "z-10 bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-200"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">
              Siguiente
              <ChevronRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </nav>
      </div>
      </div>
    </div>
  )
}
