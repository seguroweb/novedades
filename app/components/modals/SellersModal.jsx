"use client";
import { X, CircleCheck, CircleX } from "lucide-react";
import Image from "next/image"; // opcional

export function SellersModal({ isOpen, onClose, operationData }) {
  if (!isOpen || !operationData) return null;

  const { id, name, role, status, avatar } = operationData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-lg bg-white p-6 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-bold text-gray-900">Vendedor #{id}</h2>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Cerrar</span>
          </button>
        </div>

        {/* Body */}
        <div className="mt-4 flex items-start gap-4">
          {/* Avatar */}
          <img
            src={avatar}
            alt={name}
            className="h-16 w-16 rounded-full object-cover ring-1 ring-gray-200"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray-900">{name}</p>
            <p className="text-sm text-gray-600">{role}</p>
            <p className="text-sm">
              {status === "activo" ? (
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
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Cerrar
          </button>
          {/* Acá podrías agregar acciones: Ver KPIs, Editar, etc. */}
        </div>
      </div>
    </div>
  );
}
