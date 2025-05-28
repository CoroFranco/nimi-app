"use client"

import { SignUp } from "@clerk/nextjs"
import Link from "next/link"
import { Sparkles, Calendar, BarChart3, Star, Users, Globe } from "lucide-react"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex">
      {/* Lado izquierdo - Clerk Sign Up */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center mb-8">
            <div className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-emerald-600 bg-clip-text text-transparent flex items-center">
              <div className="mr-2 bg-gradient-to-r from-teal-500 to-emerald-600 text-white p-2 rounded-lg">N</div>
              Nimi
            </div>
          </Link>

          {/* Clerk Sign Up Component */}
          <SignUp
            routing="path"
            path="/auth/sign-up"
            signInUrl="/auth/sign-in"
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white",
              },
            }}
          />

          {/* Footer links */}
          <div className="mt-8 flex justify-center space-x-6 text-sm text-gray-500">
            <Link href="/terms" className="hover:text-gray-700">
              Términos de Servicio
            </Link>
            <Link href="/privacy" className="hover:text-gray-700">
              Política de Privacidad
            </Link>
            <Link href="/security" className="hover:text-gray-700">
              Seguridad
            </Link>
          </div>
        </div>
      </div>

      {/* Lado derecho - Contenido promocional */}
      <div className="hidden lg:flex w-1/2 justify-center bg-gradient-to-br from-teal-500 via-emerald-500 to-cyan-600 relative overflow-hidden">
        {/* Elementos decorativos flotantes */}
        <div className="absolute top-10 right-10 text-white/20">
          <Star className="w-8 h-8" />
        </div>
        <div className="absolute top-32 right-32 text-white/20">
          <Star className="w-6 h-6" />
        </div>
        <div className="absolute bottom-20 left-10 text-white/20">
          <Star className="w-10 h-10" />
        </div>
        <div className="absolute bottom-40 right-20 text-white/20">
          <Star className="w-4 h-4" />
        </div>

        <div className="flex flex-col justify-center items-center p-12 text-white relative z-10">
          {/* Badge "Gratis" */}
          <div className="mb-6">
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
              ¡Gratis para empezar!
            </span>
          </div>

          {/* Título principal */}
          <h1 className="text-4xl lg:text-5xl font-bold text-center mb-6 leading-tight">
            Transforma tu Estrategia
            <br />
            Digital con Nimi
          </h1>

          {/* Descripción */}
          <p className="text-xl text-center mb-8 text-white/90 max-w-lg">
            Automatiza tu presencia en redes sociales con IA avanzada. Programa, analiza y optimiza tu contenido para{" "}
            <span className="underline font-medium">todas las plataformas</span> desde un solo lugar.
          </p>

          {/* Características destacadas */}
          <div className="grid grid-cols-1 gap-4 max-w-md w-full">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="bg-white/20 p-2 rounded-lg mr-4">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Programación Inteligente</h3>
                <p className="text-sm text-white/80">Publica en el momento perfecto</p>
              </div>
            </div>

            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="bg-white/20 p-2 rounded-lg mr-4">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Análisis Avanzado</h3>
                <p className="text-sm text-white/80">Métricas que realmente importan</p>
              </div>
            </div>

            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="bg-white/20 p-2 rounded-lg mr-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Contenido con IA</h3>
                <p className="text-sm text-white/80">Genera posts que convierten</p>
              </div>
            </div>
          </div>

          {/* Mockup de dashboard */}
          <div className="mt-8 relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Dashboard</h3>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Posts programados</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Engagement rate</span>
                  <span className="font-semibold text-green-300">+15%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Alcance total</span>
                  <span className="font-semibold">12.5K</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Redes conectadas</span>
                  <div className="flex space-x-1">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs">f</div>
                    <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-xs">📷</div>
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-xs">🎵</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Elementos flotantes adicionales */}
            <div className="absolute -top-2 -right-2 bg-white/20 backdrop-blur-sm p-2 rounded-lg">
              <Users className="w-4 h-4" />
            </div>
            <div className="absolute -bottom-2 -left-2 bg-white/20 backdrop-blur-sm p-2 rounded-lg">
              <Globe className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
