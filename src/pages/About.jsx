import { motion } from 'framer-motion';

const About = () => {
  const historyTimeline = [
    {
      year: "2000 BCE",
      title: "Origins of Silambam",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam maxime ea culpa, nam voluptas ipsum atque ex velit. Pariatur, error."
    },
    {
      year: "18th Century",
      title: "Colonial Suppression",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam maxime ea culpa, nam voluptas ipsum atque ex velit. Pariatur, error."
    },
    {
      year: "1947",
      title: "Post-Independence Revival",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam maxime ea culpa, nam voluptas ipsum atque ex velit. Pariatur, error."
    },
    {
      year: "2005",
      title: "Trichy Club Founded",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam maxime ea culpa, nam voluptas ipsum atque ex velit. Pariatur, error."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      
      <section className="py-16 sm:py-20 bg-gradient-to-b from-red-700 to-red-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
          >
            About Silambam
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-base sm:text-xl max-w-3xl mx-auto"
          >
            Discover the ancient martial art that combines physical prowess with cultural heritage
          </motion.p>
        </div>
      </section>

      
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-12 sm:mb-16 bg-white p-6 sm:p-8 rounded-xl shadow-lg border-l-4 border-yellow-500"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-red-700">What is Silambam?</h2>
            <div className="space-y-3 sm:space-y-4 text-gray-700 text-sm sm:text-base">
              <p>
                Silambam is a traditional Indian martial art originating from Tamil Nadu, primarily focusing on bamboo staff combat. 
                The name derives from "Silam" (hill) and "bam" (bamboo), referring to the bamboo found in the Kurinji hills of Tamil Nadu.
              </p>
              <p>
                This ancient art form includes various techniques involving footwork, strikes, spins, and jumps. Practitioners also learn 
                to use other traditional weapons like maru (a thrusting weapon), vaal (sword), and kuttu katai (spiked knuckle duster).
              </p>
              <p>
                Beyond combat, Silambam is a complete physical and mental discipline that improves coordination, flexibility, and concentration. 
                It's deeply connected to Tamil culture and history.
              </p>
            </div>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-4 sm:p-8 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 text-center text-red-700">History of Silambam</h2>
            <div className="relative">
              
              {/* Timeline line - hidden on small screens */}
              <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-yellow-500"></div>
              
              
              <div className="space-y-8 sm:space-y-16">
                {historyTimeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    {/* Mobile layout (stacked) */}
                    <div className="sm:hidden w-full p-4 rounded-lg shadow-md bg-white border-2 border-red-100">
                      <h3 className="text-lg font-bold mb-1 text-red-700">{item.title}</h3>
                      <p className="text-xs font-semibold text-yellow-600 mb-2">{item.year}</p>
                      <p className="text-xs text-gray-700">{item.description}</p>
                    </div>
                    
                    {/* Desktop layout (alternating sides) */}
                    <div className={`hidden sm:flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                      <div className={`w-full sm:w-5/12 p-4 sm:p-6 rounded-lg shadow-md ${index % 2 === 0 ? 'bg-white border-2 border-red-100 mr-auto' : 'bg-red-50 ml-auto'}`}>
                        {/* Dot indicator - hidden on small screens */}
                        <div className="hidden sm:block absolute top-1/2 transform -translate-y-1/2 w-5 h-5 rounded-full bg-yellow-500 border-4 border-white shadow-md"
                          style={{ left: index % 2 === 0 ? 'calc(50% + 8px)' : 'calc(50% - 28px)' }}
                        ></div>
                        <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-red-700">{item.title}</h3>
                        <p className="text-xs sm:text-sm font-semibold text-yellow-600 mb-1 sm:mb-2">{item.year}</p>
                        <p className="text-xs sm:text-sm text-gray-700">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mt-12 sm:mt-16 bg-white p-6 sm:p-8 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-red-700">Benefits of Silambam</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                "Improves physical fitness and coordination",
                "Enhances mental focus and discipline",
                "Teaches self-defense techniques",
                "Preserves Tamil cultural heritage",
                "Develops quick reflexes and agility",
                "Builds confidence and character"
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="bg-yellow-100 p-1 sm:p-2 rounded-full mr-2 sm:mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;