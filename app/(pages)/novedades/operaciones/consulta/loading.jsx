import { ChevronDown, Menu, Search, Shield } from "lucide-react"

// Componentes reutilizados del dashboard
const UserProfileSkeleton = () => (
  <div className="flex items-center gap-2 p-2 rounded-lg">
    <div className="bg-gray-200 rounded-full w-10 h-10 animate-pulse"></div>
    <div className="hidden md:block text-left space-y-1">
      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
      <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
    </div>
    <ChevronDown className="h-4 w-4 text-gray-300" />
  </div>
)

const SidebarSkeleton = () => (
  <nav className="w-full h-full overflow-y-auto py-4">
    <div className="px-3 py-2">
      <div className="flex items-center gap-2 px-2">
        <Shield className="h-6 w-6 text-gray-300" />
        <div className="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
      </div>
    </div>

    <div className="mt-6 space-y-1 px-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between w-full rounded-md px-3 py-2 text-sm font-medium">
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-300" />
        </div>
      ))}
    </div>
  </nav>
)

export const TableSkeleton = () => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
          {Array.from({ length: 18 }).map((_, i) => (
            <th
              key={i}
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
        {Array.from({ length: 5 }).map((_, rowIdx) => (
          <tr key={rowIdx}>
            {Array.from({ length: 18 }).map((_, colIdx) => (
              <td key={colIdx} className="px-4 py-3 whitespace-nowrap">
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-full animate-pulse" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    <div className="flex items-center justify-between px-4 py-3 sm:px-6 mt-4 dark:bg-gray-800 dark:border-gray-600">
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse" />
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse" />
    </div>
  </div>
)


export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <button type="button" className="lg:hidden -ml-2 p-2 text-gray-300">
                <Menu className="h-6 w-6" />
              </button>
              <div className="hidden lg:flex lg:items-center lg:space-x-4">
                <Shield className="h-8 w-8 text-gray-300" />
                <div className="h-6 bg-gray-300 rounded w-32 animate-pulse"></div>
              </div>
            </div>

            <div className="hidden md:block flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
                <div className="w-full rounded-md bg-gray-200 py-2 pl-10 pr-4 h-10 animate-pulse"></div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 text-gray-300 rounded-full bg-gray-200 h-9 w-9 animate-pulse"></div>
              <div className="p-2 text-gray-300 rounded-full bg-gray-200 h-9 w-9 animate-pulse"></div>
              <div className="h-6 w-px bg-gray-200 mx-1"></div>
              <UserProfileSkeleton />
            </div>
          </div>
        </div>
      </header>

      {/* Main content skeleton */}
      <div className="flex">
        {/* Desktop sidebar skeleton */}
        <div className="hidden lg:block w-64 border-r border-gray-200 h-[calc(100vh-64px)] sticky top-16">
          <SidebarSkeleton />
        </div>

        {/* Main content area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb Skeleton */}
            <nav className="flex mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                </li>
                <li>
                  <span className="text-gray-300">/</span>
                </li>
                <li>
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                </li>
                <li>
                  <span className="text-gray-300">/</span>
                </li>
                <li>
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                </li>
              </ol>
            </nav>

            {/* Page header skeleton */}
            <div className="mb-6 space-y-2">
              <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
              <div className="h-5 bg-gray-200 rounded w-96 animate-pulse"></div>
            </div>

            {/* Form Skeleton */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
              {Array.from({ length: 5 }).map((_, rowIdx) => (
                <div key={rowIdx} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: rowIdx === 1 ? 2 : 3 }).map((_, colIdx) => (
                    <div key={colIdx}>
                      <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
                      <div className="w-full rounded-md bg-gray-100 py-2 px-3 h-10 animate-pulse"></div>
                    </div>
                  ))}
                </div>
              ))}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                <div className="h-10 w-24 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="h-10 w-24 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="h-10 w-24 bg-gray-200 rounded-md animate-pulse"></div>
                <div className="h-10 w-36 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
            </div>

            {/* Table Skeleton */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6 p-6">
              <div className="h-6 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
              <TableSkeleton /> {/* Using the new TableSkeleton component */}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
