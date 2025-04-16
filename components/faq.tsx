"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    id: "1",
    question: "What services does NexaTech offer?",
    answer:
      "We offer a comprehensive range of digital services including web development, mobile app development, UI/UX design, cloud solutions, data analytics, and AI & machine learning services. Our team specializes in creating custom solutions tailored to your specific business needs.",
    tags: ["services", "offerings", "solutions"],
  },
  {
    id: "2",
    question: "How long does it typically take to complete a project?",
    answer:
      "Project timelines vary depending on complexity, scope, and requirements. A simple website might take 4-6 weeks, while a complex web application or mobile app could take 3-6 months. During our initial consultation, we'll provide a detailed timeline based on your specific project needs.",
    tags: ["timeline", "duration", "schedule"],
  },
  {
    id: "3",
    question: "What is your pricing structure?",
    answer:
      "We offer flexible pricing models including fixed-price quotes, hourly rates, and retainer options. The cost depends on project complexity, features, and timeline. We provide detailed quotes after understanding your requirements. You can use our pricing calculator for a preliminary estimate.",
    tags: ["pricing", "cost", "budget"],
  },
  {
    id: "4",
    question: "Do you provide ongoing maintenance and support?",
    answer:
      "Yes, we offer comprehensive maintenance and support packages to ensure your digital products continue to perform optimally. Our support includes regular updates, security patches, performance monitoring, and technical assistance. We offer different tiers of support based on your needs.",
    tags: ["maintenance", "support", "updates"],
  },
  {
    id: "5",
    question: "How do you handle project management and communication?",
    answer:
      "We follow an agile project management approach with regular sprints and check-ins. Each client is assigned a dedicated project manager who serves as your main point of contact. We use collaboration tools like Slack, Trello, and regular video conferences to ensure transparent communication throughout the project lifecycle.",
    tags: ["management", "communication", "process"],
  },
  {
    id: "6",
    question: "Can you work with our existing systems and technologies?",
    answer:
      "Absolutely. We have extensive experience integrating with existing systems and technologies. Our team is proficient in a wide range of programming languages, frameworks, and platforms, allowing us to seamlessly connect with your current infrastructure while implementing new solutions.",
    tags: ["integration", "technology", "systems"],
  },
]

export default function Faq() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedItems, setExpandedItems] = useState<string[]>([])
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

    const element = document.getElementById("faq")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  const filteredFaqs = faqs.filter((faq) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      faq.question.toLowerCase().includes(searchLower) ||
      faq.answer.toLowerCase().includes(searchLower) ||
      faq.tags.some((tag) => tag.includes(searchLower))
    )
  })

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)

    // If search term is entered, expand all matching items
    if (value.trim() !== "") {
      setExpandedItems(filteredFaqs.map((faq) => faq.id))
    } else {
      setExpandedItems([])
    }
  }

  return (
    <section id="faq" className="py-20 bg-white dark:bg-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-violet-200 dark:border-violet-800/30 bg-white/50 dark:bg-violet-900/10 px-3 py-1 text-sm font-medium text-violet-700 dark:text-violet-300 backdrop-blur-sm mb-4">
            <span className="flex h-2 w-2 rounded-full bg-violet-600 dark:bg-violet-400 mr-2"></span>
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our services, process, and how we can help your business.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search questions..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 border-violet-200 dark:border-violet-800/30"
            />
          </div>

          <Accordion type="multiple" value={expandedItems} onValueChange={setExpandedItems} className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: Number.parseInt(faq.id) * 0.1 }}
                >
                  <AccordionItem
                    value={faq.id}
                    className="border border-violet-200 dark:border-violet-800/30 rounded-lg overflow-hidden bg-white dark:bg-violet-950/20 shadow-sm"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-violet-50 dark:hover:bg-violet-900/10 font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-2 text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No matching questions found. Try a different search term.
              </div>
            )}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
