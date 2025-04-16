"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

const categories = [
  { id: "all", name: "All Projects" },
  { id: "web", name: "Web Development" },
  { id: "mobile", name: "Mobile Apps" },
  { id: "ui", name: "UI/UX Design" },
  { id: "cloud", name: "Cloud Solutions" },
]

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    category: "web",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Node.js", "MongoDB"],
    description:
      "A comprehensive e-commerce platform with advanced product filtering, user authentication, and payment processing capabilities.",
    challenge:
      "The client needed a scalable e-commerce solution that could handle thousands of products and integrate with their existing inventory management system.",
    solution:
      "We developed a custom React-based frontend with a Node.js backend, implementing efficient database queries and caching strategies to ensure fast loading times even with large product catalogs.",
    results:
      "The new platform increased conversion rates by 35% and reduced cart abandonment by 25% within the first three months after launch.",
    client: "RetailPlus Inc.",
  },
  {
    id: 2,
    title: "Healthcare Mobile App",
    category: "mobile",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React Native", "Firebase", "Health API"],
    description:
      "A patient-centered mobile application that allows users to schedule appointments, access medical records, and communicate with healthcare providers.",
    challenge:
      "Creating a secure, HIPAA-compliant mobile application that integrates with multiple healthcare systems while providing a seamless user experience.",
    solution:
      "We built a cross-platform React Native application with end-to-end encryption for all sensitive data. The app integrates with various healthcare APIs through a custom middleware layer.",
    results:
      "The app has been adopted by over 50,000 patients and has reduced appointment no-shows by 40% for participating healthcare providers.",
    client: "MediCare Solutions",
  },
  {
    id: 3,
    title: "Financial Dashboard",
    category: "ui",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Vue.js", "D3.js", "Python"],
    description:
      "An interactive financial dashboard that visualizes complex data and provides predictive analytics for investment decision-making.",
    challenge:
      "Transforming vast amounts of financial data into actionable insights through intuitive visualizations and predictive models.",
    solution:
      "We created a data pipeline using Python for processing and analysis, combined with a Vue.js frontend for interactive visualizations. D3.js was used for custom charts and graphs.",
    results:
      "The dashboard has helped the client identify investment opportunities that resulted in a 22% increase in portfolio performance year-over-year.",
    client: "Global Investments Ltd.",
  },
  {
    id: 4,
    title: "Cloud Migration Project",
    category: "cloud",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["AWS", "Docker", "Kubernetes"],
    description:
      "A complete migration of legacy on-premises infrastructure to a modern, scalable cloud architecture on AWS.",
    challenge:
      "Migrating a complex legacy system with minimal downtime while improving performance, security, and scalability.",
    solution:
      "We implemented a phased migration approach using containerization with Docker and orchestration with Kubernetes. The new architecture leverages AWS managed services for reduced operational overhead.",
    results:
      "The migration resulted in a 40% reduction in infrastructure costs, 99.99% uptime, and a 60% improvement in application performance.",
    client: "TechCorp Industries",
  },
  {
    id: 5,
    title: "Real Estate Platform",
    category: "web",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "GraphQL", "PostgreSQL"],
    description:
      "A modern real estate platform with advanced search capabilities, virtual tours, and agent-client communication tools.",
    challenge:
      "Building a high-performance platform that can handle complex property searches and rich media content while maintaining excellent SEO.",
    solution:
      "We developed a Next.js application with server-side rendering for optimal SEO, implemented GraphQL for efficient data fetching, and integrated a PostgreSQL database for complex property queries.",
    results:
      "The platform achieved a 45% increase in organic traffic and a 30% improvement in lead generation compared to the client's previous solution.",
    client: "HomeFind Realty",
  },
  {
    id: 6,
    title: "Inventory Management System",
    category: "web",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Angular", "Express", "MongoDB"],
    description:
      "A comprehensive inventory management system with real-time tracking, automated reordering, and detailed reporting capabilities.",
    challenge:
      "Replacing a legacy inventory system with a modern solution that could handle complex warehouse operations and integrate with supplier systems.",
    solution:
      "We developed an Angular-based frontend with an Express backend and MongoDB database, implementing real-time updates using WebSockets and barcode scanning integration.",
    results: "The new system reduced inventory discrepancies by 95% and decreased order fulfillment time by 30%.",
    client: "LogiTech Supply Chain",
  },
]

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const itemsPerView = 3

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("portfolio")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  const filteredProjects =
    selectedCategory === "all" ? projects : projects.filter((project) => project.category === selectedCategory)

  const maxIndex = Math.max(0, Math.ceil(filteredProjects.length / itemsPerView) - 1)

  const openProjectModal = (projectId: number) => {
    setSelectedProject(projectId)
    setIsModalOpen(true)
  }

  const getProject = () => {
    return projects.find((project) => project.id === selectedProject)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  return (
    <section id="portfolio" className="py-20 bg-white dark:bg-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-violet-200 dark:border-violet-800/30 bg-white/50 dark:bg-violet-900/10 px-3 py-1 text-sm font-medium text-violet-700 dark:text-violet-300 backdrop-blur-sm mb-4">
            <span className="flex h-2 w-2 rounded-full bg-violet-600 dark:bg-violet-400 mr-2"></span>
            Our Portfolio
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Showcasing Our{" "}
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore our recent projects and see how we've helped businesses across various industries achieve their
            digital goals.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white"
                  : "border-violet-200 dark:border-violet-800/30 hover:bg-violet-100 dark:hover:bg-violet-900/30"
              }
              onClick={() => {
                setSelectedCategory(category.id)
                setCurrentIndex(0)
              }}
            >
              {category.name}
            </Button>
          ))}
        </div>

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

          {/* Projects Carousel */}
          <div ref={carouselRef} className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(filteredProjects.length / itemsPerView) }).map((_, groupIndex) => (
                <div key={groupIndex} className="min-w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                  {filteredProjects.slice(groupIndex * itemsPerView, (groupIndex + 1) * itemsPerView).map((project) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="group"
                    >
                      <div className="bg-white dark:bg-violet-950/30 rounded-xl overflow-hidden shadow-lg border border-violet-200 dark:border-violet-800/30 hover:shadow-xl hover:shadow-violet-600/10 transition-all duration-300">
                        <div className="relative h-60 overflow-hidden">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <div>
                              <h3 className="text-white text-xl font-bold mb-2">{project.title}</h3>
                              <p className="text-white/80 line-clamp-2">{project.description}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800/30"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                          <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                          <Button
                            onClick={() => openProjectModal(project.id)}
                            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white"
                          >
                            View Case Study
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
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
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedProject && getProject() && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">{getProject()?.title}</DialogTitle>
                  <DialogDescription>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {getProject()?.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800/30"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <div className="relative h-64 md:h-80 w-full mt-4 rounded-lg overflow-hidden">
                  <Image
                    src={getProject()?.image || ""}
                    alt={getProject()?.title || ""}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-6 mt-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Overview</h3>
                    <p className="text-muted-foreground">{getProject()?.description}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">The Challenge</h3>
                    <p className="text-muted-foreground">{getProject()?.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Our Solution</h3>
                    <p className="text-muted-foreground">{getProject()?.solution}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Results</h3>
                    <p className="text-muted-foreground">{getProject()?.results}</p>
                  </div>
                  <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg border border-violet-200 dark:border-violet-800/30">
                    <p className="font-medium">Client: {getProject()?.client}</p>
                  </div>
                  <div className="flex justify-end">
                    <Button className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white">
                      Visit Project <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
