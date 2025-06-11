import { motion } from "framer-motion";
import AnimatedHero from "../components/AnimatedHero";
import EventCard from "../components/EventCard";

const Home = () => {
  const featuredEvents = [
    {
      id: 1,
      title: "Annual Silambam Championship",
      date: "July 15, 2023",
      location: "Trichy District Stadium",
      image:
        "https://images.pexels.com/photos/14828326/pexels-photo-14828326.jpeg",
      excerpt:
        "Join us for our biggest event of the year featuring competitions in various categories.",
    },
    {
      id: 2,
      title: "Traditional Weapons Workshop",
      date: "August 5, 2023",
      location: "Club Training Hall",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkZnz7chiAQM1lDtRFXaowxT_l-8RZv8Ibf0EJsGAmSPT-DNsM_kym6P_VM6sSr1QFsys",
      excerpt:
        "Learn traditional Silambam weapons techniques from our master instructors.",
    },
  ];

  return (
    <div className="bg-white">
      <AnimatedHero />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-red-600"
          >
            Upcoming Events
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} delay={index * 0.2} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="md:w-1/2 relative">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="relative overflow-hidden rounded-xl shadow-xl"
                >
                  <img
                    src="https://historified.in/wp-content/uploads/2022/09/Ais_3_1645324583574_1645324950581.jpg"
                    alt="Silambam Training"
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
              </div>

              <div className="md:w-1/2">
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-3xl font-bold mb-6 text-red-600"
                >
                  About Our Club
                </motion.h2>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-lg mb-6 text-gray-700"
                >
                  Founded in 2005, the Trichy Silambam Club is dedicated to
                  preserving and promoting the ancient martial art of Silambam.
                </motion.p>

                <motion.ul className="space-y-3 mb-8">
                  {[
                    "Authentic traditional techniques",
                    "Modern teaching methods",
                    "Experienced instructors",
                    "Cultural preservation",
                    "Physical & mental development",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                      className="flex items-center"
                    >
                      <div className="bg-yellow-100 p-1 rounded-full mr-3 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-yellow-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl">
                    Learn More About Silambam
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
