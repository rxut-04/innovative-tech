"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const techCategories = [
  {
    id: "frontend",
    name: "Frontend",
    technologies: [
      { name: "React", logo: "/placeholder.svg?height=60&width=60" },
      { name: "Vue.js", logo: "/placeholder.svg?height=60&width=60" },
      { name: "Angular", logo: "/placeholder.svg?height=60&width=60" },
      { name: "Next.js", logo: "/placeholder.svg?height=60&width=60" },
      { name: "TypeScript", logo: "/placeholder.svg?height=60&width=60" },
      { name: "Tailwind CSS", logo: "/placeholder.svg?height=60&width=60" },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    technologies: [
      { name: "Node.js", logo: "/placeholder.svg?height=60&width=60" },
      { name: "Python", logo: "/placeholder.svg?height=60&width=60" },
      { name: "Java", logo: "/placeholder.svg?height=60&width=60" },
      { name: "PHP", logo: "/placeholder.svg?height=60&width=60" },
      { name: ".NET", logo: "/placeholder.svg?height=60&width=60" },
      { name: "Ruby", logo: "/placeholder.svg?height=60&width=60" },
    ],
  },
  {
    id: "mobile",
    name: "Mobile",
    technologies: [
      { name: "React Native", logo: "/placeholder.svg?height=60&width=60" },
      { name: "Flutter", logo: "/placeholder.svg?height=60&width=60" },
      { name: "Swift", logo: "/placeholder.svg?height=60&width=60" },
      { name: "Kotlin", logo: "/placeholder.svg?height=60&width=60" },
      { name: "Ionic", logo: "/placeholder.svg?height=60&width=60" },
      { name: "Xamarin", logo: "/placeholder.svg?height=60&width=60" },
    ],
  },
  {
    id: "cloud",
    name: "Cloud",
    technologies: [
      { name: "AWS", logo: "/placeholder.svg?height=60&width=60" },
      { name: "Azure", logo: "/placeholder.svg?height=60&width=60" },
      { name: "Google Cloud", logo: "/placeholder.svg?height=60&width=60" },
      { name: "Firebase", logo: "/placeholder.svg?height=60&width=60" },
      { name: "Docker", logo: "/placeholder.svg?height=60&width=60" },
      { name: "Kubernetes", logo: "/placeholder.svg?height=60&width=60" },
    ],
  },
  {
    id: "database",
    name: "Database",
    technologies: [
      { name: "MongoDB", logo: "/placeholder.svg?height=60&width=60" },
      { name: "PostgreSQL", logo: "/placeholder.svg?height=60&width=60" },
      { name: "MySQL", logo: "/placeholder.svg?height=60&width=60" },
      { name: "Redis", logo: "/placeholder.svg?height=60&width=60" },
      { name: "Firebase", logo: "/placeholder.svg?height=60&width=60" },
      { name: "Elasticsearch", logo: "/placeholder.svg?height=60&width=60" },
    ],
  },
]

export default function Technologies() {
  const [activeTab, setActiveTab] = useState("frontend")
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

    const element = document.getElementById("technologies")
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
    <section id="technologies" className="py-20 bg-gray-50 dark:bg-gray-900/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-violet-200 dark:border-violet-800/30 bg-white/50 dark:bg-violet-900/10 px-3 py-1 text-sm font-medium text-violet-700 dark:text-violet-300 backdrop-blur-sm mb-4">
            <span className="flex h-2 w-2 rounded-full bg-violet-600 dark:bg-violet-400 mr-2"></span>
            Technologies
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Cutting-Edge{" "}
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Technologies
            </span>{" "}
            We Use
          </h2>
          <p className="text-lg text-muted-foreground">
            We leverage the latest technologies and frameworks to build robust, scalable, and future-proof solutions for
            our clients.
          </p>
        </motion.div>

        <Tabs defaultValue="frontend" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-violet-100/50 dark:bg-violet-900/10">
              {techCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-violet-950/50 data-[state=active]:text-violet-700 dark:data-[state=active]:text-violet-300 data-[state=active]:shadow-sm"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {techCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, staggerChildren: 0.1 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8"
              >
                {category.technologies.map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-20 h-20 bg-white dark:bg-violet-950/30 rounded-xl shadow-md border border-violet-200 dark:border-violet-800/30 p-3 flex items-center justify-center mb-3 hover:shadow-lg transition-shadow">
                      <Image
                        src={tech.logo || "/placeholder.svg"}
                        alt={tech.name}
                        width={60}
                        height={60}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm font-medium">{tech.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
