"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    // Clear any previous errors
    setError("")

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
      setEmail("")
    }, 1000)
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Mail className="h-5 w-5 mr-2 text-purple-500" />
          Subscribe to Our Newsletter
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isSubmitted ? (
          <>
            <p className="text-gray-600 mb-6">
              Stay updated with the latest trends, insights, and news in technology and digital innovation.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={error ? "border-red-500" : ""}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-cyan-500">
                Subscribe
              </Button>
            </form>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Thank You for Subscribing!</h3>
            <p className="text-gray-600">
              You've been added to our newsletter list. We'll keep you updated with the latest news and insights.
            </p>
            <Button variant="outline" className="mt-4" onClick={() => setIsSubmitted(false)}>
              Subscribe Another Email
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
