import { create } from "zustand";
import {
  getAllEvents,
  addEventToDB,
  deleteEventFromDB,
} from "../utils/indexedDb.js";

const initialEvents = [
  //   {
  //     id: 1,
  //     title: "Annual Silambam Championship",
  //     date: "November 10, 2024",
  //     location: "Chennai Trade Centre, Chennai",
  //     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiLiTZogTkMy6W2PaJ-SefPDezfK4NEOKdcA&s",
  //     excerpt: "Witness the prowess of Silambam practitioners from across the nation in this thrilling championship event.",
  //     type: "competition"
  //   },
];

export const useEventStore = create((set, get) => ({
  events: [],
  loading: false,
  error: null,

  loadEvents: async () => {
    set({ loading: true });
    try {
      const savedEvents = await getAllEvents();
      set({
        events: savedEvents.length > 0 ? savedEvents.reverse() : initialEvents,
        loading: false,
      });

      if (savedEvents.length === 0) {
        await Promise.all(initialEvents.map((event) => addEventToDB(event)));
      }
    } catch (error) {
      set({ error, loading: false });
    }
  },

  addEvent: async (newEventData) => {
    set({ loading: true });
    try {
      const events = get().events;
      const newId =
        events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1;
      const eventWithId = { id: newId, ...newEventData };

      await addEventToDB(eventWithId);
      set((state) => ({
        events: [eventWithId, ...state.events],
        loading: false,
      }));
    } catch (error) {
      set({ error, loading: false });
    }
  },

  deleteEvent: async (id) => {
    set({ loading: true });
    try {
      await deleteEventFromDB(id);
      set((state) => ({
        events: state.events.filter((event) => event.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));
