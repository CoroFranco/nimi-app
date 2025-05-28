"use client"

import { SignIn } from "@clerk/nextjs"
import Link from "next/link"
import { Sparkles, Star } from "lucide-react"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex">
      {/* Lado izquierdo - Clerk Sign In */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center mb-8">
            <div className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-emerald-600 bg-clip-text text-transparent flex items-center">
              <div className="mr-2 bg-gradient-to-r from-teal-500 to-emerald-600 text-white p-2 rounded-lg">N</div>
              Nimi
            </div>
          </Link>

          {/* Clerk Sign In Component */}
          <SignIn
            routing="path"
            path="/auth/sign-in"
            signUpUrl="/auth/sign-up"
            forceRedirectUrl="/dashboard"
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
      <div className="hidden lg:flex w-1/2 justify-center bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 relative overflow-hidden">
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
          {/* Badge "Nuevo" */}
          <div className="mb-6">
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">¡Nuevo!</span>
          </div>

          {/* Título principal */}
          <h1 className="text-4xl lg:text-5xl font-bold text-center mb-6 leading-tight">
            El Asistente de IA de Nimi
            <br />
            Revoluciona las Redes Sociales
          </h1>

          {/* Descripción */}
          <p className="text-xl text-center mb-8 text-white/90 max-w-lg">
            Crea contenido personalizado con IA, diseñado específicamente para tu audiencia y red social. Disponible en{" "}
            <span className="underline font-medium">todos los planes</span> (¡incluyendo el gratuito!)
          </p>

          {/* Mockup de la interfaz */}
          <div className="relative">
            {/* Ventana principal del asistente */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md mx-auto">
              <div className="flex items-center mb-4">
                <button className="mr-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="flex items-center">
                  <Sparkles className="w-5 h-5 text-purple-500 mr-2" />
                  <span className="font-semibold text-purple-600">Asistente IA</span>
                </div>
                <button className="ml-auto">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 font-medium mb-2">¿Sobre qué quieres escribir?</p>
                <div className="bg-gray-50 rounded-lg p-3 text-gray-600 text-sm">
                  Escribe un post de Instagram sobre nuestro nuevo...
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-800 text-sm leading-relaxed">
                  ¿Te apetece una taza recién preparada de tu cafetería local? ¡Ven y prueba nuestro nuevo espresso!
                </p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex space-x-2">
                    <button className="text-gray-500 text-xs">📷</button>
                    <button className="text-gray-500 text-xs">🔄 Reintentar</button>
                  </div>
                  <button className="bg-purple-600 text-white px-4 py-1 rounded-lg text-xs font-medium">
                    Reemplazar
                  </button>
                </div>
              </div>

              <div className="flex justify-between mt-4 text-xs text-gray-500">
                <button>🔄 Reformular</button>
                <button>➖ Acortar</button>
                <button>➕ Expandir</button>
              </div>
            </div>

            {/* Iconos de redes sociales flotantes */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-pink-500 to-rose-500 p-3 rounded-2xl shadow-lg">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-black p-3 rounded-2xl shadow-lg">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </div>

            {/* Panel lateral de creación de posts */}
            <div className="absolute top-8 -right-32 bg-white rounded-xl p-4 shadow-xl w-48">
              <h3 className="font-semibold text-gray-800 mb-3">Crear Post</h3>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xs">👤</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-600">
                ¿Necesitas inspiración? Nada mejor que relajarse con nuestro nuevo espresso...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
