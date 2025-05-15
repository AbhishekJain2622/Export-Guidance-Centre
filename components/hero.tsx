"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

export function Hero() {
  const handleLearnMoreClick = () => {
    const aboutSection = document.querySelector("#about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative bg-gradient-to-r from-red-700 to-red-500 pt-24 pb-16 md:pt-32 md:pb-24 text-white">
      <div className="absolute inset-0 bg-black opacity-10"></div>

      {/* Curved silver path element inspired by the logo */}
      <div className="absolute top-0 right-0 w-full h-32 silver-gradient opacity-20 transform -skew-y-6"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-6">
              {/* <div className="mr-4 w-16 h-16 relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/298915443_393765499581153_4128083252396595327_n-Fl6acizhj9F7x7udYSEhxOdSgOQiPa.png"
                  alt="EGC Guidance Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div> */}
              <h1 className="text-4xl md:text-5xl font-bold">
                EXPORT GUIDANCE CENTRE
                <span className="block text-gray-200 text-2xl md:text-3xl">(MUMBAI)</span>
              </h1>
            </div>
            <p className="text-lg text-gray-100 mb-8 max-w-lg">
              We are an organization rendering professional services to exporters. We help provide solutions to their
              problems, especially in export promotion schemes. We enjoy their patronage on account of our efficient
              services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleLearnMoreClick} className="bg-white text-red-600 hover:bg-gray-100">
                Learn More
              </Button>
              <Button
                variant="outline"
                className="border-white bg-red-700 text-white hover:bg-red-700"
                onClick={() => {
                  const contactSection = document.querySelector("#contact")
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-white/20  blur-xl"></div>
              <img
                src="/06.jpg?key=hp76f"
                alt="Export Guidance Centre"
                className=" w-full h-[600px] shadow-2xl relative z-10"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave SVG */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  )
}
