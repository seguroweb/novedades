import { NextRequest, NextResponse } from "next/server"

export async function POST(NextRequest) {
  try {
    const { usuario, contraseña } = await NextRequest.json()

    // Validate input
    if (!usuario || !contraseña) {
      return NextResponse.json({ message: "Usuario y contraseña son requeridos" }, { status: 400 })
    }

    // Call your Nest.js backend
    const backendResponse = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usuario,
        password: contraseña,
      }),
    })

    const data = await backendResponse.json()

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: data.message || "Error de autenticación" },
        { status: backendResponse.status },
      )
    }

    // Set HTTP-only cookie with the JWT token
    const response = NextResponse.json({ message: "Login exitoso", user: data.user }, { status: 200 })

    response.cookies.set("auth-token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 })
  }
}
