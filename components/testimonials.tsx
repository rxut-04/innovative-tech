"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Emily Rodriguez",
    company: "TechStart Inc.",
    position: "CEO",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "NexaTech transformed our business with their custom web application. Their team was professional, responsive, and delivered beyond our expectations. The solution they built has streamlined our operations and significantly improved our customer experience.",
  },
  {
    id: 2,
    name: "David Chen",
    company: "Global Solutions Ltd.",
    position: "CTO",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "Working with NexaTech on our mobile app was a game-changer for our company. Their expertise in cross-platform development allowed us to reach both iOS and Android users with a single codebase, saving us time and resources while delivering an exceptional user experience.",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    company: "Retail Innovations",
    position: "Digital Director",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4,
    text: "The e-commerce platform developed by NexaTech has revolutionized our online sales. Their attention to detail and focus on user experience resulted in a 40% increase in conversion rates within the first month of launch. Highly recommended!",
  },
  {
    id: 4,
    name: "Michael Thompson",
    company: "Data Insights Co.",
    position: "Head of Analytics",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "NexaTech's data analytics solution provided us with valuable insights that have driven our strategic decisions. Their team took the time to understand our business needs and delivered a customized dashboard that makes complex data accessible to our entire team.",
  },
  {
    id: 5,
    name: "Jennifer Lee",
    company: "HealthTech Solutions",
    position: "Operations Manager",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    text: "The security audit conducted by NexaTech was thorough and identified several critical vulnerabilities we weren't aware of. Their remediation plan was clear and effective, giving us peace of mind about our data protection measures.",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const pauseAutoplay = () => {
    setAutoplay(false)
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      autoplayRef.current = null
    }
  }

  const resumeAutoplay = () => {
    setAutoplay(true)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("testimonials")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        nextSlide()
      }, 5000)
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay, currentIndex])

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-900/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-violet-200 dark:border-violet-800/30 bg-white/50 dark:bg-violet-900/10 px-3 py-1 text-sm font-medium text-violet-700 dark:text-violet-300 backdrop-blur-sm mb-4">
            <span className="flex h-2 w-2 rounded-full bg-violet-600 dark:bg-violet-400 mr-2"></span>
            Client Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What Our{" "}
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our clients have to say about working with NexaTech.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto" onMouseEnter={pauseAutoplay} onMouseLeave={resumeAutoplay}>
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="h-full border-violet-200 dark:border-violet-800/30 shadow-lg">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4 border-2 border-violet-200 dark:border-violet-800">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{testimonial.name}</h3>
                          <p className="text-muted-foreground text-sm">{testimonial.position}</p>
                          <p className="text-violet-600 dark:text-violet-400 text-sm">{testimonial.company}</p>
                          <div className="flex mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="relative">
                        <Quote className="absolute -top-2 -left-2 h-8 w-8 text-violet-200 dark:text-violet-800/50 rotate-180" />
                        <p className="text-muted-foreground italic pl-6 pr-6">{testimonial.text}</p>
                        <Quote className="absolute -bottom-2 -right-2 h-8 w-8 text-violet-200 dark:text-violet-800/50" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-white dark:bg-violet-950 rounded-full p-2 shadow-lg z-10 border border-violet-200 dark:border-violet-800/30 hover:bg-violet-100 dark:hover:bg-violet-900/50 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-violet-600 dark:text-violet-400" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-6 bg-white dark:bg-violet-950 rounded-full p-2 shadow-lg z-10 border border-violet-200 dark:border-violet-800/30 hover:bg-violet-100 dark:hover:bg-violet-900/50 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-violet-600 dark:text-violet-400" />
          </button>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  currentIndex === index ? "bg-violet-600 dark:bg-violet-400" : "bg-gray-300 dark:bg-gray-700"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
