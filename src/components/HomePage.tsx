"use client"

import type React from "react"
import Link from "next/link"
import { useEffect, useState, type FC, type JSX } from "react"
import { Calendar, BarChart3, Zap, Users, Globe, ArrowRight, Check, Sparkles, Star, Play, ArrowUpCircle, Rocket, Target, Menu, X } from 'lucide-react'
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import {  SignedIn, SignedOut } from "@clerk/nextjs"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

interface MousePosition {
  x: number
  y: number
}

interface Feature {
  id: string
  icon: JSX.Element
  title: string
  description: string
  gradient: string
}

interface PricingPlan {
  id: string
  name: string
  price: string
  period: string
  features: string[]
  popular?: boolean
  buttonText: string
}

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  text: string
}

const Homepage: FC = () => {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({})
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
  // Configurar el seguimiento del mouse
  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }
  window.addEventListener("mousemove", handleMouseMove)

  // Configurar el observer para detectar elementos visibles
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id
        if (id && entry.isIntersecting) {
          setIsVisible((prev) => ({ ...prev, [id]: true }))
        }
      })
    },
    { threshold: 0.1 },
  )

  // Observar todos los elementos con ID
  const elements = document.querySelectorAll<HTMLElement>("[id]")
  elements.forEach((el) => observer.observe(el))

  // Crear contexto GSAP para limpiar correctamente
  const ctx = gsap.context(() => {
    // Animación de entrada para secciones
    const sections = document.querySelectorAll("section")
    sections.forEach((section) => {
      gsap.fromTo(
        section, 
        { opacity: 0, y: 50 }, 
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        }
      )
    })

    // Animación de entrada para la navegación
    gsap.fromTo(
      "nav", 
      { y: -100, opacity: 0 }, 
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      }
    )
  })

  // Función de limpieza
  return () => {
    // Limpiar observer
    observer.disconnect()
    
    // Limpiar event listener
    window.removeEventListener("mousemove", handleMouseMove)
    
    // Limpiar todas las animaciones GSAP y ScrollTriggers
    ctx.revert() // Esto limpia todas las animaciones creadas en el contexto
    
    // Asegurarse de que todos los ScrollTriggers se eliminen
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    
    // Limpiar cualquier animación GSAP pendiente
    gsap.killTweensOf("*")
  }
}, []) // Solo se ejecuta una vez al montar el componente

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: `#${id}`, offsetY: 100 },
      ease: "power2.out",
    })
  }

  const features: Feature[] = [
    {
      id: "feature-0",
      icon: <Calendar className="w-6 h-6" />,
      title: "Programación Inteligente",
      description:
        "Algoritmos que analizan tu audiencia para optimizar horarios de publicación y maximizar el engagement.",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      id: "feature-1",
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Análisis Predictivo",
      description: "Métricas en tiempo real y predicciones avanzadas para anticipar el rendimiento de tu contenido.",
      gradient: "from-violet-500 to-purple-600",
    },
    {
      id: "feature-2",
      icon: <Zap className="w-6 h-6" />,
      title: "Automatización Total",
      description:
        "Publica tu contenido automáticamente las 24 horas, los 7 días de la semana sin intervención manual.",
      gradient: "from-amber-500 to-orange-600",
    },
    {
      id: "feature-3",
      icon: <Users className="w-6 h-6" />,
      title: "Colaboración en Equipo",
      description: "Trabaja con tu equipo asignando roles, permisos específicos y flujos de aprobación personalizados.",
      gradient: "from-cyan-500 to-sky-600",
    },
    {
      id: "feature-4",
      icon: <Globe className="w-6 h-6" />,
      title: "Multi-Plataforma",
      description: "Conecta con todas las principales redes sociales desde un solo lugar con sincronización perfecta.",
      gradient: "from-slate-500 to-gray-600",
    },
    {
      id: "feature-5",
      icon: <Sparkles className="w-6 h-6" />,
      title: "Generador con IA",
      description: "Crea contenido de texto e imágenes usando inteligencia artificial de última generación.",
      gradient: "from-rose-500 to-pink-600",
    },
  ]

  const pricing: PricingPlan[] = [
    {
      id: "plan-0",
      name: "Starter",
      price: "€0",
      period: "/mes",
      features: [
        "3 cuentas sociales",
        "50 publicaciones/mes",
        "Análisis básico",
        "Soporte por email",
        "Plantillas prediseñadas",
      ],
      buttonText: "Comenzar Gratis",
    },
    {
      id: "plan-1",
      name: "Profesional",
      price: "€49",
      period: "/mes",
      features: [
        "15 cuentas sociales",
        "Publicaciones ilimitadas",
        "IA avanzada para contenido",
        "Análisis detallado y reportes",
        "Soporte prioritario 24/7",
        "Colaboración en equipo",
        "API personalizada",
      ],
      popular: true,
      buttonText: "Prueba Gratuita de 14 días",
    },
    {
      id: "plan-2",
      name: "Empresarial",
      price: "€199",
      period: "/mes",
      features: [
        "Cuentas ilimitadas",
        "API empresarial completa",
        "Soporte dedicado premium",
        "Informes personalizados",
        "Gestor de cuenta asignado",
        "Integración personalizada",
        "SLA garantizado",
      ],
      buttonText: "Contactar Ventas",
    },
  ]

  const testimonials: Testimonial[] = [
    {
      id: "testimonial-0",
      name: "María García",
      role: "Directora de Marketing",
      company: "TechStart",
      text: "Hemos aumentado nuestro engagement un 300% y reducido el tiempo de gestión en un 80%. Nimi ha transformado completamente nuestra estrategia digital.",
    },
    {
      id: "testimonial-1",
      name: "Carlos López",
      role: "Community Manager",
      company: "CreativeAgency",
      text: "La automatización me ahorra 15 horas semanales que ahora dedico a estrategia. La IA genera contenido que realmente conecta con nuestra audiencia.",
    },
    {
      id: "testimonial-2",
      name: "Ana Martínez",
      role: "CEO",
      company: "DigitalBrand",
      text: "Los análisis predictivos nos han ayudado a optimizar completamente nuestra estrategia. ROI incrementado en un 250% en solo 6 meses.",
    },
  ]

  const socialNetworks = [
    { name: "Instagram", color: "from-pink-500 via-red-500 to-yellow-500", icon: "📷", position: "top-[15%] left-[8%]", delay: "0s" },
    { name: "Facebook", color: "from-blue-600 to-blue-700", icon: "📘", position: "top-[25%] right-[12%]", delay: "1s" },
    { name: "Twitter", color: "from-sky-400 to-sky-600", icon: "🐦", position: "top-[45%] left-[5%]", delay: "2s" },
    { name: "TikTok", color: "from-gray-900 via-red-500 to-white", icon: "🎵", position: "top-[55%] right-[8%]", delay: "3s" },
    { name: "YouTube", color: "from-red-600 to-red-700", icon: "📺", position: "top-[35%] right-[20%]", delay: "4s" },
    { name: "LinkedIn", color: "from-blue-700 to-blue-800", icon: "💼", position: "bottom-[25%] left-[10%]", delay: "5s" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 text-slate-800 overflow-hidden">
      {/* Cursor personalizado - solo en desktop */}
      <div
        className="fixed w-4 h-4 bg-emerald-500 rounded-full pointer-events-none z-50 mix-blend-multiply transition-transform duration-100 ease-out opacity-60 hidden lg:block"
        style={{ left: mousePosition.x - 8, top: mousePosition.y - 8 }}
      />

      {/* Navegación mejorada */}
      <nav className="fixed top-0 w-full backdrop-blur-xl bg-white/90 shadow-sm z-40 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex items-center">
              <div className="mr-2 sm:mr-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl shadow-lg">
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              Nimi
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-8 items-center">
              <a
                href="#features"
                onClick={(e) => handleNavClick(e, "features")}
                className="text-slate-600 hover:text-emerald-600 transition-colors duration-200 font-medium"
              >
                Características
              </a>
              <a
                href="#pricing"
                onClick={(e) => handleNavClick(e, "pricing")}
                className="text-slate-600 hover:text-emerald-600 transition-colors duration-200 font-medium"
              >
                Precios
              </a>
              <a
                href="#testimonials"
                onClick={(e) => handleNavClick(e, "testimonials")}
                className="text-slate-600 hover:text-emerald-600 transition-colors duration-200 font-medium"
              >
                Testimonios
              </a>

              <div className="flex gap-3 ml-6">
                <SignedOut>
                <Link
                  href="/auth/sign-in"
                  className="px-4 py-2 rounded-lg text-slate-700 hover:text-emerald-600 transition-all duration-300 font-medium border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50"
                >
                  Iniciar sesión
                </Link>

                <Link
                  href="/auth/sign-up"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Registrarme
                </Link>
                </SignedOut>
                <SignedIn>
                  <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Dashboard
                </Link>
                </SignedIn>
                
              </div>
            </div>

            {/* Mobile menu button */}
            <button 
              className="lg:hidden text-slate-700 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menú"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-emerald-100">
              <div className="flex flex-col space-y-4 pt-4">
                <a
                  href="#features"
                  onClick={(e) => handleNavClick(e, "features")}
                  className="text-slate-600 hover:text-emerald-600 transition-colors duration-200 font-medium py-2"
                >
                  Características
                </a>
                <a
                  href="#pricing"
                  onClick={(e) => handleNavClick(e, "pricing")}
                  className="text-slate-600 hover:text-emerald-600 transition-colors duration-200 font-medium py-2"
                >
                  Precios
                </a>
                <a
                  href="#testimonials"
                  onClick={(e) => handleNavClick(e, "testimonials")}
                  className="text-slate-600 hover:text-emerald-600 transition-colors duration-200 font-medium py-2"
                >
                  Testimonios
                </a>
                
                <div className="flex flex-col gap-3 pt-4 border-t border-emerald-100">
                  
                  <Link
                    href="/auth/sign-in"
                    className="px-4 py-2 rounded-lg text-slate-700 hover:text-emerald-600 transition-all duration-300 font-medium border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 text-center"
                  >
                    Iniciar sesión
                  </Link>

                  <Link
                    href="/auth/sign-up"
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg text-center"
                  >
                    Registrarme
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section Optimizado */}
      <section className="pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 text-center px-4 sm:px-6 relative overflow-hidden">
        
        {/* Fondo animado simplificado */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/30 via-teal-50/20 to-cyan-100/30"></div>
          
          {/* Logos de redes sociales - solo en desktop */}
          <div className="hidden lg:block">
            {socialNetworks.map((social) => (
              <div
                key={social.name}
                className={`absolute ${social.position} animate-pulse opacity-10 hover:opacity-20 transition-opacity duration-300`}
                style={{ animationDelay: social.delay }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${social.color} rounded-xl flex items-center justify-center text-white text-lg shadow-lg`}>
                  {social.icon}
                </div>
              </div>
            ))}
          </div>

          {/* Elementos decorativos simplificados */}
          <div className="absolute top-[20%] left-[10%] transform -rotate-12 animate-pulse opacity-5">
            <Rocket className="w-16 h-16 text-violet-600" />
          </div>
          <div className="absolute top-[60%] right-[10%] transform rotate-12 animate-pulse opacity-5">
            <Target className="w-16 h-16 text-rose-600" />
          </div>
        </div>

        <div className={`max-w-6xl mx-auto transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"} relative z-10`}>
          
          {/* Logo principal */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl blur-lg opacity-40"></div>
              <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 p-3 sm:p-4 rounded-2xl shadow-xl">
                <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
              </div>
            </div>
          </div>

          {/* Título principal optimizado */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent block">
              Revoluciona
            </span>
            <span className="bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 bg-clip-text text-transparent block mt-2">
              Tus Redes Sociales
            </span>
            <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl block mt-3 sm:mt-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
              con Inteligencia Artificial
            </span>
          </h1>

          {/* Subtítulo optimizado */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed text-slate-700 font-medium px-4">
            La plataforma <span className="text-emerald-600 font-bold">TODO-EN-UNO</span> que automatiza tu marketing digital,
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent font-bold">
              genera contenido viral
            </span> y hace crecer tu audiencia <span className="text-amber-600 font-bold">mientras duermes</span>
          </p>

          {/* Botones de acción optimizados */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12 px-4">
            <button className="w-full sm:w-auto group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white rounded-xl text-base sm:text-lg font-bold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
              <Zap className="w-5 h-5 mr-2 relative z-10" />
              <span className="relative z-10">Comenzar GRATIS</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
            </button>
            
            <button className="w-full sm:w-auto group px-6 sm:px-8 py-3 sm:py-4 border-2 border-emerald-400 text-emerald-700 rounded-xl text-base sm:text-lg font-bold hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all duration-300 flex items-center justify-center backdrop-blur-sm bg-white/80">
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
              Ver Demo
            </button>
          </div>

          {/* Estadísticas optimizadas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-4">
            <div className="group text-center p-4 sm:p-6 bg-white/80 backdrop-blur-lg rounded-2xl border border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-600 mb-2 group-hover:scale-110 transition-transform duration-300">+50K</div>
              <div className="text-slate-700 font-semibold text-sm sm:text-base">Empresas nos eligen</div>
              <div className="text-emerald-600 text-xs sm:text-sm font-medium mt-1">¡Y creciendo!</div>
            </div>
            
            <div className="group text-center p-4 sm:p-6 bg-white/80 backdrop-blur-lg rounded-2xl border border-violet-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-violet-600 mb-2 group-hover:scale-110 transition-transform duration-300">500%</div>
              <div className="text-slate-700 font-semibold text-sm sm:text-base">Más engagement</div>
              <div className="text-violet-600 text-xs sm:text-sm font-medium mt-1">Comprobado</div>
            </div>
            
            <div className="group text-center p-4 sm:p-6 bg-white/80 backdrop-blur-lg rounded-2xl border border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-600 mb-2 group-hover:scale-110 transition-transform duration-300">25h</div>
              <div className="text-slate-700 font-semibold text-sm sm:text-base">Ahorradas/semana</div>
              <div className="text-amber-600 text-xs sm:text-sm font-medium mt-1">Tiempo = Dinero</div>
            </div>
          </div>

          {/* Badge de confianza */}
          <div className="mt-8 sm:mt-12 flex justify-center px-4">
            <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full px-4 sm:px-6 py-3 border border-emerald-200 shadow-lg">
              <div className="flex items-center space-x-2 sm:space-x-4 text-sm sm:text-base">
                <div className="flex -space-x-1">
                  {[1,2,3,4,5].map((i) => (
                    <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full border-2 border-white"></div>
                  ))}
                </div>
                <span className="text-slate-700 font-semibold text-xs sm:text-sm">50,000+ usuarios activos</span>
                <div className="flex text-amber-400">
                  {[1,2,3,4,5].map((i) => (
                    <span key={i} className="text-sm sm:text-base">⭐</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Características */}
      <section id="features" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-white to-emerald-50">
        <div
          className={`text-center mb-12 sm:mb-16 lg:mb-20 px-4 sm:px-6 transform transition-all duration-800 ${isVisible["features"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Características Poderosas
          </h2>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto text-slate-600 leading-relaxed">
            Todas las herramientas que necesitas para dominar las redes sociales
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              id={feature.id}
              className={`group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform ${
                isVisible[feature.id] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              } hover:scale-105 border border-emerald-100 hover:border-emerald-200`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              ></div>

              <div
                className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${feature.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center text-white mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
              >
                {feature.icon}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-slate-800 group-hover:text-emerald-700 transition-colors duration-200">
                {feature.title}
              </h3>

              <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-200 text-sm sm:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Precios */}
      <section id="pricing" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-emerald-50 to-white">
        <div
          className={`text-center mb-12 sm:mb-16 lg:mb-20 px-4 sm:px-6 transform transition-all duration-800 ${isVisible["pricing"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Planes para Cada Necesidad
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            Elige el plan perfecto para hacer crecer tu negocio
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {pricing.map((plan, index) => (
            <div
              key={plan.id}
              id={plan.id}
              className={`relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-700 transform ${
                isVisible[plan.id] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              } ${
                plan.popular
                  ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white scale-105 shadow-2xl border-2 border-emerald-400"
                  : "bg-white text-slate-800 shadow-lg hover:shadow-xl border border-emerald-100 hover:border-emerald-200"
              } hover:scale-105`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 sm:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                    ⭐ Más Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold">{plan.price}</span>
                  <span className="text-lg sm:text-xl ml-1 opacity-80">{plan.period}</span>
                </div>
                {plan.popular && <div className="text-emerald-100 text-xs sm:text-sm">Ahorra 30% anualmente</div>}
              </div>

              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {plan.features.map((featureText, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check
                      className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0 mt-0.5 ${plan.popular ? "text-emerald-200" : "text-emerald-500"}`}
                    />
                    <span className="text-xs sm:text-sm leading-relaxed">{featureText}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base ${
                  plan.popular
                    ? "bg-white text-emerald-600 hover:bg-emerald-50 shadow-lg"
                    : "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonios */}
      <section id="testimonials" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-white to-slate-50">
        <div
          className={`text-center mb-12 sm:mb-16 lg:mb-20 px-4 sm:px-6 transform transition-all duration-800 ${isVisible["testimonials"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            Más de 10,000 empresas transformando su presencia digital
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              id={testimonial.id}
              className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform ${
                isVisible[testimonial.id] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              } hover:scale-105 border border-emerald-100 hover:border-emerald-200 group`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex mb-4 sm:mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-current" />
                ))}
              </div>

              <p className="text-slate-700 mb-4 sm:mb-6 italic leading-relaxed text-sm sm:text-base lg:text-lg group-hover:text-slate-800 transition-colors duration-200">
                {testimonial.text}
              </p>

              <div className="border-t border-emerald-100 pt-4 sm:pt-6">
                <div className="font-bold text-slate-800 text-base sm:text-lg">{testimonial.name}</div>
                <div className="text-slate-600 text-xs sm:text-sm">{testimonial.role}</div>
                <div className="text-emerald-600 font-semibold text-xs sm:text-sm">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section
        id="final-cta"
        className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div
          className={`max-w-5xl mx-auto px-4 sm:px-6 relative z-10 transform transition-all duration-800 ${isVisible["final-cta"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
            ¿Listo para Transformar tu Estrategia Digital?
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 sm:mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Únete a miles de empresas que ya están creciendo exponencialmente con Nimi.
            <span className="font-semibold block sm:inline"> Prueba gratuita de 14 días, sin tarjeta de crédito.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <button className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-white text-emerald-600 rounded-xl sm:rounded-2xl text-lg sm:text-xl font-bold hover:bg-emerald-50 transform hover:scale-105 transition-all duration-300 shadow-2xl">
              Comenzar Prueba Gratuita
            </button>
            <button className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 border-2 border-white/30 text-white rounded-xl sm:rounded-2xl text-lg sm:text-xl font-bold hover:bg-white/10 transition-all duration-300">
              Hablar con un Experto
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-16 bg-slate-900 text-slate-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 sm:mb-12">
            <div className="col-span-1 sm:col-span-2">
              <div className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent flex items-center">
                <div className="mr-2 sm:mr-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-1.5 sm:p-2 rounded-lg sm:rounded-xl">
                  <Sparkles className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                Nimi
              </div>
              <p className="text-slate-400 mb-4 sm:mb-6 max-w-md leading-relaxed text-sm sm:text-base">
                Automatización inteligente para redes sociales. Transforma tu presencia digital con el poder de la
                inteligencia artificial.
              </p>
              <div className="flex space-x-3 sm:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors duration-200 cursor-pointer">
                  <span className="text-xs sm:text-sm font-bold">f</span>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors duration-200 cursor-pointer">
                  <span className="text-xs sm:text-sm font-bold">t</span>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors duration-200 cursor-pointer">
                  <span className="text-xs sm:text-sm font-bold">in</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Producto</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors duration-200 text-xs sm:text-sm">
                    Características
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors duration-200 text-xs sm:text-sm">
                    Precios
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors duration-200 text-xs sm:text-sm">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors duration-200 text-xs sm:text-sm">
                    Integraciones
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Soporte</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors duration-200 text-xs sm:text-sm">
                    Centro de Ayuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors duration-200 text-xs sm:text-sm">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors duration-200 text-xs sm:text-sm">
                    Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-400 transition-colors duration-200 text-xs sm:text-sm">
                    Términos
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 sm:pt-8 text-center">
            <p className="text-slate-400 text-xs sm:text-sm">
              © 2024 Nimi. Todos los derechos reservados. Hecho con ❤️ para revolucionar el marketing digital.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        className="fixed bottom-6 right-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full p-3 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 z-50"
        onClick={() => gsap.to(window, { duration: 1, scrollTo: 0, ease: "power2.out" })}
        aria-label="Volver arriba"
      >
        <ArrowUpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        
        @keyframes social-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
          50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.6); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-social-float {
          animation: social-float 4s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default Homepage
