export default function Loading() {
    return (
      <div className="p-4 sm:p-6 lg:p-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4 dark:bg-gray-700"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8 dark:bg-gray-700"></div>
  
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 bg-gray-200 rounded w-1/5 dark:bg-gray-700"></div>
            <div className="flex gap-3">
              <div className="h-10 bg-gray-200 rounded w-48 dark:bg-gray-700"></div>
              <div className="h-10 bg-gray-200 rounded w-24 dark:bg-gray-700"></div>
              <div className="h-10 bg-gray-200 rounded w-24 dark:bg-gray-700"></div>
            </div>
          </div>
  
          <div className="overflow-x-auto">
            <div className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <div className="bg-gray-50 grid grid-cols-7 gap-4 px-6 py-3 dark:bg-gray-700">
                <div className="h-4 bg-gray-200 rounded w-3/4 dark:bg-gray-600"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 dark:bg-gray-600"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 dark:bg-gray-600"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 dark:bg-gray-600"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 dark:bg-gray-600"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 dark:bg-gray-600"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 dark:bg-gray-600"></div>
              </div>
              <div className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="grid grid-cols-7 gap-4 px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                      <div>
                        <div className="h-4 bg-gray-200 rounded w-24 mb-1 dark:bg-gray-700"></div>
                        <div className="h-3 bg-gray-200 rounded w-32 dark:bg-gray-700"></div>
                      </div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 dark:bg-gray-700"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 dark:bg-gray-700"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 dark:bg-gray-700"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 dark:bg-gray-700"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 dark:bg-gray-700"></div>
                    <div className="h-6 bg-gray-200 rounded w-6 dark:bg-gray-700"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
  
          <div className="flex items-center justify-between pt-4">
            <div className="h-4 bg-gray-200 rounded w-1/4 dark:bg-gray-700"></div>
            <div className="flex gap-2">
              <div className="h-8 bg-gray-200 rounded w-20 dark:bg-gray-700"></div>
              <div className="h-8 bg-gray-200 rounded w-8 dark:bg-gray-700"></div>
              <div className="h-8 bg-gray-200 rounded w-8 dark:bg-gray-700"></div>
              <div className="h-8 bg-gray-200 rounded w-20 dark:bg-gray-700"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  