"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronDown, Download, Plus, Filter } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/app/components/Sidebar";
import MobileMenu from "@/app/components/MobileMenu";
import { TableSkeleton } from "./loading";
import { EditOperationModal } from "@/app/components/modals/EditOperationModal";
import Pagination from "@/app/components/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import useFilters from "@/app/hooks/useFilters";
import { OperationsTable } from "./components/operationsTable";
import { OperationsFilters } from "./components/operationsFilters";
import { OperationsFilterForm } from "./components/operationsFilterForm";
import { NewOperationModal } from "@/app/components/modals/NewOperationModal";

// Componente principal de Consulta de Operaciones
export default function ConsultaOperaciones() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showResults, setShowResults] = useState(true); // State to control table visibility
  const [operations, setOperations] = useState([]); // State to store fetched operations
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [fetchError, setFetchError] = useState(null); // State for fetch errors
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State to control filter section visibility
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [isNewOperationModalOpen, setIsNewOperationModalOpen] = useState(false);
  const [onlyView, setOnlyView] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState(null); // State to hold data of the operation being edited

  // States for custom dropdowns
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  // Refs for click outside detection
  const filterButtonRef = useRef(null);
  const filterMenuRef = useRef(null);
  const sortButtonRef = useRef(null);
  const sortMenuRef = useRef(null);

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

  const handleEditClick = (operation, onlyView = false) => {
    setSelectedOperation(operation);
    setOnlyView(onlyView);
    setIsModalOpen(true);
  };

  const [formData, setFormData] = useState({
    buscarPor: "",
    tipo: "",
    estados: "",
    fechaDesde: "",
    fechaHasta: "",
    formaPago: "",
    estado: "",
    producto: "",
    compania: "",
    tipoOperaciones: "",
    canalesVenta: "",
    ranking: "",
    opciones: "",
  });

  const { filters, handleChange, handleSubmit } = useFilters(formData);

  // Function to fetch operations from the backend
  const fetchOperations = async () => {
    const params = new URLSearchParams(searchParams.toString());

    setIsLoading(true);
    setFetchError(null);
    // setOperations([]); // Clear previous results
    try {
      // Replace with your actual backend URL
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/operations?page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const operaciones = await response.json();
      // Assuming the backend returns data in a format similar to operationsData
      // You might need to transform the data here if the backend structure is different
      setOperations(operaciones.data);
      setTotal(operaciones.total);
    } catch (error) {
      console.error("Error fetching operations:", error);
      // setFetchError(
      //   "Error al cargar las operaciones. Por favor, inténtelo de nuevo."
      // );
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   console.log("Datos del formulario:", formData)
  //   //setShowResults(true) // Show the results section container
  //   fetchOperations() // Trigger data fetch
  // }

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedOperation(null);
  };

  const handleNewOperationModalClose = () => {
    setIsNewOperationModalOpen(false);
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

  useEffect(() => {
    setPage(Number(pageParam) || 1);
  }, [pageParam]);

  useEffect(() => {
    fetchOperations();
  }, [page, searchParams]);

  useEffect(() => {
    const initialData = {
      buscarPor: searchParams.get("buscarPor") || "",
      tipo: searchParams.get("tipo") || "",
      estados: searchParams.get("estados") || "",
      fechaDesde: searchParams.get("fechaDesde") || "",
      fechaHasta: searchParams.get("fechaHasta") || "",
      formaPago: searchParams.get("formaPago") || "",
      estado: searchParams.get("estado") || "",
      producto: searchParams.get("producto") || "",
      compania: searchParams.get("compania") || "",
      tipoOperaciones: searchParams.get("tipoOperaciones") || "",
      canalesVenta: searchParams.get("canalesVenta") || "",
      ranking: searchParams.get("ranking") || "",
      opciones: searchParams.get("opciones") || "",
    };
    setFormData(initialData);
  }, []);

  // Click outside logic for filter and sort menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Filter menu
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target)
      ) {
        setIsFilterMenuOpen(false);
      }
      // Sort menu
      if (
        sortMenuRef.current &&
        !sortMenuRef.current.contains(event.target) &&
        sortButtonRef.current &&
        !sortButtonRef.current.contains(event.target)
      ) {
        setIsSortMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
        <div className="hidden lg:block pl-12">
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
                  Consulta de Operaciones
                </h1>
                <p className="text-gray-600 mt-1 dark:text-gray-300">
                  Busca y filtra operaciones según tus criterios
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                  onClick={() => setIsNewOperationModalOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                  Nueva Operación
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md text-sm transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Descargar Excel
                </button>
              </div>
            </div>

            {/* Form */}
            {/* Filter Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 pb-0">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center justify-between w-full text-lg font-semibold text-gray-900 mb-4 pb-4 border-b border-gray-200"
                >
                  <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-blue-600" />
                    <span>Filtros de Búsqueda</span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform ${
                      isFilterOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {isFilterOpen && (
                <OperationsFilterForm
                  handleChange={handleChange}
                  formData={formData}
                  handleSubmit={handleSubmit}
                />
              )}
            </div>

            {/* Table Header with Filter and Sort Buttons */}
            <OperationsFilters
              setIsFilterMenuOpen={setIsFilterMenuOpen}
              isFilterMenuOpen={isFilterMenuOpen}
              filterMenuRef={filterMenuRef}
              filterButtonRef={filterButtonRef}
              sortMenuRef={sortMenuRef}
              sortButtonRef={sortButtonRef}
              isSortMenuOpen={isSortMenuOpen}
              setIsSortMenuOpen={setIsSortMenuOpen}
            />

            {/* Results Table */}
            {showResults && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6 overflow-x-auto">
                <div className="border-b border-gray-200 px-4 py-3">
                  <h2 className="font-medium text-gray-900">Operaciones</h2>
                </div>
                {isLoading ? (
                  <TableSkeleton />
                ) : fetchError ? (
                  <div className="text-center py-8 text-red-600">
                    {fetchError}
                  </div>
                ) : operations.length === 0 ? (
                  <div className="text-center py-8 text-gray-600">
                    No hay resultados aún.
                  </div>
                ) : (
                  <>
                    <OperationsTable
                      operations={operations}
                      handleEditClick={handleEditClick}
                    />

                    {/* Pagination */}
                    {/* <nav className="flex items-center justify-between px-4 py-3 sm:px-6">
                      <div className="flex-1 flex justify-between sm:hidden">
                      <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        Anterior
                      </button>

                      <button
                        onClick={() => setPage((prev) => prev + 1)}
                        disabled={page * limit >= total}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        Siguiente
                      </button>

                      </div>
                      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm text-gray-700">
                            Mostrando <span className="font-medium">{(page - 1) * limit + 1}</span> a{" "}
                            <span className="font-medium">{Math.min(page * limit, total)}</span> de{" "}
                            <span className="font-medium">{total}</span> entradas
                          </p>
                        </div>
                        <div>
                          <nav
                            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                            aria-label="Pagination"
                          >
                            <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
                              <span className="sr-only">Previous</span>
                              <ChevronDown className="h-5 w-5 rotate-90" aria-hidden="true" />
                            </button>
                            <button
                              aria-current="page"
                              className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                            >
                              1
                            </button>
                            <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" onClick={() => setPage((prev) => prev + 1)}>
                              <span className="sr-only">Next</span>
                              <ChevronDown className="h-5 w-5 -rotate-90" aria-hidden="true" />
                            </button>
                          </nav>
                        </div>
                      </div>
                    </nav> */}
                    <Pagination
                      total={total}
                      page={page}
                      setPage={handlePageChange}
                      limit={limit}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Edit Operation Modal */}
      <EditOperationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        operationData={selectedOperation}
        onSave={handleSaveOperation}
        onlyView={onlyView}
      />

      <NewOperationModal
        isOpen={isNewOperationModalOpen}
        onClose={handleNewOperationModalClose}
      />
    </div>
  );
}
