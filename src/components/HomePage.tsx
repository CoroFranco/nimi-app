"use client"

import type React from "react"
import { useEffect, useState, type FC, type JSX } from "react"
import {
  Calendar,
  BarChart3,
  Zap,
  Users,
  Globe,
  ArrowRight,
  Check,
  Sparkles,
  Star,
  Play,
  ArrowUpCircle,
  Moon,
  Sun,
} from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

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
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Añadir estilos globales para las animaciones
  useEffect(() => {
    // Añadir estilos para las animaciones de float
    const style = document.createElement("style")
    style.innerHTML = `
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
        100% { transform: translateY(0px); }
      }
      @keyframes float-delayed {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
        100% { transform: translateY(0px); }
      }
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      .animate-float-delayed {
        animation: float-delayed 8s ease-in-out infinite;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
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

    document.querySelectorAll<HTMLElement>("[id]").forEach((el) => observer.observe(el))

    const sections = document.querySelectorAll("section")
    sections.forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      })
    })
    gsap.from("nav", {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    })

    return () => {
      observer.disconnect()
      window.removeEventListener("mousemove", handleMouseMove)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    gsap.to(window, { 
      duration: 1, 
      scrollTo: { y: `#${id}`, offsetY: 300 },
      ease: "power2.out" 
      })
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const features: Feature[] = [
    {
      id: "feature-0",
      icon: <Calendar className="w-8 h-8" />,
      title: "Programación Inteligente",
      description: "Algoritmos que analizan tu audiencia para optimizar horarios de publicación.",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      id: "feature-1",
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Análisis Predictivo",
      description: "Métricas en tiempo real y predicciones avanzadas para tu contenido.",
      gradient: "from-violet-500 to-purple-500",
    },
    {
      id: "feature-2",
      icon: <Zap className="w-8 h-8" />,
      title: "Automatización Total",
      description: "Publica tu contenido automáticamente las 24 horas, los 7 días de la semana.",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      id: "feature-3",
      icon: <Users className="w-8 h-8" />,
      title: "Colaboración en Equipo",
      description: "Trabaja con tu equipo asignando roles y permisos específicos.",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      id: "feature-4",
      icon: <Globe className="w-8 h-8" />,
      title: "Multi-Plataforma",
      description: "Conecta con todas las principales redes sociales desde un solo lugar.",
      gradient: "from-indigo-500 to-slate-500",
    },
    {
      id: "feature-5",
      icon: <Sparkles className="w-8 h-8" />,
      title: "Generador con IA",
      description: "Crea contenido de texto e imágenes usando inteligencia artificial.",
      gradient: "from-rose-500 to-pink-500",
    },
  ]

  const pricing: PricingPlan[] = [
    {
      id: "plan-0",
      name: "Gratuito",
      price: "€0",
      period: "/mes",
      features: ["3 cuentas sociales", "50 publicaciones/mes", "Análisis básico", "Soporte por email"],
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
        "IA avanzada",
        "Análisis detallado",
        "Soporte prioritario",
      ],
      popular: true,
      buttonText: "Prueba Gratuita",
    },
    {
      id: "plan-2",
      name: "Empresarial",
      price: "€199",
      period: "/mes",
      features: [
        "Cuentas ilimitadas",
        "API empresarial",
        "Soporte dedicado",
        "Informes personalizados",
        "Gestor de cuenta",
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
      text: "Hemos aumentado nuestro engagement un 300% desde que usamos Nimi.",
    },
    {
      id: "testimonial-1",
      name: "Carlos López",
      role: "Community Manager",
      company: "CreativeAgency",
      text: "La automatización me ahorra 10 horas semanales. Increíble herramienta.",
    },
    {
      id: "testimonial-2",
      name: "Ana Martínez",
      role: "CEO",
      company: "DigitalBrand",
      text: "Los análisis predictivos nos han ayudado a optimizar completamente nuestra estrategia.",
    },
  ]

  return (
    <div
      className={`min-h-screen transition-colors duration-300 overflow-hidden ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-slate-50 to-gray-100 text-gray-800"
      }`}
    >
      <div
        className={`fixed w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ease-out ${
          isDarkMode ? "bg-emerald-400" : "bg-slate-600"
        }`}
        style={{ left: mousePosition.x - 12, top: mousePosition.y - 12 }}
      />

      {/* Navegación */}
      <nav
        className={`fixed top-0 w-full backdrop-blur-md shadow-sm z-40 transition-colors duration-300 ${
          isDarkMode ? "bg-slate-900/80" : "bg-white/80"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex items-center">
            <div className="mr-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-2 rounded-lg">N</div>
            Nimi
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <a
              href="#feature-0"
              onClick={(e) => handleNavClick(e, "feature-0")}
              className={`transition-colors duration-200 ${
                isDarkMode ? "hover:text-emerald-400" : "hover:text-emerald-600"
              }`}
            >
              Características
            </a>
            <a
              href="#plan-0"
              onClick={(e) => handleNavClick(e, "plan-0")}
              className={`transition-colors duration-200 ${
                isDarkMode ? "hover:text-emerald-400" : "hover:text-emerald-600"
              }`}
            >
              Precios
            </a>
            <a
              href="#testimonial-0"
              onClick={(e) => handleNavClick(e, "testimonial-0")}
              className={`transition-colors duration-200 ${
                isDarkMode ? "hover:text-emerald-400" : "hover:text-emerald-600"
              }`}
            >
              Testimonios
            </a>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all duration-200 ${
                isDarkMode
                  ? "bg-slate-800 text-yellow-400 hover:bg-slate-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              Comenzar Ahora
            </button>
          </div>
          <button className={`md:hidden ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 text-center px-6 relative overflow-hidden">
        {/* Iconos de redes sociales en el fondo */}
        <div className="absolute inset-0 w-full h-full opacity-10 overflow-hidden">
          {/* Facebook */}
          <div className="absolute top-[10%] left-[5%] transform -rotate-12 opacity-70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={isDarkMode ? "text-emerald-400" : "text-slate-600"}
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </div>

          {/* Twitter/X */}
          <div className="absolute top-[15%] right-[10%] transform rotate-12 opacity-70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={isDarkMode ? "text-teal-400" : "text-slate-700"}
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
            </svg>
          </div>

          {/* LinkedIn */}
          <div className="absolute top-[40%] left-[8%] transform rotate-6 opacity-70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={isDarkMode ? "text-cyan-400" : "text-slate-600"}
            >
              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"></path>
            </svg>
          </div>

          {/* YouTube */}
          <div className="absolute top-[50%] right-[7%] transform -rotate-12 opacity-70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={isDarkMode ? "text-rose-400" : "text-slate-700"}
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </div>

          {/* TikTok */}
          <div className="absolute bottom-[15%] left-[12%] transform rotate-12 opacity-70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={isDarkMode ? "text-violet-400" : "text-slate-600"}
            >
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path>
            </svg>
          </div>

          {/* Instagram */}
          <div className="absolute bottom-[10%] right-[15%] transform -rotate-6 opacity-70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={isDarkMode ? "text-pink-400" : "text-slate-700"}
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
            </svg>
          </div>

          {/* Pinterest */}
          <div className="absolute top-[30%] left-[25%] transform -rotate-12 opacity-70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={isDarkMode ? "text-amber-400" : "text-slate-600"}
            >
              <path
                d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* WhatsApp */}
          <div className="absolute top-[60%] right-[25%] transform rotate-12 opacity-70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70"
              height="70"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={isDarkMode ? "text-emerald-400" : "text-slate-700"}
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </div>
        </div>

        <div
          className={`max-w-4xl mx-auto transform transition-all duration-1000 ${isVisible["hero"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"} relative z-10`}
        >
          <div className="flex justify-center mb-6">
            <div className="animate-bounce">
              <Star className="w-12 h-12 text-amber-500" />
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
            Tu Presencia Digital
            <br />
            <span className={`animate-pulse duration-1000 ${isDarkMode ? "text-gray-100" : "text-slate-800"}`}>
              Transformada por IA
            </span>
          </h1>
          <p
            className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            La plataforma todo-en-uno que automatiza tu marketing en redes sociales, genera contenido que convierte y
            hace crecer tu audiencia mientras duermes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center">
              Comenzar Gratis
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button
              className={`group px-8 py-4 border-2 rounded-full text-lg font-semibold transition-all duration-300 flex items-center ${
                isDarkMode
                  ? "border-slate-600 text-gray-300 hover:border-emerald-500 hover:text-emerald-400"
                  : "border-gray-300 text-gray-700 hover:border-emerald-500 hover:text-emerald-600"
              }`}
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
              Ver Demo
            </button>
          </div>
        </div>

        {/* Burbujas animadas */}
        <div className="absolute top-20 left-10 animate-float">
          <div
            className={`w-20 h-20 rounded-full opacity-20 ${
              isDarkMode
                ? "bg-gradient-to-r from-emerald-400 to-teal-500"
                : "bg-gradient-to-r from-emerald-400 to-teal-500"
            }`}
          ></div>
        </div>
        <div className="absolute top-40 right-20 animate-float-delayed">
          <div
            className={`w-16 h-16 rounded-full opacity-20 ${
              isDarkMode
                ? "bg-gradient-to-r from-violet-400 to-purple-500"
                : "bg-gradient-to-r from-violet-400 to-purple-500"
            }`}
          ></div>
        </div>
        <div className="absolute bottom-20 left-1/4 animate-float">
          <div
            className={`w-12 h-12 rounded-full opacity-20 ${
              isDarkMode ? "bg-gradient-to-r from-cyan-400 to-blue-500" : "bg-gradient-to-r from-cyan-400 to-blue-500"
            }`}
          ></div>
        </div>
      </section>

      {/* Características */}
      <section
        id="features-title"
        className={`py-20 relative transition-colors duration-300 ${isDarkMode ? "bg-slate-800" : "bg-white"}`}
      >
        <div
          className={`text-center mb-16 transform transition-all duration-800 ${isVisible["features-title"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h2
            className={`text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${
              isDarkMode ? "from-gray-100 to-gray-300" : "from-gray-800 to-gray-600"
            }`}
          >
            Características Poderosas
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Todas las herramientas que necesitas para dominar las redes sociales
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              id={feature.id}
              className={`group relative p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform ${
                isVisible[feature.id] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              } hover:scale-105 border ${isDarkMode ? "bg-slate-700 border-slate-600" : "bg-white border-gray-100"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              ></div>
              <div
                className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>
              <h3
                className={`text-2xl font-bold mb-4 transition-colors duration-200 ${
                  isDarkMode ? "text-gray-100 group-hover:text-white" : "text-gray-800 group-hover:text-gray-900"
                }`}
              >
                {feature.title}
              </h3>
              <p
                className={`leading-relaxed transition-colors duration-200 ${
                  isDarkMode ? "text-gray-300 group-hover:text-gray-200" : "text-gray-600 group-hover:text-gray-700"
                }`}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Precios */}
      <section
        id="pricing-title"
        className={`py-20 transition-colors duration-300 ${
          isDarkMode ? "bg-gradient-to-br from-slate-900 to-slate-800" : "bg-gradient-to-br from-gray-50 to-slate-50"
        }`}
      >
        <div
          className={`text-center mb-16 transform transition-all duration-800 ${isVisible["pricing-title"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h2
            className={`text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${
              isDarkMode ? "from-gray-100 to-gray-300" : "from-gray-800 to-gray-600"
            }`}
          >
            Planes para Cada Necesidad
          </h2>
          <p className={`text-xl ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Elige el plan perfecto para hacer crecer tu negocio
          </p>
        </div>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricing.map((plan, index) => (
            <div
              key={plan.id}
              id={plan.id}
              className={`relative p-8 rounded-2xl transition-all duration-700 transform ${
                isVisible[plan.id] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              } ${
                plan.popular
                  ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white scale-105 shadow-2xl"
                  : isDarkMode
                    ? "bg-slate-800 text-gray-100 shadow-lg hover:shadow-xl border border-slate-700"
                    : "bg-white text-gray-800 shadow-lg hover:shadow-xl"
              } hover:scale-105`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold animate-pulse">
                    Más Popular
                  </div>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-xl ml-1 opacity-80">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((featureText, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check
                      className={`w-5 h-5 mr-3 flex-shrink-0 ${plan.popular ? "text-emerald-300" : "text-emerald-500"}`}
                    />
                    <span className="text-sm">{featureText}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  plan.popular
                    ? "bg-white text-emerald-600 hover:bg-gray-100"
                    : "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonios */}
      <section
        id="testimonials-title"
        className={`py-20 transition-colors duration-300 ${isDarkMode ? "bg-slate-800" : "bg-white"}`}
      >
        <div
          className={`text-center mb-16 transform transition-all duration-800 ${isVisible["testimonials-title"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h2
            className={`text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${
              isDarkMode ? "from-gray-100 to-gray-300" : "from-gray-800 to-gray-600"
            }`}
          >
            Lo Que Dicen Nuestros Clientes
          </h2>
        </div>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={t.id}
              id={t.id}
              className={`p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform ${
                isVisible[t.id] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              } hover:scale-105 ${
                isDarkMode
                  ? "bg-gradient-to-br from-slate-700 to-slate-600"
                  : "bg-gradient-to-br from-gray-50 to-slate-50"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-500 fill-current" />
                ))}
              </div>
              <p className={`mb-6 italic leading-relaxed ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
                {t.text}
              </p>
              <div>
                <div className={`font-semibold ${isDarkMode ? "text-gray-100" : "text-gray-800"}`}>{t.name}</div>
                <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{t.role}</div>
                <div className="text-sm text-emerald-600 font-medium">{t.company}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section id="final-cta" className="py-20 bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-center">
        <div
          className={`max-w-4xl mx-auto px-6 transform transition-all duration-800 ${isVisible["final-cta"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h2 className="text-5xl font-bold mb-6">¿Listo para Transformar tu Estrategia Digital?</h2>
          <p className="text-xl mb-8 opacity-90">Únete a miles de empresas que ya están creciendo con Nimi</p>
          <button className="px-10 py-4 bg-white text-emerald-600 rounded-full text-xl font-bold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
            Comenzar Prueba Gratuita
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-12 text-center transition-colors duration-300 ${
          isDarkMode ? "bg-slate-900 text-gray-300" : "bg-gray-900 text-gray-300"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            Nimi
          </div>
          <p className="mb-6">Automatización inteligente para redes sociales</p>
          <div className="flex justify-center space-x-8 mb-6">
            <a href="#" className="hover:text-white transition-colors duration-200">
              Privacidad
            </a>
            <a href="#" className="hover:text-white transition-colors duration-200">
              Términos
            </a>
            <a href="#" className="hover:text-white transition-colors duration-200">
              Soporte
            </a>
            <a href="#" className="hover:text-white transition-colors duration-200">
              Contacto
            </a>
          </div>
          <p className="text-sm opacity-70">© 2024 Nimi. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        className={`fixed bottom-10 right-10 rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
          isDarkMode
            ? "bg-emerald-600 text-white hover:bg-emerald-700"
            : "bg-emerald-500 text-white hover:bg-emerald-600"
        }`}
        onClick={() => gsap.to(window, { duration: 1, scrollTo: 0, ease: "power2.out" })}
      >
        <ArrowUpCircle className="w-8 h-8" />
      </button>
    </div>
  )
}
export default Homepage
