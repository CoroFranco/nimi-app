"use client"

import Homepage from "@/components/HomePage"
import { useEffect, useState } from "react"

export default function Page() {
  // Usar un estado para controlar el renderizado del componente
  const [mounted, setMounted] = useState(false)
  
  // Asegurarse de que el componente solo se monte en el cliente
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])
  
  // Solo renderizar Homepage cuando estamos en el cliente
  if (!mounted) return null
  
  return <Homepage />
}
