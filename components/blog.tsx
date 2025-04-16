"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Clock, Search, ChevronRight, Tag, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const categories = [
  { id: "all", name: "All Posts" },
  { id: "tech", name: "Technology" },
  { id: "design", name: "Design" },
  { id: "business", name: "Business" },
  { id: "development", name: "Development" },
]

const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2023",
    excerpt:
      "Explore the emerging technologies and methodologies that are shaping the future of web development and how they can benefit your business.",
    image: "/placeholder.svg?height=400&width=600",
    category: "tech",
    tags: ["Web Development", "Trends", "Technology"],
    author: "Michael Chen",
    date: "June 15, 2023",
    readTime: 8,
  },
  {
    id: 2,
    title: "Designing for Accessibility: Best Practices for Inclusive UX",
    excerpt:
      "Learn how to create digital experiences that are accessible to all users, including those with disabilities, and why it matters for your business.",
    image: "/placeholder.svg?height=400&width=600",
    category: "design",
    tags: ["Accessibility", "UX Design", "Inclusive Design"],
    author: "Priya Patel",
    date: "May 28, 2023",
    readTime: 6,
  },
  {
    id: 3,
    title: "How AI is Transforming Business Intelligence and Analytics",
    excerpt:
      "Discover how artificial intelligence is revolutionizing the way businesses analyze data and make strategic decisions in the digital age.",
    image: "/placeholder.svg?height=400&width=600",
    category: "business",
    tags: ["AI", "Business Intelligence", "Data Analytics"],
    author: "Sarah Johnson",
    date: "April 12, 2023",
    readTime: 10,
  },
]

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
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

    const element = document.getElementById("blog")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  const filteredPosts = blogPosts
    .filter((post) => {
      if (selectedCategory === "all") return true
      return post.category === selectedCategory
    })
    .filter((post) => {
      const search = searchTerm.toLowerCase()
      return (
        post.title.toLowerCase().includes(search) ||
        post.excerpt.toLowerCase().includes(search) ||
        post.tags.some((tag) => tag.toLowerCase().includes(search))
      )
    })

  const maxIndex = Math.max(0, Math.ceil(filteredPosts.length / itemsPerView) - 1)

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  return (
    <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-900/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-violet-200 dark:border-violet-800/30 bg-white/50 dark:bg-violet-900/10 px-3 py-1 text-sm font-medium text-violet-700 dark:text-violet-300 backdrop-blur-sm mb-4">
            <span className="flex h-2 w-2 rounded-full bg-violet-600 dark:bg-violet-400 mr-2"></span>
            Our Blog
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Latest{" "}
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Insights
            </span>{" "}
            & News
          </h2>
          <p className="text-lg text-muted-foreground">
            Stay updated with the latest insights, trends, and best practices in technology and digital innovation.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
          <Tabs
            defaultValue="all"
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="w-full md:w-auto"
          >
            <TabsList className="bg-violet-100/50 dark:bg-violet-900/10 grid grid-cols-2 md:grid-cols-5 w-full md:w-auto">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-violet-950/50 data-[state=active]:text-violet-700 dark:data-[state=active]:text-violet-300 data-[state=active]:shadow-sm"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-violet-200 dark:border-violet-800/30"
            />
          </div>
        </div>

        {filteredPosts.length > 0 ? (
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

            {/* Blog Posts Carousel */}
            <div ref={carouselRef} className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(filteredPosts.length / itemsPerView) }).map((_, groupIndex) => (
                  <div key={groupIndex} className="min-w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                    {filteredPosts
                      .slice(groupIndex * itemsPerView, (groupIndex + 1) * itemsPerView)
                      .map((post, index) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Card className="h-full flex flex-col overflow-hidden border-violet-200 dark:border-violet-800/30 hover:shadow-lg hover:shadow-violet-600/5 transition-shadow">
                            <div className="relative h-48 overflow-hidden">
                              <Image
                                src={post.image || "/placeholder.svg"}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-500 hover:scale-105"
                              />
                              <div className="absolute top-2 left-2">
                                <Badge className="bg-gradient-to-r from-violet-600 to-purple-600 text-white border-none">
                                  {categories.find((c) => c.id === post.category)?.name}
                                </Badge>
                              </div>
                            </div>
                            <CardContent className="flex-grow pt-6">
                              <div className="flex items-center text-sm text-muted-foreground mb-2">
                                <span>{post.date}</span>
                                <span className="mx-2">•</span>
                                <span className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {post.readTime} min read
                                </span>
                              </div>
                              <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                              <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.map((tag, i) => (
                                  <div key={i} className="flex items-center text-xs text-muted-foreground">
                                    <Tag className="h-3 w-3 mr-1 text-violet-600 dark:text-violet-400" />
                                    {tag}
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                            <CardFooter className="pt-0">
                              <Button
                                variant="ghost"
                                className="text-violet-600 dark:text-violet-400 p-0 hover:bg-transparent hover:text-violet-700 dark:hover:text-violet-300 group"
                              >
                                Read More{" "}
                                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </Button>
                            </CardFooter>
                          </Card>
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
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No articles found matching your criteria.</p>
            <Button
              onClick={() => {
                setSelectedCategory("all")
                setSearchTerm("")
              }}
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white"
            >
              View All Articles
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
