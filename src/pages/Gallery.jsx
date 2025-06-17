import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    "all",
    ...new Set(galleryImages.map((img) => img.category)),
  ];
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await fetch('/content/gallery/index.json');
        if (!response.ok) {
          throw new Error('Failed to load gallery data');
        }
        const data = await response.json();
        setGalleryImages(data);
      } catch (err) {
        console.error('Error loading gallery data:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
        setIsLoaded(true);
      }
    };

    fetchGalleryData();
  }, []);

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openImage = (img, index) => {
    setSelectedImage(img);
    setCurrentIndex(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const navigate = (direction) => {
    let newIndex;
    if (direction === "prev") {
      newIndex =
        currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    } else {
      newIndex =
        currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    }
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-xl text-red-600">Loading gallery...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <section className="py-20 bg-gradient-to-b from-red-700 to-red-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl max-w-3xl mx-auto"
          >
            Moments from our training sessions, performances, and competitions
          </motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full capitalize font-medium ${
                    activeCategory === category
                      ? "bg-red-600 text-white shadow-md"
                      : "bg-yellow-100 text-red-700 border border-yellow-200 hover:bg-yellow-200"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {filteredImages.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredImages.map((img, index) => (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    className="overflow-hidden rounded-lg shadow-md cursor-pointer bg-white border border-gray-100"
                    onClick={() => openImage(img, index)}
                  >
                    <img
                      src={img.image}
                      alt={`Silambam ${img.category}`}
                      className="w-full h-64 object-cover hover:opacity-90 transition-opacity"
                      loading="lazy"
                    />
                    <div className="p-4 text-center bg-yellow-50">
                      <span className="text-sm font-medium text-red-600 capitalize">
                        {img.category}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">
                  {galleryImages.length === 0
                    ? "No images found in gallery"
                    : "No images found in this category"}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeImage}
            className="absolute top-4 right-4 text-white text-4xl hover:text-yellow-400 transition-colors"
            aria-label="Close image"
          >
            <FiX />
          </button>

          <button
            onClick={() => navigate("prev")}
            className="absolute left-4 text-white text-4xl hover:text-yellow-400 transition-colors"
            aria-label="Previous image"
          >
            <FiChevronLeft />
          </button>

          <div className="max-w-4xl w-full">
            <img
              src={selectedImage.image}
              alt={`Silambam ${selectedImage.category}`}
              className="w-full max-h-screen object-contain"
            />
          </div>

          <button
            onClick={() => navigate("next")}
            className="absolute right-4 text-white text-4xl hover:text-yellow-400 transition-colors"
            aria-label="Next image"
          >
            <FiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;