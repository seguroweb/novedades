"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export const SalesBarChart = () => {
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

  return (
    <div className="w-full h-[400px] bg-white dark:bg-gray-900 p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Ventas mes a mes - 2025
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis dataKey="month" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Bar dataKey="ventas" fill="#2563EB" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
