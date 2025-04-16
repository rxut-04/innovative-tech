"use client"

import type React from "react"

import { motion } from "framer-motion"
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Heart,
  Code,
  Coffee,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
]

const serviceLinks = [
  { name: "Web Development", href: "#web-development" },
  { name: "Mobile Apps", href: "#mobile-apps" },
  { name: "UI/UX Design", href: "#ui-ux-design" },
  { name: "Cloud Solutions", href: "#cloud-solutions" },
  { name: "Data Analytics", href: "#data-analytics" },
  { name: "AI & Machine Learning", href: "#ai-ml" },
]

const socialLinks = [
  { name: "Facebook", icon: <Facebook className="h-5 w-5" />, href: "#" },
  { name: "Twitter", icon: <Twitter className="h-5 w-5" />, href: "#" },
  { name: "Instagram", icon: <Instagram className="h-5 w-5" />, href: "#" },
  { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, href: "#" },
  { name: "GitHub", icon: <Github className="h-5 w-5" />, href: "#" },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative">
      {/* Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform translate-y-[-1px]">
        <svg
          className="relative block w-full h-24"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-gray-50 dark:fill-gray-900/30"
          ></path>
        </svg>
      </div>

      {/* Main Footer */}
      <div className="bg-gradient-to-br from-violet-900 to-purple-900 text-white pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Footer Top */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Company Info */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center mr-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-400 to-purple-400 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">N</span>
                  </div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-violet-200 to-purple-200 bg-clip-text text-transparent">
                  NexaTech
                </span>
              </div>
              <p className="text-violet-200 mb-6 leading-relaxed">
                Transforming ideas into digital reality through innovative technology solutions and strategic thinking.
                We help businesses grow and thrive in the digital era.
              </p>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors duration-300"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6 relative inline-block">
                Quick Links
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-400 to-purple-400"></span>
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-violet-200 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <svg
                        className="h-3 w-3 mr-2 text-violet-400 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-bold mb-6 relative inline-block">
                Our Services
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-400 to-purple-400"></span>
              </h3>
              <ul className="space-y-3">
                {serviceLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-violet-200 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <svg
                        className="h-3 w-3 mr-2 text-violet-400 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-6 relative inline-block">
                Contact Us
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-400 to-purple-400"></span>
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-violet-400 flex-shrink-0 mt-0.5" />
                  <span className="text-violet-200">
                    123 Tech Street
                    <br />
                    Innovation City, IC 12345
                    <br />
                    United States
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-violet-400" />
                  <a
                    href="tel:+12345678901"
                    className="text-violet-200 hover:text-white transition-colors duration-300"
                  >
                    +1 (234) 567-890
                  </a>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-violet-400" />
                  <a
                    href="mailto:info@nexatech.com"
                    className="text-violet-200 hover:text-white transition-colors duration-300"
                  >
                    info@nexatech.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-violet-200 text-sm">&copy; {currentYear} NexaTech. All rights reserved.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-violet-200">
                <a href="#" className="hover:text-white transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-white transition-colors duration-300">
                  Cookie Policy
                </a>
                <a href="#" className="hover:text-white transition-colors duration-300">
                  Sitemap
                </a>
              </div>
            </div>
            <div className="mt-6 text-center text-violet-300 text-sm flex items-center justify-center">
              <span>Made with</span>
              <Heart className="h-4 w-4 mx-1 text-red-400 animate-pulse" />
              <span>and</span>
              <Code className="h-4 w-4 mx-1 text-violet-400" />
              <span>and</span>
              <Coffee className="h-4 w-4 mx-1 text-amber-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={scrollToTop}
          className="rounded-full bg-gradient-to-r from-violet-600 to-purple-600 p-3 shadow-lg"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </motion.div>
    </footer>
  )
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400 ${props.className}`}
    />
  )
}
