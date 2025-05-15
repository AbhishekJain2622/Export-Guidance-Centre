"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Award, Users, Clock } from "lucide-react"
import { motion } from "framer-motion"

export function About() {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-red-600" />,
      title: "In-house Training",
      description:
        "We provide classroom training at Mulund, Thane, and Andheri. Some industrialists have requested in-house training for their staff.",
    },
    {
      icon: <Users className="h-8 w-8 text-red-600" />,
      title: "College Student Training",
      description:
        "College students are trained in export-import courses and benefit from sufficient knowledge of export trade.",
    },
    {
      icon: <Award className="h-8 w-8 text-red-600" />,
      title: "Employment Placement",
      description:
        "Our training has helped participants get better employment placement in export houses and trading houses.",
    },
    {
      icon: <Clock className="h-8 w-8 text-red-600" />,
      title: "Flexible Learning",
      description: "Learn at your own pace with our online courses, video tutorials, and PDF study materials.",
    },
  ]

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Us</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Export Guidance Centre has been helping exporters and individuals gain knowledge in international trade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Story</h3>
            <p className="text-gray-700 mb-4">
              We are an organization rendering professional services to exporters. We help provide solutions to their
              problems, especially in export promotion schemes. We enjoy their patronage on account of our efficient
              services.
            </p>
            <p className="text-gray-700 mb-4">
              Some industrialists desired to get knowledge in export and hence started in-house training (class-room) at
              Mulund, Thane and Andheri.
            </p>
            <p className="text-gray-700">
             Recently, we completed our in-house program under the encouragement of Shri Siddharth
              Sinkar, CA IT practitioner and Founder of Saraswat Chamber of Commerce.
            </p>
          </div>
          <div>
            <img
              src="/02.jpg"
              alt="Export Training Session"
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Our Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="service-card bg-white rounded-lg shadow-md p-6 card-hover"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Benefits of Our Training</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-red-100">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="hexagon w-10 h-10 flex items-center justify-center mr-3">
                    <span className="text-white font-bold">EGC</span>
                  </div>
                  <h4 className="text-xl font-semibold text-red-600">For Individuals</h4>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 text-red-600">•</div>
                    <p>Better employment placement in export houses and trading houses</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 text-red-600">•</div>
                    <p>Fundamental knowledge of export-import procedures</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 text-red-600">•</div>
                    <p>Career opportunities in the export-import field</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 text-red-600">•</div>
                    <p>Ability to work as independent service providers to exporters</p>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-100">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="hexagon w-10 h-10 flex items-center justify-center mr-3">
                    <span className="text-white font-bold">EGC</span>
                  </div>
                  <h4 className="text-xl font-semibold text-red-600">For Companies</h4>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 text-red-600">•</div>
                    <p>Staff members gain knowledge to complete export procedures independently</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 text-red-600">•</div>
                    <p>Help industrialists enter the export business</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 text-red-600">•</div>
                    <p>Solutions to problems in export promotion schemes</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 text-red-600">•</div>
                    <p>Customized in-house training for company staff</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
