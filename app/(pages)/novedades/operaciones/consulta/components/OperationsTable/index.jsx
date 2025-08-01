"use client";

import {
  ArrowDownUp,
  Bike,
  Car,
  Edit,
  Mail,
  Phone,
  UserCircleIcon,
} from "lucide-react";

export const OperationsTable = ({ operations, handleEditClick }) => {
  const getProductIcon = (type) => {
    if (!type) return null;

    switch (type) {
      case "Moto":
        return <Phone className="inline-block mr-1" />;
      case "Auto":
        return <Car className="inline-block mr-1" />;
      case "Bicicleta":
        return <Bike className="inline-block mr-1" />;
      default:
        return null;
    }
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "Sin gestion":
        return "bg-yellow-100 text-yellow-800";
      case "Baja":
        return "bg-red-100 text-red-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg"
          >
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600 rounded"
            />
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Nro
            <ArrowDownUp className="inline-block ml-1 h-3 w-3" />
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Producto
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Vendedor
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Fecha
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Primera gestión
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Cliente
          </th>
          {/* <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            CP
                          </th> */}
          <th
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Teléfono
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Email
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Forma pago
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Estado
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Estado de emisión
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Motivo baja
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Canal venta
            <ArrowDownUp className="inline-block ml-1 h-3 w-3" />
          </th>
          <th
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Ultima gestion
            <ArrowDownUp className="inline-block ml-1 h-3 w-3" />
          </th>
          {/* <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Proximo contacto
                          </th> */}
          <th
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg"
          >
            Acción
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {operations.map((row, index) => (
          <tr key={index} className="hover:bg-gray-50 text-gray-900 text-sm">
            <td className="px-4 py-3 whitespace-nowrap">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600 rounded"
              />
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-gray-900 font-medium">
              {row.numero}
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
              {/* {row?.product.descripcion} */}
              <div className="flex justify-center items-center">
                {getProductIcon(row?.product.descripcion)}
              </div>
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
              {/* {row?.seller?.nombre} */}
              <div className="flex justify-center items-center">
                <img
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  width={30}
                  className="rounded-full"
                />
              </div>
            </td>
            <td className="px-4 py-3 whitespace-nowrap">{row.fecha}</td>
            <td className="px-4 py-3 whitespace-nowrap">
              {row.primeraGestion}
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
              <div className="flex items-center gap-2">
                 <img
                  src="https://randomuser.me/api/portraits/men/13.jpg"
                  width={30}
                  className="rounded-full"
                />
                <span>{row.nombre}</span>
              </div>
            </td>
            {/* <td className="px-4 py-3 whitespace-nowrap">
                              {row.codigo_postal}
                            </td> */}
            <td className="px-4 py-3 whitespace-nowrap">
              {/* {row.telefono} */}
              <div
                className="flex justify-center items-center cursor-pointer"
                onClick={() => handleEditClick(row, true)}
              >
                <Phone />
              </div>
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
              <div
                className="flex justify-center items-center cursor-pointer"
                onClick={() => handleEditClick(row, true)}
              >
                <Mail />
              </div>
              {/* {row.email} */}
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
              {row?.paymentMethod?.description ?? "-"}
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(
                  row.status
                )}`}
              >
                {row.status.descripcion}
              </span>
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
              {row?.acStatus?.descripcion ?? "-"}
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
              {row?.cancellationReason?.descripcion ?? "-"}
            </td>
            <td className="px-4 py-3 whitespace-nowrap">
              {row.channel.descripcion}
            </td>
            <td className="px-4 py-3 whitespace-nowrap">{row.ultimaGestion}</td>
            {/* <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center gap-1">
                                <input
                                  type="date"
                                  value={row.proximoContacto}
                                  className="w-28 rounded-md border border-gray-300 py-1 px-2 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                              </div>
                            </td> */}
            <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
              <div className="flex items-center space-x-2">
                <button
                  className="text-gray-600 hover:text-blue-600 p-1 rounded-md hover:bg-gray-100 flex items-center justify-center gap-3"
                  onClick={() => handleEditClick(row)}
                >
                  Editar
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
