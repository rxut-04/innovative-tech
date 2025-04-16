"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const clients = [
  { name: "Company 1", logo: "/placeholder.svg?height=60&width=60" },
  { name: "Company 2", logo: "/placeholder.svg?height=60&width=60" },
  { name: "Company 3", logo: "/placeholder.svg?height=60&width=60" },
  { name: "Company 4", logo: "/placeholder.svg?height=60&width=60" },
  { name: "Company 5", logo: "/placeholder.svg?height=60&width=60" },
  { name: "Company 6", logo: "/placeholder.svg?height=60&width=60" },
  { name: "Company 7", logo: "/placeholder.svg?height=60&width=60" },
  { name: "Company 8", logo: "/placeholder.svg?height=60&width=60" },
]

export default function Clients() {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("clients-section")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  // Auto-rotate animation
  useEffect(() => {
    if (!containerRef.current) return

    const interval = setInterval(() => {
      if (containerRef.current) {
        const firstChild = containerRef.current.firstChild as HTMLElement
        if (firstChild) {
          const clone = firstChild.cloneNode(true) as HTMLElement
          containerRef.current.appendChild(clone)

          // Animate the first child out
          firstChild.style.transition = "transform 0.5s ease, opacity 0.5s ease"
          firstChild.style.transform = "scale(0.8)"
          firstChild.style.opacity = "0"

          // Remove the first child after animation
          setTimeout(() => {
            if (containerRef.current && firstChild.parentNode === containerRef.current) {
              containerRef.current.removeChild(firstChild)
            }
          }, 500)
        }
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="clients-section" className="py-12 bg-gray-50 dark:bg-gray-900/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl font-medium text-muted-foreground">Trusted by Industry Leaders</h2>
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div
              ref={containerRef}
              className="flex items-center justify-center gap-8 overflow-hidden"
              style={{ width: "100%", maxWidth: "1000px" }}
            >
              {clients.map((client, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-shrink-0 w-20 h-20 relative rounded-full bg-white dark:bg-gray-800 shadow-md p-3 grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <Image
                    src={client.logo || "/placeholder.svg"}
                    alt={client.name}
                    fill
                    className="object-contain p-2"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
