"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Video, ArrowLeft, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface VideoItem {
  id: string
  title: string
  description: string
  thumbnail: string
  url: string
  language: "English" | "Hindi" | "Marathi"
  category: string
}

export function VideoSection() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>("all")

  // This is a simple client-side password check
  // In a real application, you would want to use a more secure method
  const correctPassword = "export2023"

  // Sample video data - replace with your actual videos
  const videos: VideoItem[] = [
    {
      id: "video1",
      title: "Export Documentation Masterclass",
      description: "Learn how to prepare and manage essential export documentation.",
      thumbnail: "/10.jpg",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      language: "English",
      category: "Documentation",
    },
    {
      id: "video2",
      title: "International Market Entry Strategies",
      description: "Discover effective strategies for entering new international markets.",
      thumbnail: "/09.png",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      language: "English",
      category: "Strategy",
    },
    {
      id: "video3",
      title: "Customs Compliance Workshop",
      description: "Essential knowledge about customs regulations and compliance.",
      thumbnail: "/07.jpg",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      language: "English",
      category: "Compliance",
    },
    {
      id: "video4",
      title: "Export Pricing and Costing",
      description: "Learn how to calculate export prices and manage costs effectively.",
      thumbnail: "/08.png",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      language: "English",
      category: "Finance",
    },
    // {
    //   id: "video5",
    //   title: "Shipping and Logistics Fundamentals",
    //   description: "Understanding international shipping and logistics for exports.",
    //   thumbnail: "/placeholder.svg?height=200&width=350&query=international shipping logistics containers",
    //   url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    //   language: "Hindi",
    //   category: "Logistics",
    // },
    // {
    //   id: "video6",
    //   title: "Export Promotion Schemes",
    //   description: "Detailed overview of government export promotion schemes.",
    //   thumbnail: "/placeholder.svg?height=200&width=350&query=export promotion government schemes",
    //   url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    //   language: "Marathi",
    //   category: "Schemes",
    // },
    // {
    //   id: "video7",
    //   title: "Letter of Credit Explained",
    //   description: "Complete guide to understanding and using Letters of Credit.",
    //   thumbnail: "/placeholder.svg?height=200&width=350&query=letter of credit document international trade",
    //   url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    //   language: "English",
    //   category: "Finance",
    // },
    // {
    //   id: "video8",
    //   title: "Export Marketing Strategies",
    //   description: "Effective marketing strategies for international markets.",
    //   thumbnail: "/placeholder.svg?height=200&width=350&query=international marketing strategy global",
    //   url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    //   language: "Hindi",
    //   category: "Strategy",
    // },
  ]

  const categories = ["all", ...Array.from(new Set(videos.map((video) => video.category)))]
  const languages = ["all", ...Array.from(new Set(videos.map((video) => video.language)))]

  const filteredVideos = videos.filter((video) => {
    if (activeFilter === "all") return true
    return video.category === activeFilter || video.language === activeFilter
  })

  const handleVideoSelect = (video: VideoItem) => {
    setSelectedVideo(video)
    setPassword("")
    setError("")
  }

  const handleBackToVideos = () => {
    setSelectedVideo(null)
    setPassword("")
    setError("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate a delay for password checking
    setTimeout(() => {
      if (password === correctPassword && selectedVideo) {
        window.open(selectedVideo.url, "_blank")
        setPassword("")
      } else {
        setError("Incorrect password. Please try again.")
      }
      setIsLoading(false)
    }, 1000)
  }

  const getLanguageBadgeColor = (language: string) => {
    switch (language) {
      case "English":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "Hindi":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200"
      case "Marathi":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="hexagon w-16 h-16 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">EGC</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Video Resources</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Access our exclusive video content for in-depth training and guidance. Available in English, Hindi, and
            Marathi.
          </p>
        </div>

        {selectedVideo ? (
          <div className="max-w-md mx-auto">
            <Button variant="outline" className="mb-6 flex items-center gap-2" onClick={handleBackToVideos}>
              <ArrowLeft className="h-4 w-4" /> Back to videos
            </Button>

            <Card className="border-red-100 shadow-lg">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Video className="h-12 w-12 text-red-600" />
                </div>
                <CardTitle className="text-center">{selectedVideo.title}</CardTitle>
                <CardDescription className="text-center">{selectedVideo.description}</CardDescription>
                <div className="flex justify-center mt-2">
                  <Badge className={getLanguageBadgeColor(selectedVideo.language)}>{selectedVideo.language}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <img
                    src={selectedVideo.thumbnail || "/placeholder.svg"}
                    alt={selectedVideo.title}
                    className="w-full h-auto rounded-md"
                  />
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="password"
                        placeholder="Enter password"
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-red-600 hover:bg-red-700"
                  onClick={handleSubmit}
                  disabled={isLoading || !password}
                >
                  {isLoading ? "Verifying..." : "Access Video"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                <h3 className="text-lg font-medium mr-2 w-full text-center mb-2">Filter by Category:</h3>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeFilter === category ? "default" : "outline"}
                    className={activeFilter === category ? "bg-red-600" : ""}
                    onClick={() => setActiveFilter(category)}
                  >
                    {category === "all" ? "All Categories" : category}
                  </Button>
                ))}
              </div>

              {/* <div className="flex flex-wrap gap-2 justify-center">
                <h3 className="text-lg font-medium mr-2 w-full text-center mb-2">Filter by Language:</h3>
                {languages.map((language) => (
                  <Button
                    key={language}
                    variant={activeFilter === language ? "default" : "outline"}
                    className={activeFilter === language ? "bg-red-600" : ""}
                    onClick={() => setActiveFilter(language)}
                  >
                    {language === "all" ? "All Languages" : language}
                  </Button>
                ))}
              </div> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredVideos.map((video) => (
                <Card
                  key={video.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer video-card card-hover border-red-100"
                  onClick={() => handleVideoSelect(video)}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{video.title}</CardTitle>
                      <Badge className={getLanguageBadgeColor(video.language)}>{video.language}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{video.description}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => handleVideoSelect(video)}>
                      Watch Video
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-12 p-6 bg-red-50 rounded-lg border border-red-100 flex items-center justify-between flex-col md:flex-row gap-4">
              <div className="flex items-center">
                <Globe className="h-6 w-6 text-red-600 mr-3" />
                <p className="text-red-800">
                  Our videos are also available for free on YouTube in English, Hindi, and Marathi.
                </p>
              </div>
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                Visit Our YouTube Channel
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
