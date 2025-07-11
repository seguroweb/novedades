"use client"
import { useState } from "react"
import { FaEye, FaChartLine, FaUserTie, FaCalendarAlt } from "react-icons/fa"
import Link from "next/link"

export default function ObjetivosVendedor() {
  const [showResults, setShowResults] = useState(false)
  const [formData, setFormData] = useState({
    mes: "Junio",
    año: "2025",
    diasHabiles: "8",
    conAnulaciones: false,
    tipoVendedores: "Internos",
    vendedor: "Adriana Suarez",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowResults(true)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/dashboard">
              <img src="/logo.png" alt="SeguroWeb" className="h-8 w-auto" />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Natalia Mosquera</span>
              <img src="/avatar.png" alt="User Avatar" className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md h-screen sticky top-0 overflow-y-auto">
          <div className="p-4">
            <Link href="/dashboard" className="flex items-center space-x-2 text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-lg font-semibold">SeguroWeb</span>
            </Link>
          </div>
          <nav className="mt-4">
            <Link href="/dashboard" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Inicio
            </Link>
            <div className="px-4 py-2 text-gray-600">
              <div className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Operaciones
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div className="px-4 py-2 text-gray-600">
              <div className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  Tickets
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div className="px-4 py-2 text-blue-600 bg-blue-50">
              <div className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Gestión
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </div>
              <div className="ml-7 mt-2 space-y-1">
                <Link
                  href="/dashboard/gestion/operaciones-concretadas"
                  className="block text-sm py-1 text-gray-600 hover:text-blue-600"
                >
                  Operaciones concretadas
                </Link>
                <Link
                  href="/dashboard/gestion/operaciones-ingresadas"
                  className="block text-sm py-1 text-gray-600 hover:text-blue-600"
                >
                  Operaciones ingresadas
                </Link>
                <Link
                  href="/dashboard/gestion/prima-vendedor"
                  className="block text-sm py-1 text-gray-600 hover:text-blue-600"
                >
                  Prima por Vendedor
                </Link>
                <Link
                  href="/dashboard/gestion/objetivos-vendedor"
                  className="block text-sm py-1 text-blue-600 font-medium"
                >
                  Objetivos por Vendedor
                </Link>
                <Link
                  href="/dashboard/gestion/gestiones-vendedor"
                  className="block text-sm py-1 text-gray-600 hover:text-blue-600"
                >
                  Gestiones por Vendedor
                </Link>
                <Link
                  href="/dashboard/gestion/listar-vendedores"
                  className="block text-sm py-1 text-gray-600 hover:text-blue-600"
                >
                  Listar Vendedores
                </Link>
                <Link
                  href="/dashboard/gestion/listar-bajas"
                  className="block text-sm py-1 text-gray-600 hover:text-blue-600"
                >
                  Listar Bajas
                </Link>
                <Link
                  href="/dashboard/gestion/bicicleterias"
                  className="block text-sm py-1 text-gray-600 hover:text-blue-600"
                >
                  Bicicleterías
                </Link>
                <Link
                  href="/dashboard/gestion/bicicletas-valor"
                  className="block text-sm py-1 text-gray-600 hover:text-blue-600"
                >
                  Bicicletas por valor
                </Link>
                <Link
                  href="/dashboard/gestion/ultima-gestion"
                  className="block text-sm py-1 text-gray-600 hover:text-blue-600"
                >
                  Ultima Gestión Vendedor
                </Link>
                <Link
                  href="/dashboard/gestion/bloquear-dni"
                  className="block text-sm py-1 text-gray-600 hover:text-blue-600"
                >
                  Bloquear DNI
                </Link>
              </div>
            </div>
            <div className="px-4 py-2 text-gray-600">
              <div className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  Tablas
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <Link href="/logout" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Salir
            </Link>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6">
          {/* Breadcrumbs */}
          <nav className="text-sm mb-6">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <Link href="/dashboard" className="text-gray-500 hover:text-blue-600">
                  Inicio
                </Link>
                <svg className="fill-current w-3 h-3 mx-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                </svg>
              </li>
              <li className="flex items-center">
                <Link href="#" className="text-gray-500 hover:text-blue-600">
                  Gestión
                </Link>
                <svg className="fill-current w-3 h-3 mx-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                </svg>
              </li>
              <li>
                <span className="text-blue-600">Objetivos por Vendedor</span>
              </li>
            </ol>
          </nav>

          {/* Page Title */}
          <div className="flex items-center mb-6">
            <div className="bg-green-100 p-2 rounded-full">
              <FaChartLine className="text-green-600 text-xl" />
            </div>
            <h1 className="text-2xl font-bold ml-3 text-gray-800">Objetivos por Vendedor</h1>
          </div>
          <p className="text-gray-600 mb-8">Consulta y analiza los objetivos por vendedor y período</p>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content */}
            <div className="flex-1">
              {/* Search Form */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mes:</label>
                    <select
                      name="mes"
                      value={formData.mes}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Enero">Enero</option>
                      <option value="Febrero">Febrero</option>
                      <option value="Marzo">Marzo</option>
                      <option value="Abril">Abril</option>
                      <option value="Mayo">Mayo</option>
                      <option value="Junio">Junio</option>
                      <option value="Julio">Julio</option>
                      <option value="Agosto">Agosto</option>
                      <option value="Septiembre">Septiembre</option>
                      <option value="Octubre">Octubre</option>
                      <option value="Noviembre">Noviembre</option>
                      <option value="Diciembre">Diciembre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Año:</label>
                    <div className="flex">
                      <input
                        type="text"
                        name="año"
                        value={formData.año}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        className="bg-gray-200 px-3 rounded-r-md border border-gray-300 border-l-0 flex items-center justify-center"
                      >
                        <FaCalendarAlt className="text-gray-600" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Días hábiles:</label>
                    <div className="flex">
                      <input
                        type="text"
                        name="diasHabiles"
                        value={formData.diasHabiles}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        className="bg-gray-200 px-3 rounded-r-md border border-gray-300 border-l-0 flex items-center justify-center"
                      >
                        <FaCalendarAlt className="text-gray-600" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="conAnulaciones"
                      name="conAnulaciones"
                      checked={formData.conAnulaciones}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="conAnulaciones" className="ml-2 block text-sm text-gray-700">
                      Con anulaciones
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Vendedores:</label>
                    <select
                      name="tipoVendedores"
                      value={formData.tipoVendedores}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Internos">Internos</option>
                      <option value="Externos">Externos</option>
                      <option value="Todos">Todos</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vendedor:</label>
                    <select
                      name="vendedor"
                      value={formData.vendedor}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Adriana Suarez">Adriana Suarez</option>
                      <option value="Juan Perez">Juan Perez</option>
                      <option value="Maria Lopez">Maria Lopez</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 flex justify-center">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <FaEye className="mr-2" />
                      Ver
                    </button>
                  </div>
                </form>
              </div>

              {showResults && (
                <>
                  {/* First Table */}
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-red-600 mb-4">Adriana Suarez</h2>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Producto
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Tipo
                              </th>
                              <th
                                scope="col"
                                colSpan="2"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Totales
                              </th>
                              <th
                                scope="col"
                                colSpan="2"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Del Día
                              </th>
                            </tr>
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              ></th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              ></th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Cantidad
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Prima
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Cantidad
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Prima
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr className="bg-blue-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Bicicletas
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No Asignado</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">23</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1383284</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">250675</td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Autos</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Crosselling</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1112976</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0</td>
                            </tr>
                            <tr className="bg-blue-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Bicicletas
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Crosselling</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">59214</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0</td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Motos</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Crosselling</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1079226</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">311664</td>
                            </tr>
                            <tr className="bg-blue-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Bicicletas
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Referidos</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">137821</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">65438</td>
                            </tr>
                            <tr className="bg-gray-100 font-bold">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">31</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2815324</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">6</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">627777</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Second Table */}
                  <div className="mb-6">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Tipo
                              </th>
                              <th
                                scope="col"
                                colSpan="6"
                                className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Datos
                              </th>
                              <th
                                scope="col"
                                colSpan="6"
                                className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Objetivo
                              </th>
                              <th
                                scope="col"
                                colSpan="4"
                                className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Real
                              </th>
                            </tr>
                            <tr>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              ></th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Recibidos
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Contac
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                No Contac
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Sin Gest
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                % Contac
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Ventas
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                % Conver
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                1° Obj
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Cant
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                2° Obj
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Cant
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                3° Obj
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Cant
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Día
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Período
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Cantidad
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                %
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr className="bg-blue-50">
                              <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                                Asignados Mascotas
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0%</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0%</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">%</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                                Auto Ref Ven
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0%</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0%</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">%</td>
                            </tr>
                            <tr className="bg-blue-50">
                              <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                                No Asignados
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">86</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">54</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">26</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">6</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">63%</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">24</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">44%</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">1470284</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0.00%</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                                Cross Prop
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">3</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">100%</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">3</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">100%</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">956130</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">6.00%</td>
                            </tr>
                            <tr className="bg-blue-50">
                              <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                                Anulaciones
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">86</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">54</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">26</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">4</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">64%</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0%</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">0.00%</td>
                            </tr>
                            <tr className="bg-gray-100 font-bold">
                              <td className="px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                                SubTotales
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">172</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">111</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">52</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">10</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">64%</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">30</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">27%</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">0</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">3101617</td>
                              <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900"></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="space-y-2 mb-6">
                    <div className="bg-white rounded-lg shadow-sm p-4">
                      <h3 className="text-lg font-semibold text-purple-700 mb-2">Estadísticos</h3>
                      <div className="space-y-1">
                        <p className="text-red-600 font-medium">Asignados</p>
                        <p className="text-purple-600 font-medium">No Asignados</p>
                        <p className="text-green-600 font-medium">Prima: $1.470.283,50</p>
                        <p className="text-green-600 font-medium">Crosselling y Referidos</p>
                        <p className="text-green-600 font-medium">Crosselling Propio: $956.129,50</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-80">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FaUserTie className="text-blue-600 text-xl" />
                  </div>
                  <h2 className="text-lg font-semibold ml-3">Seleccionar Vendedor</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vendedor:</label>
                    <input
                      type="text"
                      placeholder="Adriana Suarez"
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-medium text-gray-900 mb-2">Bienvenido Natalia Mosquera</h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Vendedor Nro:</span> 293
                      </p>
                      <p>
                        <span className="font-medium">Teléfono:</span> 153
                      </p>
                      <p>
                        <span className="font-medium">Celular:</span> 11 5930 2119
                      </p>
                      <p>
                        <span className="font-medium">Email:</span> adrianas@segurobici.com.ar
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
