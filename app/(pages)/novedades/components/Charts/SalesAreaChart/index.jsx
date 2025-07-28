"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Ene", ventas: 12000 },
  { month: "Feb", ventas: 21800 },
  { month: "Mar", ventas: 36800 },
  { month: "Abr", ventas: 45500 },
  { month: "May", ventas: 62100 },
  { month: "Jun", ventas: 76300 },
  { month: "Jul", ventas: 94100 },
  { month: "Ago", ventas: 110300 },
  { month: "Sep", ventas: 125100 },
  { month: "Oct", ventas: 144100 },
  { month: "Nov", ventas: 161400 },
  { month: "Dic", ventas: 182000 },
];

export const SalesAreaChart = () => {
  return (
    <div className="w-full h-[400px] bg-white dark:bg-gray-900 p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Ventas acumuladas - 2025
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis dataKey="month" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="ventas"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorVentas)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
