"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail, CheckCircle, XCircle } from "lucide-react"
import { z } from "zod"
import { useAuth } from "@/app/contexts/AuthContext"
import { API_URL } from "@/app/constants/api"

// Esquema de validación con Zod
const loginSchema = z.object({
  usuario: z
    .string()
    .min(3, "El usuario debe tener al menos 3 caracteres")
    .max(50, "El usuario no puede tener más de 50 caracteres"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(100, "La contraseña es demasiado larga"),
})

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    usuario: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({
    usuario: false,
    password: false,
  })
  const [isValid, setIsValid] = useState(false)
  const { login } = useAuth()

  // Validar el formulario cuando cambian los datos
  useEffect(() => {
    if (touched.usuario || touched.password) {
      validateForm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData])

  // Validar el formulario completo
  const validateForm = () => {
    try {
      loginSchema.parse(formData)
      setErrors({})
      setIsValid(true)
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {}

        error.errors.forEach((err) => {
          const field = err.path[0] 
          if (!fieldErrors[field]) {
            fieldErrors[field] = []
          }
          fieldErrors[field]?.push(err.message)
        })

        setErrors(fieldErrors)
        setIsValid(false)
      }
      return false
    }
  }

  useEffect(() => {
    const testProd = async () => {
      try {
        console.log(API_URL)
        const response = await fetch(`${API_URL}/users/profile`, {
          method: "GET",
        })
        console.log(response)
        const data = await response.json()
      } catch (error) {
        console.log(error)
      }
    }
    testProd()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Marcar todos los campos como tocados
    setTouched({
      usuario: true,
      password: true,
    })

    // Validar antes de enviar
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        // Manejar diferentes tipos de errores del servidor
        if (response.status === 401) {
          setErrors({ form: ["Usuario o contraseña incorrectos"] })
        } else if (response.status === 429) {
          setErrors({ form: ["Demasiados intentos. Inténtalo más tarde"] })
        } else {
          setErrors({ form: [data.message || "Error al iniciar sesión"] })
        }
        return
      }
      const { user, token } = data // Ajusta según la estructura de tu respuesta
      login(user, token)

      // Redirect to dashboard or handle successful login
      //window.location.href = "/dashboard"
    } catch (err) {
      setErrors({ form: ["Error de conexión. Verifica tu internet"] })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))
  }

  // Determinar si un campo es válido, inválido o neutral
  const getFieldStatus = (fieldName) => {
    if (!touched[fieldName]) return "neutral"
    return errors[fieldName] ? "invalid" : "valid"
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Main Content */}
      <main className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-lg border border-gray-100">
            <div className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-600 p-3 rounded-full">
                  <Lock className="h-6 w-6 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Ingreso de Usuario</h2>
              <p className="text-gray-600 mt-1">Ingresa tus credenciales para acceder al sistema</p>
            </div>
            <div className="p-6 pt-0">
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {errors.form && errors.form.length > 0 && (
                  <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 text-sm">
                    {errors.form.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}

                <div className="space-y-1">
                  <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">
                    Usuario
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                    <input
                      id="usuario"
                      name="usuario"
                      type="text"
                      placeholder="Ingresa tu usuario"
                      value={formData.usuario}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      aria-invalid={!!errors.usuario}
                      aria-describedby={errors.usuario ? "usuario-error" : undefined}
                      className={`text-gray-700 pl-10 pr-10 h-12 w-full rounded-md border focus:ring-1 focus:ring-blue-500 ${
                        getFieldStatus("usuario") === "valid"
                          ? "border-green-500 focus:border-green-500"
                          : getFieldStatus("usuario") === "invalid"
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:border-blue-500"
                      }`}
                      required
                    />
                    {getFieldStatus("usuario") === "valid" && (
                      <CheckCircle className="absolute right-3 top-3 h-5 w-5 text-green-500" />
                    )}
                    {getFieldStatus("usuario") === "invalid" && (
                      <XCircle className="absolute right-3 top-3 h-5 w-5 text-red-500" />
                    )}
                  </div>
                  {errors.usuario && touched.usuario && (
                    <div id="usuario-error" className="text-red-600 text-xs mt-1">
                      {errors.usuario.map((error, index) => (
                        <p key={index}>{error}</p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Ingresa tu contraseña"
                      value={formData.password}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? "password-error" : undefined}
                      className={`text-gray-700 pl-10 pr-10 h-12 w-full rounded-md border focus:ring-1 focus:ring-blue-500 ${
                        getFieldStatus("password") === "valid"
                          ? "border-green-500 focus:border-green-500"
                          : getFieldStatus("password") === "invalid"
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:border-blue-500"
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-4 text-gray-400 hover:text-gray-600"
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && touched.password && (
                    <div id="password-error" className="text-red-600 text-xs mt-1">
                      {errors.password.map((error, index) => (
                        <p key={index}>{error}</p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Recordarme
                    </label>
                  </div>
                  <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500 hover:underline">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? "Ingresando..." : "INGRESAR"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  ¿Necesitas ayuda?{" "}
                  <Link href="/contact" className="text-blue-600 hover:underline">
                    Contacta soporte
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
