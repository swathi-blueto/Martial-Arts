// import { motion } from "framer-motion";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// const EventCard = ({
//   event,
//   delay = 0,
//   showDelete = false,
//   onDelete,
//   className = "",
// }) => {
//   const [imgSrc, setImgSrc] = useState(event.image);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, delay }}
//       viewport={{ once: true }}
//       whileHover={{ y: -8 }}
//       className={`relative bg-white rounded-xl shadow-lg overflow-hidden transition-all group border-2 border-gray-100 hover:border-red-100 h-full ${className}`}
//     >
//       <div className="relative h-52 overflow-hidden">
//         <img
//           src={imgSrc}
//           alt={event.title}
//           onError={() =>
//             setImgSrc("https://via.placeholder.com/400x225?text=Silambam+Event")
//           }
//           className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

//         <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full shadow-md">
//           <span className="font-medium text-sm">
//             {event.date.split(" ")[0]}
//           </span>

//           <span className="font-bold ml-1">
//             {event.date?.split(" ")[1]?.replace(",", "") || ""}
//           </span>
//         </div>
//       </div>

//       <div className="p-6">
//         <div className="absolute top-0 left-0 bg-yellow-400 text-xs text-black px-3 py-1 font-bold rounded-br-xl shadow-md">
//           Featured
//         </div>

//         <h3 className="text-xl font-bold mb-2 text-red-700 group-hover:text-red-600 transition-colors">
//           {event.title}
//         </h3>

//         <div className="flex items-center mb-3">
//           <div className="p-1.5 bg-yellow-100 rounded-full mr-2">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4 text-yellow-600"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//               />
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//               />
//             </svg>
//           </div>
//           <span className="text-gray-600 text-sm">{event.location}</span>
//         </div>

//         <p className="text-gray-600 mb-5 text-sm border-l-2 border-yellow-500 pl-3 py-1">
//           {event.excerpt}
//         </p>

//         <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-red-600"></div>

//         <Link to={`/events/${event.id}`} state={{ fromCard: true }}>
//           <motion.button
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.97 }}
//             className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-medium py-2 px-4 rounded-lg transition-all shadow-sm hover:shadow-md"
//           >
//             View Details
//           </motion.button>
//         </Link>

//         {showDelete && (
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               onDelete(event.id);
//             }}
//             className="w-full mt-3 bg-red-500 text-white p-2 font-medium rounded-lg z-20 hover:bg-red-600 transition-colors shadow-lg"
//           >
//             Delete Event
//           </button>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default EventCard;

import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event, delay = 0 }) => {
  const [imgSrc, setImgSrc] = useState(() => {
    if (event.image.startsWith("http")) {
      return event.image;
    }
    return event.image.startsWith("/uploads/") 
      ? event.image 
      : `/uploads/${event.image}`;
  });

  const formatDate = (dateString) => {
    if (!dateString) return ['', ''];
    const date = new Date(dateString);
    return [
      date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      date.toLocaleDateString('en-US', { year: 'numeric' })
    ];
  };

  const [displayDate, displayYear] = formatDate(event.date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-all group border-2 border-gray-100 hover:border-red-100 h-full w-full max-w-xs mx-auto" // Added max-w-xs and mx-auto
    >
      <div className="relative h-40 overflow-hidden"> {/* Reduced height */}
        <img
          src={imgSrc}
          alt={event.title}
          onError={() => 
            setImgSrc("https://via.placeholder.com/400x225?text=Silambam+Event")
          }
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" // Changed to object-cover
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-full shadow-md text-xs"> {/* Smaller date badge */}
          <span className="font-medium">{displayDate}</span>
          <span className="font-bold ml-1">{displayYear}</span>
        </div>
      </div>

      <div className="p-4"> {/* Reduced padding */}
        <div className="absolute top-0 left-0 bg-yellow-400 text-[10px] text-black px-2 py-1 font-bold rounded-br-xl shadow-md"> {/* Smaller type badge */}
          {event.type.toUpperCase()}
        </div>

        <h3 className="text-lg font-bold mb-2 text-red-700 group-hover:text-red-600 transition-colors line-clamp-1"> {/* Added line-clamp */}
          {event.title}
        </h3>

        <div className="flex items-center mb-2">
          <div className="p-1 bg-yellow-100 rounded-full mr-2"> {/* Smaller icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 text-yellow-600" // Smaller icon
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
          </div>
          <span className="text-gray-600 text-xs line-clamp-1">{event.location}</span> {/* Smaller text */}
        </div>

        <p className="text-gray-600 mb-4 text-xs border-l-2 border-yellow-500 pl-2 py-1 line-clamp-2"> {/* Smaller text and line-clamp */}
          {event.excerpt}
        </p>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-red-600"></div>

        <Link 
          to={`/events/${event.slug || event.id}`} 
          state={{ eventData: event }}
          className="block w-full text-center"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-medium py-1.5 px-3 rounded-lg transition-all shadow-sm hover:shadow-md text-sm" // Smaller button
          >
            View Details
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default EventCard;