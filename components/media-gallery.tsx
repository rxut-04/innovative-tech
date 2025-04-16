"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"

const images = [
  {
    id: 1,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Office workspace with modern design",
    category: "workspace",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Team collaboration meeting",
    category: "team",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Product development process",
    category: "process",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Client presentation meeting",
    category: "clients",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Design workshop session",
    category: "process",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Company team building event",
    category: "team",
  },
  {
    id: 7,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Modern office reception area",
    category: "workspace",
  },
  {
    id: 8,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Client success celebration",
    category: "clients",
  },
]

const videos = [
  {
    id: 1,
    src: "https://assets.mixkit.co/videos/preview/mixkit-spinning-around-the-earth-29351-large.mp4",
    poster: "/placeholder.svg?height=600&width=800",
    title: "Company Overview",
  },
  {
    id: 2,
    src: "https://assets.mixkit.co/videos/preview/mixkit-a-lighted-path-in-the-forest-510-large.mp4",
    poster: "/placeholder.svg?height=600&width=800",
    title: "Our Design Process",
  },
]

const beforeAfterImages = [
  {
    id: 1,
    before: "/placeholder.svg?height=600&width=800",
    after: "/placeholder.svg?height=600&width=800",
    title: "Website Redesign",
  },
  {
    id: 2,
    before: "/placeholder.svg?height=600&width=800",
    after: "/placeholder.svg?height=600&width=800",
    title: "Mobile App UI Improvement",
  },
]

export default function MediaGallery() {
  const [activeTab, setActiveTab] = useState("images")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(80)
  const [sliderPosition, setSliderPosition] = useState(50)

  const filteredImages =
    selectedCategory === "all" ? images : images.filter((image) => image.category === selectedCategory)

  const openLightbox = (imageId: number) => {
    setSelectedImage(imageId)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "auto"
  }

  const getSelectedImage = () => {
    return images.find((image) => image.id === selectedImage)
  }

  const handleVideoPlay = (videoElement: HTMLVideoElement) => {
    if (isPlaying) {
      videoElement.pause()
    } else {
      videoElement.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleVideoEnded = () => {
    setIsPlaying(false)
  }

  const handleMuteToggle = (videoElement: HTMLVideoElement) => {
    videoElement.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (videoElement: HTMLVideoElement, value: number[]) => {
    const newVolume = value[0]
    videoElement.volume = newVolume / 100
    setVolume(newVolume)
    if (newVolume === 0) {
      setIsMuted(true)
    } else if (isMuted) {
      setIsMuted(false)
    }
  }

  const handleSliderChange = (value: number[]) => {
    setSliderPosition(value[0])
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Media Gallery</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our workspace, team, and projects through our media gallery.
          </p>
        </div>

        <Tabs defaultValue="images" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="images">Image Gallery</TabsTrigger>
            <TabsTrigger value="videos">Video Showcase</TabsTrigger>
            <TabsTrigger value="before-after">Before & After</TabsTrigger>
          </TabsList>

          <TabsContent value="images">
            <div className="flex flex-wrap justify-center mb-8 gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                className={selectedCategory === "all" ? "bg-gradient-to-r from-purple-600 to-cyan-500" : ""}
                onClick={() => setSelectedCategory("all")}
              >
                All
              </Button>
              <Button
                variant={selectedCategory === "workspace" ? "default" : "outline"}
                className={selectedCategory === "workspace" ? "bg-gradient-to-r from-purple-600 to-cyan-500" : ""}
                onClick={() => setSelectedCategory("workspace")}
              >
                Workspace
              </Button>
              <Button
                variant={selectedCategory === "team" ? "default" : "outline"}
                className={selectedCategory === "team" ? "bg-gradient-to-r from-purple-600 to-cyan-500" : ""}
                onClick={() => setSelectedCategory("team")}
              >
                Team
              </Button>
              <Button
                variant={selectedCategory === "process" ? "default" : "outline"}
                className={selectedCategory === "process" ? "bg-gradient-to-r from-purple-600 to-cyan-500" : ""}
                onClick={() => setSelectedCategory("process")}
              >
                Process
              </Button>
              <Button
                variant={selectedCategory === "clients" ? "default" : "outline"}
                className={selectedCategory === "clients" ? "bg-gradient-to-r from-purple-600 to-cyan-500" : ""}
                onClick={() => setSelectedCategory("clients")}
              >
                Clients
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative aspect-square cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => openLightbox(image.id)}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </motion.div>
              ))}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
              {selectedImage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                  onClick={closeLightbox}
                >
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                    className="relative max-h-[90vh] max-w-[90vw]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -top-12 right-0 text-white hover:bg-white/20"
                      onClick={closeLightbox}
                    >
                      <X className="h-6 w-6" />
                    </Button>
                    <div className="relative h-[80vh] w-auto">
                      <Image
                        src={getSelectedImage()?.src || ""}
                        alt={getSelectedImage()?.alt || ""}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="mt-2 text-center text-white">{getSelectedImage()?.alt}</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="videos">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videos.map((video) => (
                <div key={video.id} className="relative rounded-lg overflow-hidden shadow-lg">
                  <div className="aspect-video relative">
                    <video
                      id={`video-${video.id}`}
                      poster={video.poster}
                      onEnded={handleVideoEnded}
                      className="w-full h-full object-cover"
                    >
                      <source src={video.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-white font-bold mb-2">{video.title}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/20"
                            onClick={() => {
                              const videoElement = document.getElementById(`video-${video.id}`) as HTMLVideoElement
                              if (videoElement) {
                                handleVideoPlay(videoElement)
                              }
                            }}
                          >
                            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/20"
                            onClick={() => {
                              const videoElement = document.getElementById(`video-${video.id}`) as HTMLVideoElement
                              if (videoElement) {
                                handleMuteToggle(videoElement)
                              }
                            }}
                          >
                            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                          </Button>
                          <div className="w-24">
                            <Slider
                              value={[volume]}
                              min={0}
                              max={100}
                              step={1}
                              onValueChange={(value) => {
                                const videoElement = document.getElementById(`video-${video.id}`) as HTMLVideoElement
                                if (videoElement) {
                                  handleVolumeChange(videoElement, value)
                                }
                              }}
                              className="h-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="before-after">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {beforeAfterImages.map((item) => (
                <div key={item.id} className="space-y-4">
                  <h3 className="text-xl font-bold text-center">{item.title}</h3>
                  <div className="relative h-[300px] overflow-hidden rounded-lg border">
                    <div className="absolute inset-0 z-10">
                      <Image
                        src={item.before || "/placeholder.svg"}
                        alt={`Before - ${item.title}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 z-20 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                      <Image
                        src={item.after || "/placeholder.svg"}
                        alt={`After - ${item.title}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 z-30 flex items-center justify-center">
                      <div className="relative h-full w-1">
                        <div
                          className="absolute inset-y-0 left-0 w-1 bg-white shadow-lg"
                          style={{ left: `${sliderPosition}%` }}
                        ></div>
                        <div
                          className="absolute h-8 w-8 rounded-full bg-white shadow-lg flex items-center justify-center cursor-grab"
                          style={{
                            left: `${sliderPosition}%`,
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16 8L8 16M8 8L16 16"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4">
                    <Slider value={[sliderPosition]} min={0} max={100} step={1} onValueChange={handleSliderChange} />
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>Before</span>
                      <span>After</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
