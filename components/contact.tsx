"use client"

import React, { useState, useRef } from "react"
import emailjs from "@emailjs/browser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(false)

    if (!formRef.current) return

    emailjs
      .sendForm(
        "service_dgge0pb",      // replace with your actual service ID
        "template_5xws9r5",     // replace with your actual template ID
        formRef.current,
        "Hp864YwHzggAM9sRv"       // replace with your actual public key
      )
      .then(
        () => {
          setIsSubmitting(false)
          setSubmitSuccess(true)
          setFormData({ name: "", email: "", subject: "", message: "" })

          setTimeout(() => setSubmitSuccess(false), 5000)
        },
        (error) => {
          console.error("EmailJS Error:", error)
          setIsSubmitting(false)
          setSubmitError(true)
        }
      )
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Have questions about our services or courses? Get in touch with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Get In Touch</h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-red-600 mr-4 mt-1" />
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Email</h4>
                  <p className="text-gray-700">
                    <a href="mailto:exportguidancecenter@gmail.com" className="hover:text-red-600">
                      exportguidancecenter@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-6 w-6 text-red-600 mr-4 mt-1" />
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Phone</h4>
                  <p className="text-gray-700">+91 99875 97435<br />+91 70217 87294</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-red-600 mr-4 mt-1" />
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Address</h4>
                  <p className="text-gray-700">
                    Export Guidance Centre<br />
                    7th block 1st floor Anand CHS bhoir nagar<br />
                    Vadhyalya road<br />
                    Mulund East 400081
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Card className="border-red-100 shadow-md">
              <CardContent className="pt-6">
                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <Input
                      placeholder="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-red-200 focus:border-red-500"
                    />
                    <Input
                      type="email"
                      placeholder="Your Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-red-200 focus:border-red-500"
                    />
                    <Input
                      placeholder="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="border-red-200 focus:border-red-500"
                    />
                    <Textarea
                      placeholder="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      className="border-red-200 focus:border-red-500"
                    />

                    {submitSuccess && (
                      <div className="bg-green-50 text-green-700 p-3 rounded-md border border-green-200">
                        Thank you for your message! We'll get back to you soon.
                      </div>
                    )}

                    {submitError && (
                      <div className="bg-red-50 text-red-700 p-3 rounded-md border border-red-200">
                        Something went wrong. Please try again later.
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="h-4 w-4" /> Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
