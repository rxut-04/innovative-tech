"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const availableDates = ["2023-07-10", "2023-07-11", "2023-07-12", "2023-07-13", "2023-07-14"]

const availableTimeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"]

const serviceTypes = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "E-commerce Solutions",
  "Data Analytics",
  "Cybersecurity",
  "General Consultation",
]

export default function BookDemo() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [service, setService] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) newErrors.name = "Name is required"
    if (!email.trim()) newErrors.email = "Email is required"
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Invalid email format"
    if (!phone.trim()) newErrors.phone = "Phone number is required"
    if (!date) newErrors.date = "Date is required"
    if (!time) newErrors.time = "Time is required"
    if (!service) newErrors.service = "Service type is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitted(true)
      }, 1000)
    }
  }

  const resetForm = () => {
    setName("")
    setEmail("")
    setPhone("")
    setDate("")
    setTime("")
    setService("")
    setIsSubmitted(false)
    setErrors({})
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-purple-500" />
          Book a Demo
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Preferred Date</Label>
                <Select value={date} onValueChange={setDate}>
                  <SelectTrigger id="date" className={errors.date ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select date" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDates.map((d) => (
                      <SelectItem key={d} value={d}>
                        {new Date(d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Preferred Time</Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger id="time" className={errors.time ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTimeSlots.map((t) => (
                      <SelectItem key={t} value={t}>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-2" />
                          {t}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="service">Service Interest</Label>
              <Select value={service} onValueChange={setService}>
                <SelectTrigger id="service" className={errors.service ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.service && <p className="text-red-500 text-sm">{errors.service}</p>}
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-cyan-500">
              Schedule Demo
            </Button>
          </form>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Demo Scheduled!</h3>
            <p className="text-gray-600 mb-4">
              Your demo has been scheduled for{" "}
              {new Date(date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {time}
              .
            </p>
            <p className="text-gray-600 mb-6">We've sent a confirmation email to {email} with all the details.</p>
            <Button variant="outline" onClick={resetForm}>
              Schedule Another Demo
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
