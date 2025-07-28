"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Juan", value: 4000 },
  { name: "Ana", value: 3000 },
  { name: "Carlos", value: 2500 },
  { name: "Lucía", value: 2000 },
  { name: "Pedro", value: 1500 },
];

const COLORS = ["#3b82f6", "#10b981", "#facc15", "#f97316", "#ec4899"];

export const SalesPieChart = () => {
  return (
    <div className="w-full h-[400px] bg-white dark:bg-gray-900 p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Proporción de ventas por vendedor - 2025
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={110}
            label
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
