import { Shield } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-8 w-8 text-blue-600" />
        <span className="text-xl font-bold text-blue-600">SeguroWeb</span>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 font-medium">Cargando...</p>
        </div>
      </div>
    </div>
  )
}
