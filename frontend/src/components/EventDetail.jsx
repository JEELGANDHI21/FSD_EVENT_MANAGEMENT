import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/events/${id}`)
        .then(response => {
            setEvent(response.data);
            setAttendees(prevAttendees => {
                console.log("Attendees State: ", prevAttendees); // Log the previous state
                return response.data.attendees || [];
            });
        })
        .catch(error => console.error('Error fetching event details:', error));
}, [id]);



  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{event.title} - Event Details</h2>
      <p>Description: {event.description}</p>
      <h3 className="text-lg font-bold mt-4">Attendees:</h3>
      {attendees.length > 0 ? (
        <ul>
          {attendees.map(attendee => (
            <li key={attendee.id}>{attendee.name} - {attendee.email}</li>
          ))}
        </ul>
      ) : (
        <p>No attendees for this event.</p>
      )}
    </div>
  );
}

export default EventDetail;
