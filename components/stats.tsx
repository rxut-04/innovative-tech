"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import CountUp from "react-countup"
import { Users, CheckCircle, Award, Globe, Code, Zap } from "lucide-react"

const stats = [
  {
    icon: <CheckCircle className="h-8 w-8 text-violet-600 dark:text-violet-400" />,
    value: 250,
    label: "Projects Completed",
    suffix: "+",
  },
  {
    icon: <Users className="h-8 w-8 text-violet-600 dark:text-violet-400" />,
    value: 120,
    label: "Happy Clients",
    suffix: "+",
  },
  {
    icon: <Award className="h-8 w-8 text-violet-600 dark:text-violet-400" />,
    value: 15,
    label: "Industry Awards",
  },
  {
    icon: <Globe className="h-8 w-8 text-violet-600 dark:text-violet-400" />,
    value: 10,
    label: "Years of Experience",
    suffix: "+",
  },
  {
    icon: <Code className="h-8 w-8 text-violet-600 dark:text-violet-400" />,
    value: 1.5,
    label: "Million Lines of Code",
    suffix: "M+",
    decimals: 1,
  },
  {
    icon: <Zap className="h-8 w-8 text-violet-600 dark:text-violet-400" />,
    value: 99.9,
    label: "Uptime Percentage",
    suffix: "%",
    decimals: 1,
  },
]

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <section className="py-20 bg-gradient-to-br from-violet-600 to-purple-600 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-white/10 blur-3xl opacity-70" />
        <div className="absolute top-[60%] -left-[10%] w-[50%] h-[50%] rounded-full bg-white/10 blur-3xl opacity-70" />
      </div>

      <div className="container mx-auto px-4" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-white/20 mr-4">{stat.icon}</div>
                <div>
                  <h3 className="text-3xl font-bold text-white">
                    {isVisible ? (
                      <CountUp
                        end={stat.value}
                        duration={2.5}
                        suffix={stat.suffix || ""}
                        decimals={stat.decimals || 0}
                      />
                    ) : (
                      <span>0{stat.suffix || ""}</span>
                    )}
                  </h3>
                  <p className="text-white/80">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
