import { motion, AnimatePresence } from "framer-motion";
import { GiBamboo } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Silambam", path: "/about" },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50 text-white">
      <div className="container mx-auto md:px-20 py-5 flex justify-between items-center">
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="flex items-center"
        >
          <GiBamboo className="text-3xl mr-2 text-yellow-500" />
          <h1 className="text-xl font-bold">Trichy Silambam Club</h1>
        </motion.div>

        <button
          className="text-white focus:outline-none z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <FiX className="h-6 w-6" />
          ) : (
            <FiMenu className="h-6 w-6" />
          )}
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-40"
                onClick={() => setIsMenuOpen(false)}
              />

              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-0 right-0 h-full w-3/4 max-w-sm bg-white shadow-2xl z-50"
              >
                <div className="h-full flex flex-col">
                  
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center">
                      <GiBamboo className="text-2xl mr-2 text-red-600" />
                      <span className="font-bold text-red-600">Menu</span>
                    </div>
                    <button
                      className="text-red-600 focus:outline-none hover:bg-red-50 p-1 rounded-full transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                      aria-label="Close menu"
                    >
                      <FiX className="h-6 w-6" />
                    </button>
                  </div>

                  
                  <nav className="flex-1 flex flex-col mt-10">
                    <ul className="space-y-6 px-4 text-center">
                      {navItems.map((item) => (
                        <motion.li
                          key={item.name}
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Link
                            to={item.path}
                            className="block py-3 px-4 text-red-600 hover:bg-red-50 rounded-lg transition-all text-lg font-medium hover:text-yellow-500"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </nav>

                  <div className="p-4 border-t border-gray-200 text-center">
                    <p className="text-sm text-red-600">
                      Trichy Silambam Club © {new Date().getFullYear()}
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
