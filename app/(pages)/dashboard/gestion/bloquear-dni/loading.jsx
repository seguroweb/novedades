export default function Loading() {
  return (
    <div className="p-6">
      {/* Breadcrumbs skeleton */}
      <div className="mb-6 flex items-center space-x-2">
        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        <span className="text-gray-300">/</span>
        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        <span className="text-gray-300">/</span>
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Título skeleton */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse mr-3"></div>
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Descripción skeleton */}
      <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-6"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Formulario skeleton */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="mb-4">
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="flex justify-between items-center">
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Lista skeleton */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 bg-gray-100">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse mr-3"></div>
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mt-2"></div>
            </div>
            <div className="p-4">
              <div className="h-64 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Panel lateral skeleton */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse mr-2"></div>
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
