import { Calendar, Eye } from "lucide-react";

export const OperationsFilterForm = ({
  handleChange,
  formData,
  handleSubmit,
}) => {
  return (
    <div className="p-6 pt-0 transition-all duration-300 ease-in-out">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Primera fila */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="buscarPor"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Buscar por:
            </label>
            <select
              id="buscarPor"
              name="buscarPor"
              value={formData.buscarPor}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Fecha">Fecha</option>
              <option value="Cliente">Cliente</option>
              <option value="Poliza">Póliza</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo:
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="tipo"
                  value="Vendedor"
                  checked={formData.tipo === "Vendedor"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Vendedor</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="tipo"
                  value="At.cliente"
                  checked={formData.tipo === "At.cliente"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">At.cliente</span>
              </label>
            </div>
          </div>

          <div>
            <label
              htmlFor="estados"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Estados:
            </label>
            <select
              id="estados"
              name="estados"
              value={formData.estados}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Abiertos">Abiertos</option>
              <option value="Cerrados">Cerrados</option>
              <option value="Todos">Todos</option>
            </select>
          </div>
        </div>

        {/* Segunda fila - Fechas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="fechaDesde"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Fecha desde:
            </label>
            <div className="relative">
              <input
                type="date"
                id="fechaDesde"
                name="fechaDesde"
                value={formData.fechaDesde}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label
              htmlFor="fechaHasta"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Fecha hasta:
            </label>
            <div className="relative">
              <input
                type="date"
                id="fechaHasta"
                name="fechaHasta"
                value={formData.fechaHasta}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Tercera fila */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="formaPago"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Forma de Pago:
            </label>
            <select
              id="formaPago"
              name="formaPago"
              value={formData.formaPago}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Todas">Todas</option>
              <option value="Efectivo">Efectivo</option>
              <option value="Tarjeta">Tarjeta</option>
              <option value="Transferencia">Transferencia</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="estado"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Estado:
            </label>
            <select
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Todos">Todos</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
              <option value="Pendiente">Pendiente</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="producto"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Producto:
            </label>
            <select
              id="producto"
              name="producto"
              value={formData.producto}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Todos">Todos</option>
              <option value="Seguro Auto">Seguro Auto</option>
              <option value="Seguro Hogar">Seguro Hogar</option>
              <option value="Seguro Vida">Seguro Vida</option>
            </select>
          </div>
        </div>

        {/* Cuarta fila */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="compania"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Compañía:
            </label>
            <select
              id="compania"
              name="compania"
              value={formData.compania}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Todos">Todos</option>
              <option value="Allianz">Allianz</option>
              <option value="Zurich">Zurich</option>
              <option value="La Caja">La Caja</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="tipoOperaciones"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tipo de Operaciones:
            </label>
            <select
              id="tipoOperaciones"
              name="tipoOperaciones"
              value={formData.tipoOperaciones}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Todas">Todas</option>
              <option value="Venta">Venta</option>
              <option value="Renovación">Renovación</option>
              <option value="Modificación">Modificación</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="canalesVenta"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Canales de venta:
            </label>
            <select
              id="canalesVenta"
              name="canalesVenta"
              value={formData.canalesVenta}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Todos">Todos</option>
              <option value="Presencial">Presencial</option>
              <option value="Telefónico">Telefónico</option>
              <option value="Online">Online</option>
            </select>
          </div>
        </div>

        {/* Quinta fila */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="ranking"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Ranking:
            </label>
            <select
              id="ranking"
              name="ranking"
              value={formData.ranking}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Todos">Todos</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="opciones"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Opciones:
            </label>
            <select
              id="opciones"
              name="opciones"
              value={formData.opciones}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Vendedor actual">Vendedor actual</option>
              <option value="Todos los vendedores">Todos los vendedores</option>
              <option value="Mi equipo">Mi equipo</option>
            </select>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
          <button
            type="submit"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            <Eye className="h-4 w-4" />
            Aplicar filtros
          </button>
        </div>
      </form>
    </div>
  );
};
