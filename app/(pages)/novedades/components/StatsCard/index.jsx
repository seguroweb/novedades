export const StatsCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white rounded-lg border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-lg">
    <div className="flex justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </p>
        <p className="text-2xl font-bold mt-1 dark:text-gray-100">{value}</p>
        {trend && (
          <p
            className={`text-xs mt-2 ${
              trend.isPositive
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {trend.isPositive ? "↑" : "↓"} {trend.value} desde el mes pasado
          </p>
        )}
      </div>
      <div className="bg-blue-50 rounded-full p-3 h-fit dark:bg-blue-900">
        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      </div>
    </div>
  </div>
);
