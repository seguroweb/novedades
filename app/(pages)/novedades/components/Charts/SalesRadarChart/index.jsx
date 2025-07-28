"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    criterio: "Ventas",
    Juan: 120,
    Maria: 110,
    Pedro: 95,
  },
  {
    criterio: "Clientes nuevos",
    Juan: 80,
    Maria: 90,
    Pedro: 100,
  },
  {
    criterio: "Tickets cerrados",
    Juan: 95,
    Maria: 100,
    Pedro: 85,
  },
  {
    criterio: "Satisfacción",
    Juan: 85,
    Maria: 95,
    Pedro: 80,
  },
  {
    criterio: "Tiempo respuesta",
    Juan: 75,
    Maria: 85,
    Pedro: 90,
  },
];

export const SalesRadarChart = () => {
  return (
    <div className="w-full h-[400px] bg-white dark:bg-gray-900 p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Desempeño de vendedores por KPI
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <RadarChart outerRadius="80%" data={data}>
          <PolarGrid stroke="#ccc" />
          <PolarAngleAxis dataKey="criterio" stroke="#888" />
          <PolarRadiusAxis angle={30} domain={[0, 120]} />
          <Tooltip />
          <Legend />
          <Radar
            name="Juan"
            dataKey="Juan"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.3}
          />
          <Radar
            name="Maria"
            dataKey="Maria"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.3}
          />
          <Radar
            name="Pedro"
            dataKey="Pedro"
            stroke="#f59e0b"
            fill="#f59e0b"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
