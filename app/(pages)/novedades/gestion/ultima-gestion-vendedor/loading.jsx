export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700">Cargando...</p>
        <p className="text-gray-500">Por favor espere mientras se cargan los datos.</p>
      </div>
    </div>
  )
}
