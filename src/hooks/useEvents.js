import { useState, useEffect } from 'react';

export default function useEvents() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/content/events/index.json");
        if (!response.ok) throw new Error("Failed to load events");
        const data = await response.json();
        
        const parseDate = (dateString) => {
          try {
            return new Date(dateString);
          } catch (e) {
            console.warn("Invalid date format:", dateString);
            return new Date(0);
          }
        };

        const sortedEvents = data
          .map((event) => ({
            ...event,
            image: event.image?.startsWith("http") 
              ? event.image 
              : event.image?.startsWith("/uploads/")
                ? event.image
                : `/uploads/${event.image}`,
            parsedDate: parseDate(event.date)
          }))
          .sort((a, b) => b.parsedDate - a.parsedDate);
        
        setEvents(sortedEvents);
      } catch (err) {
        setError(err);
        console.error("Error loading events:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  return { events, isLoading, error };
}