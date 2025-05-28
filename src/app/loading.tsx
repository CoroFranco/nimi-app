"use client"

import { Sparkles, Zap, BarChart3, Calendar } from 'lucide-react'

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-emerald-50 flex items-center justify-center z-50">
      {/* Fondo animado */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-cyan-200/25 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Logo principal animado */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Anillo exterior giratorio */}
            <div className="absolute inset-0 w-24 h-24 border-4 border-emerald-200 rounded-full animate-spin"></div>
            <div className="absolute inset-2 w-20 h-20 border-4 border-teal-300 rounded-full animate-spin-reverse"></div>
            
            {/* Logo central */}
            <div className="relative w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-2xl">
              <Sparkles className="w-12 h-12 text-white animate-pulse" />
            </div>
            
            {/* Partículas flotantes */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-400 rounded-full animate-bounce delay-300"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-teal-400 rounded-full animate-bounce delay-700"></div>
            <div className="absolute top-1/2 -right-4 w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-500"></div>
          </div>
        </div>

        {/* Iconos flotantes */}
        <div className="relative mb-8">
          <div className="flex justify-center space-x-8">
            <div className="animate-float">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="animate-float-delayed">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="animate-float">
              <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Texto de carga */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Nimi
          </h2>
          <p className="text-slate-600 text-lg font-medium">Preparando tu experiencia...</p>
          
          {/* Barra de progreso animada */}
          <div className="w-64 mx-auto">
            <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-loading-bar"></div>
            </div>
          </div>
          
          {/* Puntos de carga */}
          <div className="flex justify-center space-x-2 mt-6">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 3s linear infinite;
        }
        
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
