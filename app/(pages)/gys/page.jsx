"use client"

import { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"

// Componente principal del Dashboard
export default function GySDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content */}
      <div className="flex">
        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Nuevo sistema GyS en desarrollo</h1>
        </main>
      </div>
    </div>
  )
}
