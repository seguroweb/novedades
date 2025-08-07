import Button from "../../../../../../components/Button";
import { ArrowDown, CalendarDays, Filter, Search } from "lucide-react";

export const OperationsFilters = ({
  setIsFilterMenuOpen,
  isFilterMenuOpen,
  filterMenuRef,
  filterButtonRef,
  sortMenuRef,
  sortButtonRef,
   isSortMenuOpen,
  setIsSortMenuOpen,
}) => {
  return (
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
  );
};