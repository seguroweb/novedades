"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Ene", ventas: 12000 },
  { month: "Feb", ventas: 9800 },
  { month: "Mar", ventas: 15000 },
  { month: "Abr", ventas: 8700 },
  { month: "May", ventas: 16600 },
  { month: "Jun", ventas: 14200 },
  { month: "Jul", ventas: 17800 },
  { month: "Ago", ventas: 16200 },
  { month: "Sep", ventas: 14800 },
  { month: "Oct", ventas: 19000 },
  { month: "Nov", ventas: 17300 },
  { month: "Dic", ventas: 21000 },
];

export const SalesLineChart = () => {
  return (
    <div className="w-full h-[400px] bg-white dark:bg-gray-900 p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Evolución de ventas - 2025
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis dataKey="month" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="ventas"
            stroke="#2563EB"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}