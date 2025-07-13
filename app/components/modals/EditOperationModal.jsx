"use client"

import { useState, useEffect } from "react"
import { X, Save, XCircle, Calendar } from "lucide-react"

export function EditOperationModal({ isOpen, onClose, operationData, onSave }) {
  const [formData, setFormData] = useState(operationData)

  useEffect(() => {
    setFormData(operationData)
  }, [operationData])

  if (!isOpen || !formData) return null

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-bold text-gray-900">Editar Operación: {formData.nro}</h2>
          <button onClick={onClose} className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <X className="h-5 w-5" />
            <span className="sr-only">Cerrar</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Display non-editable fields - reverted to plain div with Tailwind styling */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 mb-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Cliente:</label>
                <p className="mt-1 text-sm text-gray-900 font-semibold">{formData.nombre}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Producto:</label>
                <p className="mt-1 text-sm text-gray-900 font-semibold">{formData.producto}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha:</label>
                <p className="mt-1 text-sm text-gray-900 font-semibold">{formData.fecha}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Estado:</label>
                <p className="mt-1 text-sm text-gray-900 font-semibold">{formData.estado}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Editable: Vendedor */}
            <div>
              <label htmlFor="vendedor" className="block text-sm font-medium text-gray-700 mb-1">
                Vendedor:
              </label>
              <select
                id="vendedor"
                name="vendedor"
                value={formData.vendedor}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Adriana Suarez">Adriana Suarez</option>
                <option value="Otro Vendedor">Otro Vendedor</option>
              </select>
            </div>

            {/* Editable: Motivo Baja */}
            <div>
              <label htmlFor="motivoBaja" className="block text-sm font-medium text-gray-700 mb-1">
                Motivo baja:
              </label>
              <select
                id="motivoBaja"
                name="motivoBaja"
                value={formData.motivoBaja}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Seleccionar">Seleccionar</option>
                <option value="No Interesado">No Interesado</option>
                <option value="Precio Alto">Precio Alto</option>
                <option value="Ya Asegurado">Ya Asegurado</option>
              </select>
            </div>

            {/* Editable: Canal Venta */}
            <div>
              <label htmlFor="canalVenta" className="block text-sm font-medium text-gray-700 mb-1">
                Canal venta:
              </label>
              <select
                id="canalVenta"
                name="canalVenta"
                value={formData.canalVenta}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Whatsapp">Whatsapp</option>
                <option value="Bicicleteria">Bicicleteria</option>
                <option value="Web">Web</option>
              </select>
            </div>

            {/* Editable: Proximo Contacto */}
            <div>
              <label htmlFor="proximoContacto" className="block text-sm font-medium text-gray-700 mb-1">
                Próximo contacto:
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="proximoContacto"
                  name="proximoContacto"
                  value={formData.proximoContacto}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 rounded-md bg-gray-100 px-6 py-2 font-medium text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <XCircle className="h-4 w-4" />
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 transition-colors"
            >
              <Save className="h-4 w-4" />
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
