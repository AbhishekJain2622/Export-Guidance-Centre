"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface GalleryImage {
  src: string;
  alt: string;
}

export function Gallery(): JSX.Element {
  const galleryImages: GalleryImage[] = [
    { src: "/1.jpeg", alt: "Export Seminar" },
    { src: "/2.jpeg", alt: "Trade Conference" },
    { src: "/3.jpeg", alt: "Documentation Training" },
    { src: "/4.jpeg", alt: "Shipping Port" },
    { src: "/5.jpeg", alt: "Export Seminar Repeat" },
    { src: "/6.jpeg", alt: "Trade Conference Repeat" },
    { src: "/7.jpeg", alt: "Documentation Training Repeat" },
  ];

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const closeLightbox = () => setCurrentIndex(null);

  return (
    <div className="py-20 bg-gradient-to-b from-gray-100 via-white to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 relative inline-block">
            <span className="relative z-10">Gallery</span>
            <span className="absolute left-0 bottom-0 w-full h-1 bg-yellow-400 z-0 rounded"></span>
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Explore our training sessions, workshops, and events through our vibrant gallery.
          </p>
        </div>

        {/* Carousel with autoplay outside modal */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          loop
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation
        >
          {galleryImages.map((image, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl cursor-pointer group"
                  onClick={() => setCurrentIndex(index)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition duration-500 flex items-center justify-center">
                    <p className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition">
                      {image.alt}
                    </p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {currentIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full p-2 z-50 transition"
              aria-label="Close"
            >
              <X size={28} />
            </button>

            <div className="w-full max-w-6xl">
              <Swiper
                modules={[Navigation]} // No Autoplay here to avoid issues
                navigation
                loop
                initialSlide={currentIndex}
                onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
                className="rounded-lg"
              >
                {galleryImages.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="flex flex-col items-center justify-center text-center">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="max-h-[80vh] rounded-lg shadow-2xl mx-auto"
                      />
                      <motion.p
                        className="text-white mt-4 text-xl font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {img.alt}
                      </motion.p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
