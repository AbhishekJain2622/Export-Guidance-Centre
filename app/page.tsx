import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { Gallery } from "@/components/gallery"
import { VideoSection } from "@/components/video-section"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <section id="home" className="scroll-mt-16">
          <Hero />
        </section>
        <section id="about" className="scroll-mt-16">
          <About />
        </section>
        <section id="services" className="scroll-mt-16">
          <Services />
        </section>
        <section id="gallery" className="scroll-mt-16">
          <Gallery />
        </section>
        <section id="video" className="scroll-mt-16">
          <VideoSection />
        </section>
        <section id="contact" className="scroll-mt-16">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  )
}
