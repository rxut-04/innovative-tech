"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import CountUp from "react-countup"

const stats = [
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 250, suffix: "+", label: "Projects Completed" },
  { value: 50, suffix: "+", label: "Team Members" },
  { value: 30, suffix: "+", label: "Industry Awards" },
]

const values = [
  {
    title: "Innovation",
    description: "We constantly push boundaries and explore new technologies to deliver cutting-edge solutions.",
  },
  {
    title: "Excellence",
    description: "We strive for excellence in everything we do, from code quality to client communication.",
  },
  {
    title: "Integrity",
    description: "We operate with transparency, honesty, and ethical practices in all our business dealings.",
  },
  {
    title: "Collaboration",
    description: "We believe in the power of teamwork and partnership with our clients for mutual success.",
  },
]

export default function About() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("about")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-violet-600/10 border border-violet-200 dark:border-violet-800/30">
              <Image
                src="/images/aboutus1.jpg"
                width={600}
                height={600}
                alt="Our Team"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 to-transparent mix-blend-overlay" />
            </div>

            {/* Stats Overlay */}
            <div className="absolute bottom-8 right-8 left-8 bg-white/90 dark:bg-violet-950/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-violet-200 dark:border-violet-800/30 grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                    {isVisible ? (
                      <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                    ) : (
                      <span>0{stat.suffix}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Background Decorations */}
            <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-br from-violet-400/30 to-purple-400/30 dark:from-violet-400/10 dark:to-purple-400/10 blur-2xl" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center rounded-full border border-violet-200 dark:border-violet-800/30 bg-white/50 dark:bg-violet-900/10 px-3 py-1 text-sm font-medium text-violet-700 dark:text-violet-300 backdrop-blur-sm mb-4">
              <span className="flex h-2 w-2 rounded-full bg-violet-600 dark:bg-violet-400 mr-2"></span>
              About Us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pioneering{" "}
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Digital Innovation
              </span>{" "}
              Since 2013
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              NexaTech is a leading technology solutions provider dedicated to helping businesses transform and thrive
              in the digital era. With over a decade of experience, we've established ourselves as trusted partners for
              companies seeking innovative tech solutions.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Our team of expert developers, designers, and strategists work collaboratively to deliver exceptional
              results that drive business growth and create meaningful digital experiences.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="flex"
                >
                  <CheckCircle2 className="h-6 w-6 text-violet-600 dark:text-violet-400 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold mb-1">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative h-12 w-12 rounded-full overflow-hidden">
                <Image src="/placeholder.svg?height=48&width=48" alt="CEO" fill className="object-cover" />
              </div>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-muted-foreground">Founder & CEO</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
