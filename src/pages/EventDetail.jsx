// import { useParams } from "react-router-dom";
// import { useEventStore } from "../store/eventStore";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

// const EventDetail = () => {
//   const { id } = useParams();
//   const { events } = useEventStore();
//   const event = events.find((e) => e.id === parseInt(id));

//   if (!event) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="text-center"
//         >
//           <h1 className="text-4xl font-bold text-red-600 mb-4">
//             Event Not Found
//           </h1>
//           <Link to="/events" className="text-yellow-600 hover:underline">
//             Back to Events
//           </Link>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="container mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
//         >
//           <div className="relative h-96 overflow-hidden">
//             <img
//               src={event.image}
//               alt={event.title}
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
//           </div>

//           <div className="p-8">
//             <div className="flex justify-between items-start mb-6">
//               <div>
//                 <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
//                   {event.type.toUpperCase()}
//                 </span>
//                 <h1 className="text-3xl font-bold text-gray-900">
//                   {event.title}
//                 </h1>
//               </div>
//               <div className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md">
//                 <div className="text-center">
//                   <div className="font-bold text-xl">
//                     {event.date.split(" ")[1]?.replace(",", "")}
//                   </div>
//                   <div className="text-sm">{event.date.split(" ")[0]}</div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center mb-6">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 text-yellow-600 mr-2"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                 />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                 />
//               </svg>
//               <span className="text-gray-700">{event.location}</span>
//             </div>

//             <div className="prose max-w-none mb-8">
//               <p className="text-gray-700 leading-relaxed">{event.excerpt}</p>

//               <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
//                 <h3 className="font-bold text-yellow-800 mb-2">
//                   Event Details
//                 </h3>
//                 <p className="text-gray-700">
//                   This {event.type} will cover various aspects of Silambam. Join
//                   us for an exciting session!
//                 </p>
//               </div>
//             </div>

//             <Link
//               to="/events"
//               className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-medium rounded-lg hover:shadow-md transition-all"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 mr-2"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               Back to Events
//             </Link>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default EventDetail;



import { useParams } from "react-router-dom";
import { useEventStore } from "../store/eventStore";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const EventDetail = () => {
  const { id } = useParams();
  const { events } = useEventStore();
  const event = events.find((e) => e.id === parseInt(id));

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            Event Not Found
          </h1>
          <Link to="/events" className="text-yellow-600 hover:underline">
            Back to Events
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Added banner section matching Gallery page */}
      <section className="py-20 bg-gradient-to-b from-red-700 to-red-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            {event.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl max-w-3xl mx-auto"
          >
            {event.date} • {event.location}
          </motion.p>
        </div>
      </section>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="relative h-96 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                    {event.type.toUpperCase()}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {event.title}
                  </h1>
                </div>
                <div className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md">
                  <div className="text-center">
                    <div className="font-bold text-xl">
                      {event.date.split(" ")[1]?.replace(",", "")}
                    </div>
                    <div className="text-sm">{event.date.split(" ")[0]}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-600 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-gray-700">{event.location}</span>
              </div>

              <div className="prose max-w-none mb-8">
                <p className="text-gray-700 leading-relaxed">{event.excerpt}</p>

                <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                  <h3 className="font-bold text-yellow-800 mb-2">
                    Event Details
                  </h3>
                  <p className="text-gray-700">
                    This {event.type} will cover various aspects of Silambam. Join
                    us for an exciting session!
                  </p>
                </div>
              </div>

              <Link
                to="/events"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-medium rounded-lg hover:shadow-md transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to Events
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;