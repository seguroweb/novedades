"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Ene", Juan: 4000, Ana: 2400, Pedro: 2400 },
  { month: "Feb", Juan: 3000, Ana: 1398, Pedro: 2210 },
  { month: "Mar", Juan: 2000, Ana: 9800, Pedro: 2290 },
  { month: "Abr", Juan: 2780, Ana: 3908, Pedro: 2000 },
  { month: "May", Juan: 1890, Ana: 4800, Pedro: 2181 },
  { month: "Jun", Juan: 2390, Ana: 3800, Pedro: 2500 },
  { month: "Jul", Juan: 3490, Ana: 4300, Pedro: 2100 },
];

const COLORS = {
  Juan: "#3b82f6",
  Ana: "#10b981",
  Pedro: "#f59e0b",
};

export const SalesStackedBarChart = () => {
  return (
    <div className="w-full h-[450px] bg-white dark:bg-gray-900 p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Ventas apiladas por mes - 2025
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis dataKey="month" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Juan" stackId="ventas" fill={COLORS.Juan} />
          <Bar dataKey="Ana" stackId="ventas" fill={COLORS.Ana} />
          <Bar dataKey="Pedro" stackId="ventas" fill={COLORS.Pedro} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
