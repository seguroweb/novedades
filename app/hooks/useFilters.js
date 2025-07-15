import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function useFilters(initialFilters) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState(initialFilters)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  
    const params = new URLSearchParams()
  
    // Agregamos los filtros si no están vacíos o con "Todos"
    Object.entries(filters).forEach(([key, value]) => {
        console.log(value)
      if (value && value !== '') {
        params.set(key, value)
      }
    })
  
    // Reiniciamos a la página 1 al aplicar nuevos filtros
    params.set('page', '1')
  
    // Redirigimos a la URL con los filtros como query params
    router.push(`?${params.toString()}`)
  }

  return { filters, handleChange, handleSubmit }
}
