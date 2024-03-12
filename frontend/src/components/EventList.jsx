import React, { useState, useEffect } from 'react';
import axios from 'axios';


function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/events')
      .then(response => {
        console.log("Events : ",response.data);  // Log the data to the console
        setEvents(response.data);
      })
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const handleUpdateEvent = (eventId) => {
    window.location.href = `/events/${eventId}/update`;
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:8080/api/events/${eventId}`);
      const updatedEvents = events.filter(event => event.id !== eventId);
      setEvents(updatedEvents);
      alert('Event deleted successfully!');
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  if (events.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
    <h2 className="text-2xl font-bold mb-4">Event List</h2>
    {events.map(event => (
      <div key={event.id} className="mb-2 border p-4 rounded">
        <strong className="text-blue-500">{event.title}</strong> - {event.description}
        <button className="bg-green-500 text-white px-2 py-1 ml-2 rounded" onClick={() => handleUpdateEvent(event.id)}>Update</button>
        <button className="bg-red-500 text-white px-2 py-1 ml-2 rounded" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
      </div>
    ))}
  </div>
  );
}

export default EventList;