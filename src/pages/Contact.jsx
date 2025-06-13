import { motion } from "framer-motion";
import { useState } from "react";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thank you for your message! We will contact you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="py-20 bg-gradient-to-b from-red-600 to-red-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl max-w-3xl mx-auto"
          >
            Get in touch to learn more about our classes and events
          </motion.p>
        </div>
      </section>

      <section className="py-16 px-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl font-bold mb-8 text-red-800">
                Our Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-yellow-100 p-3 rounded-full mr-4">
                    <FiMapPin className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-red-700">
                      Address
                    </h3>
                    <p className="text-gray-700">
                      123 Martial Arts Street, Cantonment, Trichy - 620001,
                      Tamil Nadu
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-yellow-100 p-3 rounded-full mr-4">
                    <FiPhone className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-red-700">
                      Phone
                    </h3>
                    <p className="text-gray-700">+91 98765 43210</p>
                    <p className="text-gray-700">+91 43210 98765</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-yellow-100 p-3 rounded-full mr-4">
                    <FiMail className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-red-700">
                      Email
                    </h3>
                    <p className="text-gray-700">contact@trichysilambam.com</p>
                    <p className="text-gray-700">info@trichysilambam.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-yellow-100 p-3 rounded-full mr-4">
                    <FiClock className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-red-700">
                      Training Hours
                    </h3>
                    <p className="text-gray-700">
                      Monday to Friday: 6AM - 9AM & 4PM - 7PM
                    </p>
                    <p className="text-gray-700">Saturday: 6AM - 11AM</p>
                    <p className="text-gray-700">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                  {/* <h3 className="text-xl font-semibold mb-4 text-red-700">
                   Find Us on Map
                  </h3> */}
                  {/* <div className="bg-gray-200 h-64 rounded-lg overflow-hidden">
       
                     <div className="w-full h-full flex items-center justify-center bg-yellow-50 text-red-700">
                       <p>Google Map would be embedded here</p>
                     </div>
                  </div> */}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl font-bold mb-8 text-red-800">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Your email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full cursor-pointer bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
