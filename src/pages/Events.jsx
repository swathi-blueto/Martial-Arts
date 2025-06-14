// import { motion } from "framer-motion";
// import EventCard from "../components/EventCard";
// import { useState, useEffect } from "react";
// import { useEventStore } from "../store/eventStore";
// import { useLocation, useNavigate } from "react-router-dom";

// const Events = () => {
//   const { events, addEvent, deleteEvent, loadEvents } = useEventStore();
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     date: "",
//     location: "",
//     image: "",
//     excerpt: "",
//     type: "workshop",
//   });

//   const location = useLocation();
//   const navigate = useNavigate();
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     setShowAddForm(location.pathname === "/events/adminform");
//   }, [location]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       setIsLoading(true);
//       try {
//         await loadEvents();
//       } catch (error) {
//         console.error("Error loading events:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchEvents();
//   }, [loadEvents, location.pathname]);

//   const handleAddEvent = (e) => {
//     e.preventDefault();
//     addEvent(newEvent);
//     setNewEvent({
//       title: "",
//       date: "",
//       location: "",
//       image: "",
//       excerpt: "",
//       type: "workshop",
//     });
//     navigate("/events");
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setNewEvent((prev) => ({
//           ...prev,
//           image: event.target.result,
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewEvent((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const filteredEvents =
//     activeFilter === "all"
//       ? events
//       : events.filter((event) => event.type === activeFilter);

//   return (
//     <div className="bg-white min-h-screen">
//       <section className="py-20 bg-gradient-to-b from-red-700 to-red-800 text-white">
//         <div className="container mx-auto px-4 text-center">
//           <motion.h1
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-4xl md:text-5xl font-bold mb-6 cursor-pointer"
//           >
//             Events & Workshops
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3, duration: 0.6 }}
//             className="text-xl max-w-3xl mx-auto"
//           >
//             Join our upcoming events and immerse yourself in Silambam
//           </motion.p>
//         </div>
//       </section>

//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           {isLoading ? (
//             <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
//             </div>
//           ) : (
//             <>
//               {showAddForm && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="mb-8 p-6 bg-yellow-50 border-2 border-red-600 rounded-lg"
//                 >
//                   <h3 className="text-xl font-bold mb-4 text-red-700">
//                     Add New Event
//                   </h3>
//                   <form onSubmit={handleAddEvent} className="space-y-4">
//                     <div>
//                       <label className="block text-gray-700 mb-1">
//                         Event Title
//                       </label>
//                       <input
//                         type="text"
//                         name="title"
//                         value={newEvent.title}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-4 py-2 border border-yellow-300 rounded focus:ring-2 focus:ring-red-500"
//                       />
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-gray-700 mb-1">Date</label>
//                         <input
//                           type="text"
//                           name="date"
//                           value={newEvent.date}
//                           onChange={handleInputChange}
//                           required
//                           className="w-full px-4 py-2 border border-yellow-300 rounded focus:ring-2 focus:ring-red-500"
//                           placeholder="e.g. January 15, 2024"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-gray-700 mb-1">Location</label>
//                         <input
//                           type="text"
//                           name="location"
//                           value={newEvent.location}
//                           onChange={handleInputChange}
//                           required
//                           className="w-full px-4 py-2 border border-yellow-300 rounded focus:ring-2 focus:ring-red-500"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-gray-700 mb-1">
//                         Event Image
//                       </label>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                         className="w-full px-4 py-2 border border-yellow-300 rounded focus:ring-2 focus:ring-red-500"
//                       />
//                       {newEvent.image && (
//                         <div className="mt-2">
//                           <img
//                             src={newEvent.image}
//                             alt="Preview"
//                             className="h-32 object-contain rounded"
//                           />
//                         </div>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-gray-700 mb-1">
//                         Description
//                       </label>
//                       <textarea
//                         name="excerpt"
//                         value={newEvent.excerpt}
//                         onChange={handleInputChange}
//                         required
//                         rows="3"
//                         className="w-full px-4 py-2 border border-yellow-300 rounded focus:ring-2 focus:ring-red-500"
//                       ></textarea>
//                     </div>

//                     <div>
//                       <label className="block text-gray-700 mb-1">Event Type</label>
//                       <select
//                         name="type"
//                         value={newEvent.type}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-2 border border-yellow-300 rounded focus:ring-2 focus:ring-red-500"
//                       >
//                         <option value="workshop">Workshop</option>
//                         <option value="competition">Competition</option>
//                         <option value="demonstration">Demonstration</option>
//                         <option value="class">Class</option>
//                       </select>
//                     </div>

//                     <div className="flex justify-end gap-3 pt-2">
//                       <button
//                         type="button"
//                         onClick={() => navigate("/events")}
//                         className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit"
//                         className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                       >
//                         Add Event
//                       </button>
//                     </div>
//                   </form>
//                 </motion.div>
//               )}

//               <motion.div
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 transition={{ duration: 0.6 }}
//                 viewport={{ once: true }}
//                 className="mb-12"
//               >
//                 <div className="flex flex-wrap justify-center gap-4 mb-8">
//                   {["all", "competition", "workshop", "demonstration", "class"].map(
//                     (filter) => (
//                       <motion.button
//                         key={filter}
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => setActiveFilter(filter)}
//                         className={`px-4 py-2 rounded-full capitalize font-medium ${
//                           activeFilter === filter
//                             ? "bg-red-600 text-white shadow-md"
//                             : "bg-yellow-100 text-red-700 border border-yellow-200 hover:bg-yellow-200"
//                         }`}
//                       >
//                         {filter}
//                       </motion.button>
//                     )
//                   )}
//                 </div>

//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//                   {filteredEvents.length > 0 ? (
//                     filteredEvents.map((event, index) => (
//                       <div key={event.id}>
//                         <EventCard
//                           event={event}
//                           delay={(index % 3) * 0.1}
//                           showDelete={showAddForm}
//                           onDelete={deleteEvent}
//                         />
//                       </div>
//                     ))
//                   ) : (
//                     <div className="col-span-3 text-center py-10">
//                       <p className="text-gray-600">No events found</p>
//                     </div>
//                   )}
//                 </div>
//               </motion.div>
//             </>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Events;


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
      <section className="py-20 bg-gradient-to-b from-red-700 to-red-800 text-white">
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