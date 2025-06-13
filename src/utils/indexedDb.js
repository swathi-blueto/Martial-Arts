
export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('SilambamEventsDB', 2);

    request.onerror = (event) => {
      console.error("Database error:", event.target.error);
      reject(event.target.error);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('events')) {
        db.createObjectStore('events', { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
  });
};

export const getAllEvents = async () => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('events', 'readonly');
    const store = transaction.objectStore('events');
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject(event.target.error);
  });
};

export const addEventToDB = async (event) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('events', 'readwrite');
    const store = transaction.objectStore('events');
    const request = store.add(event);

    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject(event.target.error);
  });
};

export const deleteEventFromDB = async (id) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('events', 'readwrite');
    const store = transaction.objectStore('events');
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = (event) => reject(event.target.error);
  });
};