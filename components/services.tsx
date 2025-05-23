"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Video, Mail, Award, Globe } from "lucide-react"
import Image from "next/image"

export function Services() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
         
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Online Course</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are introducing an online course that will benefit all participants who want to make a career in the
            Export-Import field.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card className="h-full border-red-100 shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl text-red-600">Course Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Our online course is designed for:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Graduates and undergraduates looking to make a career in Export-Import</li>
                  <li>Independent service providers who can extend services to exporters</li>
                  <li>Industrialists wanting to enter the export business</li>
                  <li>Company staff needing to understand export procedures</li>
                </ul>

                <p className="font-medium text-lg mt-6">This course will provide:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Fundamental knowledge of export-import procedures</li>
                  <li>Understanding of export promotion schemes</li>
                  <li>Practical insights into documentation requirements</li>
                  <li>Knowledge of international trade regulations</li>
                </ul>

                <div className="mt-6">
                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => {
                      const contactSection = document.querySelector("#contact")
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: "smooth" })
                      }
                    }}
                  >
                    Enroll Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="h-full border-red-100 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-red-600">Course Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start">
                  <Video className="h-5 w-5 text-red-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-medium">Video Lessons</h4>
                    <p className="text-sm text-gray-600">
                     Segment-wise knowledge videos in English only.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-red-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-medium">Study Material</h4>
                    <p className="text-sm text-gray-600">
                      Comprehensive PDF materials that you can learn at your convenience
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-red-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-medium">Support Service</h4>
                    <p className="text-sm text-gray-600">Get your queries answered via email after course completion</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Award className="h-5 w-5 text-red-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-medium">Certification</h4>
                    <p className="text-sm text-gray-600">Receive a certificate upon course completion</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Globe className="h-5 w-5 text-red-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-medium">Free Resources</h4>
                    <p className="text-sm text-gray-600">Access to our YouTube videos in multiple languages</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 relative mr-3">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/298915443_393765499581153_4128083252396595327_n-Fl6acizhj9F7x7udYSEhxOdSgOQiPa.png"
                alt="EGC Guidance Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Certificate Process</h3>
          </div>
          <p className="mb-4">On completion of the course, a certificate will be awarded online after scanning your:</p>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li>Passport size photo</li>
            <li>Copy of Aadhaar card or college ID card</li>
          </ul>
          <div className="p-4 bg-red-50 rounded-md border border-red-100">
            <p className="text-red-800 font-medium">
              For further information, please contact us at:{" "}
              <a href="mailto:exportguidancecenter@gmail.com" className="text-red-600 underline">
                exportguidancecenter@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
