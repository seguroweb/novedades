import { BarChart3, CircleCheck, CircleX } from "lucide-react";

const sellers = [
  {
    id: "001",
    name: "Adriana Suarez",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    role: "Ejecutiva de Ventas",
    status: "activo",
  },
  {
    id: "002",
    name: "Carlos Gómez",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "Supervisor",
    status: "inactivo",
  },
  {
    id: "003",
    name: "Lucía Fernández",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    role: "Asesor Comercial",
    status: "activo",
  },
];

export const SellersTable = () => {
  return (
    <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
              ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vendedor
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rol
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
              Estadísticas
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sellers.map((seller) => (
            <tr
              key={seller.id}
              className="hover:bg-gray-50 text-sm text-gray-900"
            >
              <td className="px-4 py-3 whitespace-nowrap font-medium">
                {seller.id}
              </td>

              <td className="px-4 py-3 whitespace-nowrap flex items-center gap-3">
                <img
                  src={seller.avatar}
                  alt={seller.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span>{seller.name}</span>
              </td>

              <td className="px-4 py-3 whitespace-nowrap">{seller.role}</td>

              <td className="px-4 py-3 whitespace-nowrap">
                {seller.status === "activo" ? (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                    <CircleCheck className="w-4 h-4" />
                    Activo
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full">
                    <CircleX className="w-4 h-4" />
                    Inactivo
                  </span>
                )}
              </td>

              <td className="px-4 py-3 whitespace-nowrap">
                <button
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                  onClick={() => alert(`Ver estadísticas de ${seller.name}`)}
                >
                  <BarChart3 className="w-4 h-4" />
                  Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
