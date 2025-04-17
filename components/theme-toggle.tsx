"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9 rounded-full relative overflow-hidden"
      onClick={toggleTheme}
    >
      <AnimatePresence mode="wait">
        {theme === "light" ? (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -90, scale: 0 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Sun className="h-4 w-4" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: 90, scale: 0 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Moon className="h-4 w-4" />
          </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
