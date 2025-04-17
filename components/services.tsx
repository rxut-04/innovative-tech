"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Code, Smartphone, Palette, Cloud, Database, Brain, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const services = [
  {
    id: "web-development",
    title: "Web Development",
    icon: <Code className="h-10 w-10 text-violet-600 dark:text-violet-400" />,
    description:
      "We build responsive, high-performance websites and web applications using cutting-edge technologies that drive business growth.",
    features: [
      "Custom Web Applications",
      "E-commerce Solutions",
      "Progressive Web Apps",
      "API Development & Integration",
      "CMS Development",
      "Performance Optimization",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "mobile-apps",
    title: "Mobile App Development",
    icon: <Smartphone className="h-10 w-10 text-violet-600 dark:text-violet-400" />,
    description:
      "Our expert team creates native and cross-platform mobile applications that deliver exceptional user experiences across all devices.",
    features: [
      "iOS App Development",
      "Android App Development",
      "Cross-Platform Solutions",
      "App Modernization",
      "Mobile UI/UX Design",
      "App Maintenance & Support",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    icon: <Palette className="h-10 w-10 text-violet-600 dark:text-violet-400" />,
    description:
      "We create intuitive, engaging user interfaces and experiences that enhance user satisfaction and drive conversion rates.",
    features: [
      "User Research & Testing",
      "Wireframing & Prototyping",
      "Visual Design",
      "Interaction Design",
      "Usability Testing",
      "Design Systems",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "cloud-solutions",
    title: "Cloud Solutions",
    icon: <Cloud className="h-10 w-10 text-violet-600 dark:text-violet-400" />,
    description:
      "Our cloud experts help you migrate, optimize, and manage your infrastructure for maximum performance, security, and cost-efficiency.",
    features: [
      "Cloud Migration",
      "Cloud Architecture Design",
      "DevOps Implementation",
      "Serverless Applications",
      "Cloud Security",
      "Cost Optimization",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    icon: <Database className="h-10 w-10 text-violet-600 dark:text-violet-400" />,
    description:
      "Transform your raw data into actionable insights with our comprehensive data analytics and business intelligence solutions.",
    features: [
      "Data Warehousing",
      "Business Intelligence",
      "Data Visualization",
      "Predictive Analytics",
      "Big Data Processing",
      "Custom Dashboards",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    icon: <Brain className="h-10 w-10 text-violet-600 dark:text-violet-400" />,
    description:
      "Leverage the power of artificial intelligence and machine learning to automate processes, gain insights, and create innovative solutions.",
    features: [
      "Machine Learning Models",
      "Natural Language Processing",
      "Computer Vision",
      "Predictive Modeling",
      "AI Integration",
      "Chatbots & Virtual Assistants",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function Services() {
  const [activeTab, setActiveTab] = useState("web-development")
  const [isVisible, setIsVisible] = useState(false)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("services")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % 3)
  }

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + 3) % 3)
  }

  return (
    <section id="services" className="py-20 bg-white dark:bg-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-violet-200 dark:border-violet-800/30 bg-white/50 dark:bg-violet-900/10 px-3 py-1 text-sm font-medium text-violet-700 dark:text-violet-300 backdrop-blur-sm mb-4">
            <span className="flex h-2 w-2 rounded-full bg-violet-600 dark:bg-violet-400 mr-2"></span>
            Our Services
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Comprehensive Technology{" "}
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We offer a wide range of services to help businesses leverage technology for growth, efficiency, and
            innovation. Our expert team delivers tailored solutions to meet your unique needs.
          </p>
        </motion.div>

        <Tabs defaultValue="web-development" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2 p-2 bg-transparent">
              {services.map((service) => (
                <TabsTrigger
                  key={service.id}
                  value={service.id}
                  className="relative px-3 py-2 transition-all duration-300 data-[state=active]:text-violet-600 dark:data-[state=active]:text-violet-400 data-[state=active]:bg-violet-50 dark:data-[state=active]:bg-violet-950/30 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-950/20"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg bg-violet-100/50 dark:bg-violet-900/20">
                      {React.cloneElement(service.icon, { 
                        className: "h-5 w-5 text-violet-600 dark:text-violet-400" 
                      })}
                    </div>
                    <span className="text-xs md:text-sm font-medium">{service.title}</span>
                  </div>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600 dark:bg-violet-400 rounded-full"
                    initial={false}
                    animate={{
                      width: activeTab === service.id ? "100%" : "0%",
                      opacity: activeTab === service.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {services.map((service) => (
            <TabsContent key={service.id} value={service.id} className="mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="mr-4 p-3 rounded-2xl bg-violet-100 dark:bg-violet-900/30">{service.icon}</div>
                      <h3 className="text-2xl md:text-3xl font-bold">{service.title}</h3>
                    </div>
                    <p className="text-lg text-muted-foreground mb-8">{service.description}</p>

                    <div className="flex flex-col md:flex-row gap-8 mb-8">
                      <div className="grid grid-cols-1 gap-4">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-start">
                            <div className="mr-2 mt-1 text-violet-600 dark:text-violet-400">
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                ></path>
                              </svg>
                            </div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="md:hidden relative rounded-2xl overflow-hidden shadow-xl shadow-violet-600/10 border border-violet-200 dark:border-violet-800/30 max-w-[468px] w-full mx-auto">
                        <div className="relative aspect-[3/2]">
                          <Image
                            src={service.image || "/placeholder.svg"}
                            fill
                            alt={service.title}
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 to-transparent mix-blend-overlay" />
                        </div>
                      </div>
                    </div>

                    <Button className="group bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-md shadow-violet-600/10">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>

                  <div className="relative hidden md:block">
                    <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-violet-600/10 border border-violet-200 dark:border-violet-800/30 max-w-[468px] w-full ml-auto">
                      <div className="relative aspect-[3/2]">
                        <Image
                          src={service.image || "/placeholder.svg"}
                          fill
                          alt={service.title}
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 to-transparent mix-blend-overlay" />
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -z-10 -bottom-6 -right-6 w-24 h-24 rounded-full bg-violet-100 dark:bg-violet-900/20" />
                    <div className="absolute -z-10 -top-6 -left-6 w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/20" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-20 relative">
          <div className="flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 z-10 px-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white dark:bg-violet-950 border border-violet-200 dark:border-violet-800/30 shadow-md"
              onClick={prevCard}
            >
              <ChevronLeft className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white dark:bg-violet-950 border border-violet-200 dark:border-violet-800/30 shadow-md"
              onClick={nextCard}
            >
              <ChevronRight className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </Button>
          </div>

          <div ref={cardsRef} className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${(currentCardIndex * 100) / 3}%)` }}
            >
              {services.slice(0, 3).map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-full md:w-1/3 flex-shrink-0 px-4"
                >
                  <Card className="h-full border-violet-200 dark:border-violet-800/30 hover:shadow-lg hover:shadow-violet-600/5 transition-shadow">
                    <CardHeader>
                      <div className="p-3 w-fit rounded-2xl bg-violet-100 dark:bg-violet-900/30 mb-4">
                        {React.cloneElement(service.icon, { className: "h-6 w-6" })}
                      </div>
                      <CardTitle>{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="mr-2 mt-1 text-violet-600 dark:text-violet-400">
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                ></path>
                              </svg>
                            </div>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="ghost"
                        className="text-violet-600 dark:text-violet-400 p-0 hover:bg-transparent group"
                      >
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => setCurrentCardIndex(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  currentCardIndex === index ? "bg-violet-600 dark:bg-violet-400" : "bg-gray-300 dark:bg-gray-700"
                }`}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
