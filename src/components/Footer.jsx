import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import martial_logo from "../assets/martial_logo.png";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 pt-16 px-10 pb-8 relative">
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400"></div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="flex items-center mb-4">
              <img 
                src={martial_logo} 
                alt="Nellukuthiyaar Logo"
                className="h-12 w-auto mr-3"
              />
              <h3 className="text-xl font-bold text-red-600">
                Nellukuthiyaar
              </h3>
            </div>
            <p className="mb-4 text-gray-600">
              Preserving and promoting the ancient martial art of Silambam in
              Tamil Nadu since 2005.
            </p>
            <div className="flex space-x-4 mt-auto">
              <a href="#" className="text-gray-500 hover:text-red-600 transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-red-600 transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-red-600 transition">
                <FaYoutube size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-red-600 transition">
                <FaTwitter size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4 text-red-600">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-red-600 transition text-gray-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-red-600 transition text-gray-600">
                  About Silambam
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-red-600 transition text-gray-600">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-red-600 transition text-gray-600">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-red-600 transition text-gray-600">
                  Contact Us
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4 text-red-600">Contact Info</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <FiMapPin className="mt-1 mr-2 text-red-500" />
                <span>123 Silambam Street, Trichy 620001</span>
              </li>
              <li className="flex items-start">
                <FiPhone className="mt-1 mr-2 text-red-500" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start">
                <FiMail className="mt-1 mr-2 text-red-500" />
                <span>contact@nellukuthiyaar.com</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4 text-red-600">Newsletter</h3>
            <p className="mb-4 text-gray-600">
              Subscribe for updates on classes and events.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l-lg focus:outline-none border border-gray-300 focus:border-red-500 text-gray-700"
                required
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-r-lg transition"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>

        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} Nellukuthiyaar Martial Arts & Sports Academy. All Rights Reserved.
          </p>
          <div className="mt-2 text-sm text-gray-500">
            <a href="#" className="hover:text-red-600 transition mx-2">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-red-600 transition mx-2">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;