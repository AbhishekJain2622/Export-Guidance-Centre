import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Image from "next/image"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* <div className="flex justify-center mb-8">
          <div className="w-20 h-20 relative">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/298915443_393765499581153_4128083252396595327_n-Fl6acizhj9F7x7udYSEhxOdSgOQiPa.png"
              alt="EGC Guidance Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Export Guidance Centre</h3>
            <p className="text-gray-300 mb-4">
              Your trusted partner for export training, guidance, and consultancy services in Mumbai.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-red-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-red-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-red-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-red-400 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-gray-300 hover:text-red-400 transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#video" className="text-gray-300 hover:text-red-400 transition-colors">
                  Video Resources
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-red-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Export Training Programs</li>
              <li className="text-gray-300">Documentation Guidance</li>
              <li className="text-gray-300">Market Entry Strategy</li>
              <li className="text-gray-300">Compliance Consulting</li>
              <li className="text-gray-300">International Trade Workshops</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
 <p>
  © {new Date().getFullYear()}{" "}
  <span style={{ color: "rgb(211, 47, 47)" }}>Export Guidance Centre.</span>{" "}
  Powered by{" "}
  <a
    href="https://codestudios.in/"
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: "rgb(211, 47, 47)" }}
    className="hover:text-white transition-colors"
  >
    Code Studio
  </a>{" "}
  All rights reserved.
</p>
        </div>
      </div>
    </footer>
  )
}
