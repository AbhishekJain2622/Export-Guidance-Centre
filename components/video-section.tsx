"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Video, ArrowLeft, Download, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import JSZip from "jszip"
import { saveAs } from "file-saver"

interface VideoItem {
  id: string
  title: string
  description: string
  duration: string
  videoUrl: string
}

interface VideoSegment {
  id: string
  title: string
  description: string
  videos: VideoItem[]
  documents: DocumentItem[]
}

interface DocumentItem {
  id: string
  title: string
  description: string
  fileUrl: string
}

export function VideoSection() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSegment, setSelectedSegment] = useState<VideoSegment | null>(null)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [videoUnlocked, setVideoUnlocked] = useState(false)
  const [downloadingAll, setDownloadingAll] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)

  const correctPassword = "export2023"

  const videoSegments: VideoSegment[] = [
    {
      id: "segment1",
      title: "Introduction to Export Documentation",
      description: "Learn the basics of export documentation requirements",
      videos: [
        {
          id: "video1-1",
          title: "Starting Export Import",
          description: "Introduction to export import organization",
          duration: "5:12",
          videoUrl: "/sigment-1/Starting export import-001.mp4"
        },
        {
          id: "video1-2",
          title: "Product Selection",
          description: "How to select products for export",
          duration: "7:45",
          videoUrl: "/sigment-1/2. SELECTION OF PRODUCT FOR EXPORT.mp4"
        },
        {
          id: "video1-3",
          title: "International Marketing",
          description: "Marketing strategies for international markets",
          duration: "10:30",
          videoUrl: "/sigment-1/3. INTERNATIONAL MARKETING.mp4"
        },
        {
          id: "video1-4",
          title: "Export Contract Preparation",
          description: "Preparing export contracts with terms",
          duration: "8:22",
          videoUrl: "/sigment-1/4. PREPARING EXPORT CONTRACT.mp4"
        }
      ],
      documents: [
        { id: "doc1-1", title: "STARTING EXPORT", description: "STARTING EXPORT IMPORT ORGANISATION", fileUrl: "/1.pdf" },
        { id: "doc1-2", title: "SELECTION OF PRODUCT", description: "SELECTION OF PRODUCT FOR EXPORT", fileUrl: "/sigment-1/2. SELECTION OF PRODUCT FOR EXPORT.pdf" },
        { id: "doc1-3", title: "INTERNATIONAL MARKETING", description: "Example document for reference INTERNATIONAL MARKETING", fileUrl: "/sigment-1/3. INTERNATIONAL MARKETING.pdf" },
        { id: "doc1-4", title: "PREPARING EXPORT", description: "PREPARING EXPORT CONTRACT WITH EXPORT TERMS", fileUrl: "/sigment-1/4. PREPARING EXPORT CONTRACT WITH EXPORT TERMS OF.pdf" }
      ]
    },
    {
      id: "segment2",
      title: "Customs Compliance",
      description: "Understanding customs regulations and procedures",
      videos: [
        {
          id: "video2-1",
          title: "Customs Basics",
          description: "Introduction to customs procedures",
          duration: "12:18",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        }
      ],
      documents: [
        { id: "doc2-1", title: "HS Code Guide", description: "How to classify your products", fileUrl: "/sample.pdf" },
        { id: "doc2-2", title: "Customs Declaration Form", description: "Template for customs paperwork", fileUrl: "/sample.pdf" },
        { id: "doc2-3", title: "Regulations Handbook", description: "Latest customs regulations", fileUrl: "/sample.pdf" }
      ]
    }
  ]

  const handleSegmentSelect = (segment: VideoSegment) => {
    setSelectedSegment(segment)
    setVideoUnlocked(false)
    setPassword("")
    setError("")
    setSelectedVideo(null)
  }

  const handleBackToSegments = () => {
    setSelectedSegment(null)
    setShowVideoModal(false)
  }

  const handleWatchVideo = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    setTimeout(() => {
      if (password === correctPassword) {
        setVideoUnlocked(true)
      } else {
        setError("Incorrect password. Please try again.")
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleOpenVideo = (video: VideoItem) => {
    if (videoUnlocked) {
      setSelectedVideo(video)
      setShowVideoModal(true)
    }
  }

  const handleDownloadDocument = (document: DocumentItem) => {
    alert(`Downloading ${document.title}`)
  }

  const handleDownloadAll = async () => {
    if (!selectedSegment) return
    setDownloadingAll(true)
    const zip = new JSZip()
    const folder = zip.folder(selectedSegment.title.replace(/\s+/g, "_")) || zip

    await Promise.all(
      selectedSegment.documents.map(async (doc) => {
        try {
          const response = await fetch(doc.fileUrl)
          const blob = await response.blob()
          folder.file(doc.title.replace(/\s+/g, "_") + ".pdf", blob)
        } catch (e) {
          // Optionally handle errors
        }
      })
    )

    const content = await zip.generateAsync({ type: "blob" })
    saveAs(content, `${selectedSegment.title.replace(/\s+/g, "_")}_resources.zip`)
    setDownloadingAll(false)
  }

  const totalDuration = (segment: VideoSegment) => {
    return segment.videos.reduce((total, video) => {
      const [minutes, seconds] = video.duration.split(':').map(Number)
      return total + minutes * 60 + seconds
    }, 0)
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' + secs : secs}`
  }

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Export Training Program</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Complete guide to export documentation and procedures. Watch the training videos and download all supporting materials.
          </p>
        </div>

        {!selectedSegment ? (
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {videoSegments.map(segment => (
              <Card key={segment.id} onClick={() => handleSegmentSelect(segment)} className="hover:shadow-lg transition-shadow cursor-pointer border-blue-100">
                <CardHeader>
                  <div className="flex justify-center mb-4 bg-blue-50 p-4 rounded-lg">
                    <Video className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle>{segment.title}</CardTitle>
                  <CardDescription>{segment.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2 flex justify-between items-center">
                  <Badge>Duration: {formatDuration(totalDuration(segment))}</Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-600">
                    {segment.videos.length} Videos
                  </Badge>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">View Content</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <Button variant="outline" className="mb-6 flex items-center gap-2" onClick={handleBackToSegments}>
              <ArrowLeft className="h-4 w-4" /> Back to all segments
            </Button>

            <Card className="border-blue-100 shadow-lg">
              <CardHeader>
                <CardTitle>{selectedSegment.title}</CardTitle>
                <CardDescription>{selectedSegment.description}</CardDescription>
                <div className="flex gap-2 mt-2">
                  <Badge>Total Duration: {formatDuration(totalDuration(selectedSegment))}</Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-600">
                    {selectedSegment.videos.length} Videos
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-600">
                    {selectedSegment.documents.length} PDFs
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Video className="h-5 w-5 text-blue-600" /> Training Videos
                    </h3>
                    {!videoUnlocked ? (
                      <>
                        <p className="text-gray-600 mb-4">These video contents are password protected.</p>
                        <form onSubmit={handleWatchVideo} className="flex gap-2">
                          <div className="relative flex-1">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input type="password" placeholder="Enter video password" className="pl-10" value={password} onChange={(e) => setPassword(e.target.value)} />
                          </div>
                          <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isLoading || !password}>
                            {isLoading ? "Unlocking..." : "Unlock Videos"}
                          </Button>
                        </form>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                      </>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedSegment.videos.map(video => (
                          <Card key={video.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleOpenVideo(video)}>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">{video.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="pb-2">
                              <CardDescription>{video.description}</CardDescription>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center">
                              <Badge variant="outline">{video.duration}</Badge>
                              <Button variant="outline" size="sm">
                                <Video className="h-4 w-4 mr-2" /> Watch
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex justify-end mb-4">
                      <Button
                        variant="default"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={handleDownloadAll}
                        disabled={downloadingAll}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {downloadingAll ? "Preparing ZIP..." : "Download All PDFs (ZIP)"}
                      </Button>
                    </div>
                   
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <AnimatePresence>
          {showVideoModal && selectedVideo && (
            <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
              <DialogContent className="max-w-4xl p-0 bg-transparent shadow-none border-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="relative bg-white rounded-xl shadow-2xl overflow-hidden"
                >
                  <button
                    className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow transition"
                    onClick={() => setShowVideoModal(false)}
                    aria-label="Close"
                  >
                    <X className="h-5 w-5 text-gray-700" />
                  </button>
                  <DialogHeader className="p-8 pb-4">
                    <DialogTitle className="text-2xl font-bold">{selectedVideo.title}</DialogTitle>
                    <DialogDescription className="text-gray-600">{selectedVideo.description}</DialogDescription>
                  </DialogHeader>
                  <div className="aspect-video w-full bg-black rounded-b-xl overflow-hidden flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full"
                    >
                      <iframe
                        src={selectedVideo.videoUrl}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </motion.div>
                  </div>
                </motion.div>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}