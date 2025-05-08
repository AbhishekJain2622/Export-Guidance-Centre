"use client";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
}

export function Gallery(): JSX.Element {
  const galleryImages: GalleryImage[] = [
    { src: "/02.jpg", alt: "Export Seminar" },
    { src: "/03.jpg", alt: "Trade Conference" },
    { src: "/04.jpg", alt: "Documentation Training" },
    {
      src: "/05.jpg",
      alt: "Shipping Port",
    },
 
  
  ];

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const closeLightbox = () => setCurrentIndex(null);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
  const nextImage = () =>
    setCurrentIndex((prev) =>
      prev !== null && prev < galleryImages.length - 1 ? prev + 1 : prev
    );

  const selectedImage = currentIndex !== null ? galleryImages[currentIndex] : null;

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Gallery</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our training sessions, workshops, and events through our gallery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setCurrentIndex(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full p-2"
            aria-label="Close"
          >
            <X size={28} />
          </button>

          <div className="relative max-w-4xl w-full flex items-center justify-center">
            {/* Left Arrow */}
            <button
              onClick={prevImage}
              disabled={currentIndex === 0}
              className="absolute left-0 text-white bg-black bg-opacity-60 hover:bg-opacity-80 p-2 rounded-full disabled:opacity-30"
              aria-label="Previous"
            >
              <ChevronLeft size={32} />
            </button>

            {/* Main Image */}
            <div className="text-center">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-h-[80vh] rounded-lg shadow-xl mx-auto"
              />
              <p className="text-white mt-4">{selectedImage.alt}</p>
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextImage}
              disabled={currentIndex === galleryImages.length - 1}
              className="absolute right-0 text-white bg-black bg-opacity-60 hover:bg-opacity-80 p-2 rounded-full disabled:opacity-30"
              aria-label="Next"
            >
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
