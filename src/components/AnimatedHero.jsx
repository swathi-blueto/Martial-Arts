import { motion } from "framer-motion";

import Header from "./Header";

const AnimatedHero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://wallpapercave.com/wp/wp13199489.jpg')",
          opacity: 0.8,
        }}
      ></div>

      <div className="absolute inset-0 bg-black/30"></div>

      <Header />

      <div className="container mx-auto px-4 z-10 text-center mt-16">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg"
        >
          Preserving the Art of Silambam
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl mb-8 max-w-2xl mx-auto text-white/90 drop-shadow-md"
        >
          Traditional martial arts from Tamil Nadu, taught in the heart of
          Trichy
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg">
            Join Our Classes
          </button>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default AnimatedHero;
