"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: number
  text: string
  sender: "user" | "agent"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "👋 Hi there! Welcome to InnovateTech Solutions. How can I help you today?",
    sender: "agent",
    timestamp: new Date(),
  },
]

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setNewMessage("")
    setIsTyping(true)

    // Simulate agent response after a delay
    setTimeout(() => {
      const agentMessage: Message = {
        id: messages.length + 2,
        text: getAutoResponse(newMessage),
        sender: "agent",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, agentMessage])
      setIsTyping(false)
    }, 1500)
  }

  const getAutoResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("pricing") || lowerMessage.includes("cost") || lowerMessage.includes("quote")) {
      return "Our pricing varies based on project requirements. You can use our pricing calculator for an estimate, or we can schedule a consultation to provide a detailed quote."
    } else if (lowerMessage.includes("contact") || lowerMessage.includes("call") || lowerMessage.includes("email")) {
      return "You can reach our team at contact@innovatetech.com or call us at (555) 123-4567. Would you like us to have someone contact you directly?"
    } else if (lowerMessage.includes("service") || lowerMessage.includes("offer")) {
      return "We offer web development, mobile app development, UI/UX design, and data analytics services. Is there a specific service you're interested in learning more about?"
    } else {
      return "Thank you for your message. One of our team members will get back to you shortly. Is there anything else I can help you with in the meantime?"
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-purple-500" />
          Live Chat Demo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[300px] border rounded-lg overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white p-3 flex justify-between items-center">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Agent" />
                <AvatarFallback>IT</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">InnovateTech Support</p>
                <p className="text-xs text-white/80">Online</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleChat}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Chat Messages */}
          <div className="p-3 h-[200px] overflow-y-auto bg-gray-50">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex mb-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "agent" && (
                    <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Agent" />
                      <AvatarFallback>IT</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white"
                        : "bg-white border"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === "user" ? "text-white/80" : "text-gray-500"}`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                  {message.sender === "user" && (
                    <Avatar className="h-8 w-8 ml-2 flex-shrink-0">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex mb-3 justify-start"
                >
                  <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Agent" />
                    <AvatarFallback>IT</AvatarFallback>
                  </Avatar>
                  <div className="bg-white border p-3 rounded-lg">
                    <div className="flex items-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      <span className="text-sm">Typing...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Chat Input */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-white border-t">
            <div className="flex">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 mr-2"
              />
              <Button
                onClick={handleSendMessage}
                disabled={newMessage.trim() === ""}
                className="bg-gradient-to-r from-purple-600 to-cyan-500"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
