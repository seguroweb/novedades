"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, Shield } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    console.log(JSON.stringify({ email }))

    try {
      const response = await fetch("http://localhost:3001/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Error al enviar el email")
      }

      setIsSuccess(true)
      setMessage("Se ha enviado un enlace de recuperación a tu email")
    } catch (err) {
      setIsSuccess(false)
      setMessage(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-blue-600">SeguroWeb</h1>
              <p className="text-xs text-gray-600">Recuperación de Contraseña</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <div className="space-y-1 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-600 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">Recuperar Contraseña</div>
              <div className="text-gray-600">
                Ingresa tu email para recibir un enlace de recuperación
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {message && (
                  <div className={isSuccess ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                    <div className={isSuccess ? "text-green-800" : "text-red-800"}>
                      {message}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Enviando..." : "Enviar Enlace"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500 hover:underline"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Volver al login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
