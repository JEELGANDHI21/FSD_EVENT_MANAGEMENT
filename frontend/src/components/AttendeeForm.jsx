import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function AttendeeForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [eventsAttending, setEventsAttending] = useState([]);
  const [events, setEvents] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/events")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const attendeePayload = {
      name,
      email,
      eventsAttending: eventsAttending.map((eventId) => ({ eventId })),
    };
    console.log("Attendee Payload:", attendeePayload);

    const endpoint = "http://localhost:8080/api/attendees";

    try {
      await axios.post(endpoint, attendeePayload);
      alert("Attendee created successfully!");
    } catch (error) {
      console.error("Error submitting attendee:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-500 to-blue-500 h-screen p-4 text-black flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-8">
        {id ? "Edit Attendee" : "Create Attendee"}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full p-6 rounded-md shadow-md bg-white"
      >
        <label className="block mb-4">
          <span className="text-lg font-semibold">Name:</span>
          <input
            className="block w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-lg font-semibold">Email:</span>
          <input
            className="block w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {/* <label className="block mb-4">
          <span className="text-lg font-semibold">Events Attending:</span>
          <select
            multiple
            value={eventsAttending}
            onChange={(e) =>
              setEventsAttending(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {Array.isArray(events) &&
              events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
          </select>
        </label> */}
        <button
          className="bg-yellow-500 text-black rounded p-2 w-full hover:bg-yellow-600"
          type="submit"
        >
          Create Attendee
        </button>
      </form>
    </div>
  );
}

export default AttendeeForm;
