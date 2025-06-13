import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 text-teal-600 animate-spin" />
        <h2 className="mt-4 text-xl font-semibold text-gray-700">Cargando...</h2>
        <p className="mt-2 text-gray-500">Por favor espere mientras se cargan los datos</p>
      </div>
    </div>
  )
}
