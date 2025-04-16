"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Facebook, Twitter, Linkedin, Github, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const teamMembers = [
  {
    name: "John Doe",
    role: "CEO & Founder",
    image: "/placeholder.svg?height=300&width=300",
    bio: "John has 15+ years of experience in tech leadership and a passion for innovation. He founded NexaTech to help businesses transform digitally.",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Sarah Chen",
    role: "CTO",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Sarah leads our technical strategy with expertise in AI, cloud architecture, and emerging technologies. She ensures our solutions are cutting-edge.",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    name: "Michael Johnson",
    role: "Design Director",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Michael brings creative vision to all our projects, focusing on user-centered design principles and creating exceptional digital experiences.",
    social: {
      linkedin: "#",
      twitter: "#",
      facebook: "#",
    },
  },
  {
    name: "Priya Patel",
    role: "Development Lead",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Priya oversees our development team, bringing technical excellence and innovative problem-solving to every project we undertake.",
    social: {
      linkedin: "#",
      github: "#",
    },
  },
]

export default function Team() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const itemsPerView = 4
  const maxIndex = Math.ceil(teamMembers.length / itemsPerView) - 1

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("team")
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
    <section id="team" className="py-20 bg-white dark:bg-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-violet-200 dark:border-violet-800/30 bg-white/50 dark:bg-violet-900/10 px-3 py-1 text-sm font-medium text-violet-700 dark:text-violet-300 backdrop-blur-sm mb-4">
            <span className="flex h-2 w-2 rounded-full bg-violet-600 dark:bg-violet-400 mr-2"></span>
            Our Team
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Expert Team
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our talented team of professionals is dedicated to delivering exceptional results and driving innovation for
            our clients.
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

          {/* Team Members Carousel */}
          <div ref={carouselRef} className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              <div className="min-w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group"
                    onMouseEnter={() => setHoveredMember(index)}
                    onMouseLeave={() => setHoveredMember(null)}
                  >
                    <div className="bg-white dark:bg-violet-950/30 rounded-xl overflow-hidden shadow-lg border border-violet-200 dark:border-violet-800/30 hover:shadow-xl hover:shadow-violet-600/10 transition-all duration-300">
                      <div className="relative aspect-square">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t from-violet-900/90 via-violet-800/50 to-transparent flex flex-col justify-end p-6 transition-opacity duration-300 ${
                            hoveredMember === index ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <p className="text-white text-sm">{member.bio}</p>
                          <div className="flex space-x-3 mt-4">
                            {member.social.linkedin && (
                              <a
                                href={member.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors"
                              >
                                <Linkedin className="h-4 w-4 text-white" />
                              </a>
                            )}
                            {member.social.twitter && (
                              <a
                                href={member.social.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors"
                              >
                                <Twitter className="h-4 w-4 text-white" />
                              </a>
                            )}
                            {member.social.github && (
                              <a
                                href={member.social.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors"
                              >
                                <Github className="h-4 w-4 text-white" />
                              </a>
                            )}
                            {member.social.facebook && (
                              <a
                                href={member.social.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors"
                              >
                                <Facebook className="h-4 w-4 text-white" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-lg">{member.name}</h3>
                        <p className="text-violet-600 dark:text-violet-400">{member.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
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

        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-violet-200 dark:border-violet-800 hover:bg-violet-100 dark:hover:bg-violet-900/30"
          >
            Join Our Team
          </Button>
        </div>
      </div>
    </section>
  )
}
