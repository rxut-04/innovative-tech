"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import ThemeToggle from "@/components/theme-toggle"

const navLinks = [
  { name: "Home", href: "#home" },
  {
    name: "Services",
    href: "#services",
    submenu: [
      { name: "Web Development", href: "#web-development" },
      { name: "Mobile Apps", href: "#mobile-apps" },
      { name: "UI/UX Design", href: "#ui-ux-design" },
      { name: "Cloud Solutions", href: "#cloud-solutions" },
      { name: "AI & Machine Learning", href: "#ai-ml" },
    ],
  },
  { name: "About", href: "#about" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false)
    setOpenSubmenu(null)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <div className="flex items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mr-2"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-purple-400 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">N</span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-400 bg-clip-text text-transparent">
                  NexaTech
                </span>
              </motion.div>
            </div>
          </Link>

          {/* Contact Info - Desktop */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center text-sm">
              <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mr-2">
                <Phone className="h-4 w-4 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Call Us</p>
                <a href="tel:+1234567890" className="font-medium hover:text-violet-600 dark:hover:text-violet-400">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mr-2">
                <Mail className="h-4 w-4 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Email Us</p>
                <a
                  href="mailto:info@nexatech.com"
                  className="font-medium hover:text-violet-600 dark:hover:text-violet-400"
                >
                  info@nexatech.com
                </a>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.submenu ? (
                  <button
                    onClick={() => toggleSubmenu(link.name)}
                    className="flex items-center px-3 py-2 text-sm font-medium transition-colors hover:text-violet-600 dark:hover:text-violet-400"
                  >
                    {link.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="px-3 py-2 text-sm font-medium transition-colors hover:text-violet-600 dark:hover:text-violet-400"
                  >
                    {link.name}
                  </button>
                )}

                {link.submenu && (
                  <AnimatePresence>
                    {openSubmenu === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-1 w-56 rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                      >
                        <div className="py-1">
                          {link.submenu.map((subItem) => (
                            <button
                              key={subItem.name}
                              onClick={() => scrollToSection(subItem.href)}
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:text-violet-600 dark:hover:text-violet-400"
                            >
                              {subItem.name}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
            <div className="pl-2">
              <ThemeToggle />
            </div>
            <Button
              onClick={() => scrollToSection("#contact")}
              size="sm"
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-md shadow-violet-600/20"
            >
              Get a Quote
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden space-x-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background border-t dark:border-violet-900/10"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    {link.submenu ? (
                      <div className="space-y-2">
                        <button
                          onClick={() => toggleSubmenu(link.name)}
                          className="flex items-center justify-between w-full text-left font-medium py-2"
                        >
                          {link.name}
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${openSubmenu === link.name ? "rotate-180" : ""}`}
                          />
                        </button>
                        <AnimatePresence>
                          {openSubmenu === link.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 space-y-2 border-l-2 border-violet-200 dark:border-violet-800"
                            >
                              {link.submenu.map((subItem) => (
                                <button
                                  key={subItem.name}
                                  onClick={() => scrollToSection(subItem.href)}
                                  className="block w-full text-left py-2 text-sm text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400"
                                >
                                  {subItem.name}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="block w-full text-left font-medium py-2 hover:text-violet-600 dark:hover:text-violet-400"
                      >
                        {link.name}
                      </button>
                    )}
                  </div>
                ))}
                <div className="pt-2">
                  <Button
                    onClick={() => scrollToSection("#contact")}
                    className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white"
                  >
                    Get a Quote
                  </Button>
                </div>
              </nav>

              {/* Mobile Contact Info */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 grid grid-cols-1 gap-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mr-3">
                    <Phone className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Call Us</p>
                    <a href="tel:+1234567890" className="font-medium hover:text-violet-600 dark:hover:text-violet-400">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mr-3">
                    <Mail className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Email Us</p>
                    <a
                      href="mailto:info@nexatech.com"
                      className="font-medium hover:text-violet-600 dark:hover:text-violet-400"
                    >
                      info@nexatech.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
