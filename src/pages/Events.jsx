import { motion } from "framer-motion";
import EventCard from "../components/EventCard";
import { useState } from "react";
import useEvents from "../hooks/useEvents";

const Events = () => {
  const { events, isLoading, error } = useEvents();
  const [activeFilter, setActiveFilter] = useState("all");

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-center">
          <h2 className="text-xl font-bold">Error loading events</h2>
          <p>{error.message}</p>
          <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const filteredEvents = activeFilter === "all" 
    ? events 
    : events.filter(event => event.type === activeFilter);

  return (
    <div className="bg-white min-h-screen">
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-24 bg-gradient-to-b from-red-700 to-red-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Events & Workshops
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl max-w-3xl mx-auto"
          >
            Join our upcoming events and immerse yourself in Silambam
          </motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {["all", "workshop", "competition", "seminar", "webinar"].map(
                  (filter) => (
                    <motion.button
                      key={filter}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-4 py-2 rounded-full capitalize font-medium ${
                        activeFilter === filter
                          ? "bg-red-600 text-white shadow-md"
                          : "bg-yellow-100 text-red-700 border border-yellow-200 hover:bg-yellow-200"
                      }`}
                    >
                      {filter}
                    </motion.button>
                  )
                )}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event, index) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      delay={(index % 3) * 0.1}
                    />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-10">
                    <p className="text-gray-600">No events found</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;