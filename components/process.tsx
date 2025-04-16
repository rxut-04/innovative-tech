"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { Search, Code, CheckCircle, Zap, Rocket, BarChart, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const processSteps = [
  {
    icon: <Search className="h-6 w-6" />,
    title: "Discovery",
    description:
      "We begin by understanding your business goals, target audience, and project requirements through in-depth consultations.",
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "Planning",
    description:
      "Our team creates a detailed project roadmap, including timelines, milestones, and resource allocation.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Design & Development",
    description:
      "We design and develop your solution using agile methodologies, ensuring regular updates and feedback integration.",
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "Testing & QA",
    description:
      "Rigorous testing ensures your solution is bug-free, secure, and performs optimally across all platforms.",
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: "Deployment",
    description:
      "We handle the seamless deployment of your solution, ensuring a smooth transition and minimal disruption.",
  },
  {
    icon: <BarChart className="h-6 w-6" />,
    title: "Support & Growth",
    description:
      "Our relationship continues with ongoing support, maintenance, and strategic guidance for future growth.",
  },
]

export default function Process() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const itemsPerView = 3
  const maxIndex = Math.ceil(processSteps.length / itemsPerView) - 1

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("process")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  return (
    <section id="process" className="py-20 bg-white dark:bg-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-violet-200 dark:border-violet-800/30 bg-white/50 dark:bg-violet-900/10 px-3 py-1 text-sm font-medium text-violet-700 dark:text-violet-300 backdrop-blur-sm mb-4">
            <span className="flex h-2 w-2 rounded-full bg-violet-600 dark:bg-violet-400 mr-2"></span>
            Our Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            How We{" "}
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Transform
            </span>{" "}
            Your Ideas
          </h2>
          <p className="text-lg text-muted-foreground">
            Our proven development process ensures efficient delivery of high-quality solutions that meet your business
            objectives and exceed expectations.
          </p>
        </motion.div>

        <div className="relative">
          {/* Carousel Navigation */}
          <div className="flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 px-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white dark:bg-violet-950 border border-violet-200 dark:border-violet-800/30 shadow-md"
              onClick={prevSlide}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white dark:bg-violet-950 border border-violet-200 dark:border-violet-800/30 shadow-md"
              onClick={nextSlide}
              disabled={currentIndex === maxIndex}
            >
              <ChevronRight className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </Button>
          </div>

          {/* Process Steps Carousel */}
          <div ref={carouselRef} className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(processSteps.length / itemsPerView) }).map((_, groupIndex) => (
                <div key={groupIndex} className="min-w-full flex flex-wrap gap-8">
                  {processSteps
                    .slice(groupIndex * itemsPerView, (groupIndex + 1) * itemsPerView)
                    .map((step, stepIndex) => {
                      const index = groupIndex * itemsPerView + stepIndex
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ duration: 0.5, delay: stepIndex * 0.1 }}
                          className="relative z-10 w-full md:w-[calc(33.333%-1.5rem)]"
                        >
                          <div className="bg-white dark:bg-violet-950/30 rounded-xl p-6 shadow-lg border border-violet-200 dark:border-violet-800/30 h-full hover:shadow-xl hover:shadow-violet-600/5 transition-shadow">
                            <div className="flex items-center mb-4">
                              <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center text-violet-600 dark:text-violet-400 mr-4">
                                {step.icon}
                              </div>
                              <div className="flex items-center">
                                <span className="text-xl font-bold mr-2">0{index + 1}</span>
                                <h3 className="text-xl font-bold">{step.title}</h3>
                              </div>
                            </div>
                            <p className="text-muted-foreground">{step.description}</p>
                          </div>
                        </motion.div>
                      )
                    })}
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  currentIndex === index ? "bg-violet-600 dark:bg-violet-400" : "bg-gray-300 dark:bg-gray-700"
                }`}
                aria-label={`Go to  : "bg-gray-300 dark:bg-gray-700"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
