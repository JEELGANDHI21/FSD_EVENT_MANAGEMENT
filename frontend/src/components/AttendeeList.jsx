import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendeeList = () => {
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/attendees')
      .then(response => {
        setAttendees(response.data);
      })
      .catch(error => {
        console.error('Error fetching attendees:', error);
      });
  }, []);

  const handleDeleteAttendee = async (attendeeId) => {
    try {
      await axios.delete(`http://localhost:8080/api/attendees/${attendeeId}`);
      // After deletion, update the attendees list
      const updatedAttendees = attendees.filter(attendee => attendee.id !== attendeeId);
      setAttendees(updatedAttendees);
    } catch (error) {
      console.error('Error deleting attendee:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Attendee List</h2>
      <ul>
        {attendees.map(attendee => (
          <li key={attendee.id} className="mb-2 border p-4 rounded flex justify-between items-center">
            <div>
              {attendee.name} - {attendee.email}
            </div>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => handleDeleteAttendee(attendee.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendeeList;
