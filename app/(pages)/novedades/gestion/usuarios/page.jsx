"use client";

import { useState, useRef, useEffect } from "react";
import {
  Calendar,
  Search,
  Plus,
  Filter,
  ArrowDown,
  CalendarDays,
  MoreVertical,
  MailIcon,
  AtSign,
  Edit,
} from "lucide-react";
import { useTheme } from "@/app/contexts/ThemeContext";
import MobileMenu from "@/app/components/MobileMenu";
import Link from "next/link";
import Button from "@/app/components/Button";
import { TableSkeleton } from "../../operaciones/consulta/loading";
import Pagination from "@/app/components/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import { CreateUserModal } from "@/app/components/modals/CreateUser";

export default function Usuarios() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vendedores, setVendedores] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator
  const [fetchError, setFetchError] = useState(null); // State for fetch errors
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({})

  // Paginación
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParam = searchParams.get("page");
  const [page, setPage] = useState(Number(pageParam) || 1);
  const [limit] = useState(20);
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
        `${process.env.NEXT_PUBLIC_API_URL}/users?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const vendedores = await response.json();
      console.log(vendedores);
      // Assuming the backend returns data in a format similar to operationsData
      // You might need to transform the data here if the backend structure is different
      setVendedores(vendedores.data);
      setTotal(vendedores.total);
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
  }, [page, searchParams]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedOperation(null);
  };

  const handleSaveOperation = (updatedOperation) => {
    console.log("Guardar operación:", updatedOperation);
    // Here you would typically send the updatedOperation to your backend
    // For now, let's update the local state to reflect the change
    setOperations((prevOperations) =>
      prevOperations.map((op) =>
        op.nro === updatedOperation.nro ? updatedOperation : op
      )
    );
    handleModalClose();
  };

  const handleEditClick = (usuario) => {
    setUsuarioSeleccionado(usuario)
    setIsModalOpen(true)
  }

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
                  Usuarios
                </h1>
                <p className="text-gray-600 mt-1 dark:text-gray-300">
                  Visualiza y gestiona la lista de usuarios.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                  Nuevo Usuario
                </button>
              </div>
            </div>

            {/* Results Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6 overflow-x-auto dark: border-gray-500">
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
                          Id
                        </th>
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
                          Usuario
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {vendor.numero}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {vendor.avatar ? (
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={vendor.avatar}
                                    alt={`Avatar de ${vendor.nombre}`}
                                  />
                                </div>
                              ) : (
                                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
                                  {vendor.nombre.charAt(0)}
                                </div>
                              )}

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
                            <div className="flex items-center gap-2">
                              <AtSign width={16} />
                              {vendor.usuario}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {vendor.tipo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getActiveClasses(
                                vendor.baja
                              )}`}
                            >
                              {vendor.baja === "N" ? "Activo" : "Baja"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-2">
                                <button className="text-gray-600 hover:text-blue-600 p-1 rounded-md hover:bg-gray-100" onClick={() => handleEditClick(vendor)}>
                                  <Edit className="h-5 w-5" />
                                </button>
                              </div>
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

      {/* Edit Operation Modal */}
      <CreateUserModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveOperation}
        usuarioData={usuarioSeleccionado}
      />
    </div>
  );
}
