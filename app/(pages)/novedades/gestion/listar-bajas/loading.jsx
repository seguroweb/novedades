export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="loading loading-spinner loading-lg text-teal-600"></div>
        <p className="mt-4 text-gray-600">Cargando listado de bajas...</p>
      </div>
    </div>
  )
}
