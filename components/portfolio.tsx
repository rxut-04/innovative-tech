"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const categories = [
  { id: "all", name: "All Projects" },
  { id: "web", name: "Web Development" },
  { id: "mobile", name: "Mobile Apps" },
  { id: "design", name: "UI/UX Design" },
  { id: "data", name: "Data & Analytics" },
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
    testimonial: {
      quote:
        "The e-commerce platform exceeded our expectations in every way. Our sales have increased significantly, and our customers love the new shopping experience.",
      author: "Sarah Johnson, CEO of RetailPlus",
    },
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
    testimonial: {
      quote:
        "This app has transformed how we interact with our patients. The intuitive interface and robust security features make it a valuable tool for our practice.",
      author: "Dr. Michael Chen, Medical Director",
    },
  },
  {
    id: 3,
    title: "Financial Dashboard",
    category: "data",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["D3.js", "Python", "Machine Learning"],
    description:
      "An interactive financial dashboard that visualizes complex data and provides predictive analytics for investment decision-making.",
    challenge:
      "Transforming vast amounts of financial data into actionable insights through intuitive visualizations and predictive models.",
    solution:
      "We created a data pipeline using Python for processing and analysis, combined with a D3.js frontend for interactive visualizations. Machine learning models were implemented to provide predictive insights.",
    results:
      "The dashboard has helped the client identify investment opportunities that resulted in a 22% increase in portfolio performance year-over-year.",
    testimonial: {
      quote:
        "The insights provided by this dashboard have been invaluable for our investment strategy. The predictive models have proven remarkably accurate.",
      author: "Jennifer Lee, Investment Director",
    },
  },
  {
    id: 4,
    title: "Corporate Intranet Redesign",
    category: "design",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["UX Research", "UI Design", "Accessibility"],
    description:
      "A complete redesign of a corporate intranet focused on improving employee experience, information architecture, and accessibility.",
    challenge:
      "Modernizing an outdated intranet system used by 5,000+ employees across multiple departments and locations.",
    solution:
      "We conducted extensive user research to understand pain points and workflows, then redesigned the information architecture and user interface with a focus on usability and accessibility.",
    results:
      "Employee satisfaction with the intranet increased by 85%, and time spent searching for information decreased by 60%.",
    testimonial: {
      quote:
        "The redesigned intranet has dramatically improved our internal communications and productivity. It's intuitive, accessible, and actually enjoyable to use.",
      author: "Robert Wilson, Internal Communications Director",
    },
  },
  {
    id: 5,
    title: "Inventory Management System",
    category: "web",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Angular", "Express", "PostgreSQL"],
    description:
      "A comprehensive inventory management system with real-time tracking, automated reordering, and detailed reporting capabilities.",
    challenge:
      "Replacing a legacy inventory system with a modern solution that could handle complex warehouse operations and integrate with supplier systems.",
    solution:
      "We developed an Angular-based frontend with an Express backend and PostgreSQL database, implementing real-time updates using WebSockets and barcode scanning integration.",
    results: "The new system reduced inventory discrepancies by 95% and decreased order fulfillment time by 30%.",
    testimonial: {
      quote:
        "This inventory system has transformed our warehouse operations. The real-time tracking and automated features have saved us countless hours and reduced errors significantly.",
      author: "David Martinez, Operations Manager",
    },
  },
  {
    id: 6,
    title: "Fitness Tracking App",
    category: "mobile",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Swift", "HealthKit", "CoreML"],
    description:
      "A native iOS fitness application that tracks workouts, provides personalized recommendations, and integrates with Apple Health.",
    challenge:
      "Creating an engaging fitness app that stands out in a crowded market by providing personalized insights and motivation.",
    solution:
      "We built a native iOS app using Swift, integrating with HealthKit for data collection and implementing CoreML for personalized workout recommendations based on user progress.",
    results:
      "The app has maintained a 4.8-star rating on the App Store and achieved a 65% user retention rate after 3 months, well above industry average.",
    testimonial: {
      quote:
        "This app has completely changed my fitness journey. The personalized recommendations and progress tracking keep me motivated and on track with my goals.",
      author: "Emily Rodriguez, App User",
    },
  },
]

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredProjects =
    selectedCategory === "all" ? projects : projects.filter((project) => project.category === selectedCategory)

  const openProjectModal = (projectId: number) => {
    setSelectedProject(projectId)
    setIsModalOpen(true)
  }

  const closeProjectModal = () => {
    setIsModalOpen(false)
  }

  const getProject = () => {
    return projects.find((project) => project.id === selectedProject)
  }

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Portfolio</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our recent projects and see how we've helped businesses across various industries achieve their
            digital goals.
          </p>
        </div>

        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={selectedCategory === category.id ? "bg-gradient-to-r from-purple-600 to-cyan-500" : ""}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                  <Button
                    onClick={() => openProjectModal(project.id)}
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
                  >
                    View Case Study
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedProject && getProject() && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">{getProject()?.title}</DialogTitle>
                  <DialogDescription>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {getProject()?.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
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
                    <p className="text-gray-700">{getProject()?.description}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">The Challenge</h3>
                    <p className="text-gray-700">{getProject()?.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Our Solution</h3>
                    <p className="text-gray-700">{getProject()?.solution}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Results</h3>
                    <p className="text-gray-700">{getProject()?.results}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <blockquote className="italic text-gray-700">"{getProject()?.testimonial.quote}"</blockquote>
                    <p className="text-right mt-2 font-medium">— {getProject()?.testimonial.author}</p>
                  </div>
                  <div className="flex justify-end">
                    <Button className="flex items-center gap-2">
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
