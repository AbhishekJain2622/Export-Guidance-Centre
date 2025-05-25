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

interface VideoSegment {
  id: string
  title: string
  description: string
  duration: string
  videoUrl: string
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

  const correctPassword = "export2023"

  const videoSegments: VideoSegment[] = [
    {
      id: "segment1",
      title: "Introduction to Export Documentation",
      description: "Learn the basics of export documentation requirements",
      duration: "12:45",
      videoUrl: "/sigment-1/Starting export import-001.mp4",
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
      duration: "18:30",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      documents: [
        { id: "doc2-1", title: "HS Code Guide", description: "How to classify your products", fileUrl: "/sample.pdf" },
        { id: "doc2-2", title: "Customs Declaration Form", description: "Template for customs paperwork", fileUrl: "/sample.pdf" },
        { id: "doc2-3", title: "Regulations Handbook", description: "Latest customs regulations", fileUrl: "/sample.pdf" }
      ]
    },
    {
      id: "segment3",
      title: "Shipping and Logistics",
      description: "Managing international shipments and logistics",
      duration: "15:20",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      documents: [
        { id: "doc3-1", title: "Incoterms Guide", description: "Explanation of all Incoterms 2020", fileUrl: "/sample.pdf" },
        { id: "doc3-2", title: "Freight Calculator", description: "Tool for estimating shipping costs", fileUrl: "/sample.pdf" }
      ]
    }
  ]

  const handleSegmentSelect = (segment: VideoSegment) => {
    setSelectedSegment(segment)
    setVideoUnlocked(false)
    setPassword("")
    setError("")
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
        setShowVideoModal(true)
      } else {
        setError("Incorrect password. Please try again.")
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleDownloadDocument = (document: DocumentItem) => {
    alert(`Downloading ${document.title}`)
  }

  // Download all PDFs as a zip
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
                  <Badge>Duration: {segment.duration}</Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-600">{segment.documents.length} PDFs</Badge>
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
                  <Badge>Duration: {selectedSegment.duration}</Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-600">{selectedSegment.documents.length} PDFs available</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Video className="h-5 w-5 text-blue-600" /> Training Video
                    </h3>
                    <p className="text-gray-600 mb-4">This video content is password protected.</p>
                    <form onSubmit={handleWatchVideo} className="flex gap-2">
                      <div className="relative flex-1">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input type="password" placeholder="Enter video password" className="pl-10" value={password} onChange={(e) => setPassword(e.target.value)} />
                      </div>
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isLoading || !password}>
                        {isLoading ? "Unlocking..." : "Watch Video"}
                      </Button>
                    </form>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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
                    {/* <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Download className="h-5 w-5 text-green-600" /> Download Resources
                    </h3>
                    <p className="text-gray-600 mb-4">All supporting documents are free to download.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedSegment.documents.map(document => (
                        <Card key={document.id} className="hover:shadow-md transition-shadow">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{document.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <CardDescription>{document.description}</CardDescription>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="w-full" onClick={() => handleDownloadDocument(document)}>
                              <Download className="h-4 w-4 mr-2" /> Download PDF
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div> */}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <AnimatePresence>
          {showVideoModal && (
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
                    <DialogTitle className="text-2xl font-bold">{selectedSegment?.title}</DialogTitle>
                    <DialogDescription className="text-gray-600">{selectedSegment?.description}</DialogDescription>
                  </DialogHeader>
                  <div className="aspect-video w-full bg-black rounded-b-xl overflow-hidden flex items-center justify-center">
                    {videoUnlocked ? (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full"
                      >
                        <iframe
                          src={selectedSegment?.videoUrl}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full flex items-center justify-center text-white"
                      >
                        Enter password to unlock video
                      </motion.div>
                    )}
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