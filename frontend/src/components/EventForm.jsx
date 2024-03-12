// EventForm.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EventForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [organizerId, setOrganizerId] = useState(0);
  const [attendeeIds, setAttendeeIds] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [attendees, setAttendees] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/organizers")
      .then((response) => setOrganizers(response.data))
      .catch((error) => console.error("Error fetching organizers:", error));

    axios
      .get("http://localhost:8080/api/attendees")
      .then((response) => setAttendees(response.data))
      .catch((error) => console.error("Error fetching attendees:", error));

   
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventPayload = {
      title,
      description,
      attendeeIds,
    };

    const params = {
      organizerId: organizerId !== 0 ? organizerId : undefined,
      attendeeIds: attendeeIds.length > 0 ? attendeeIds.join(",") : undefined,
    };

    const endpoint = id
      ? `http://localhost:8080/api/events/${id}`
      : "http://localhost:8080/api/events";

    try {
      await axios.post(endpoint, eventPayload, { params });
      alert(id ? "Event updated successfully!" : "Event created successfully!");
      // Redirect to the events list page
      window.location.href = "/events";
    } catch (error) {
      console.error("Error submitting event:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-500 to-blue-500 h-screen p-4 text-black flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-8">
        {id ? "Edit Event" : "Create Event"}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full p-6 rounded-md shadow-md bg-white"
      >
        <label className="block mb-4">
          <span className="text-lg font-semibold">Title:</span>
          <input
            className="block w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-lg font-semibold">Description:</span>
          <textarea
            className="block w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-lg font-semibold">Organizer:</span>
          <select
            className="block w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={organizerId}
            onChange={(e) => setOrganizerId(Number(e.target.value))}
            required
          >
            <option value={0}>Select Organizer</option>
            {Array.isArray(organizers) &&
              organizers.map((organizer) => (
                <option key={organizer.id} value={organizer.id}>
                  {organizer.name}
                </option>
              ))}
          </select>
        </label>
        <label className="block mb-4">
          <span className="text-lg font-semibold">Attendees:</span>
          {Array.isArray(attendees) &&
            attendees.map((attendee) => (
              <div key={attendee.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value={attendee.id}
                  onChange={(e) =>
                    setAttendeeIds((prevIds) =>
                      e.target.checked
                        ? [...prevIds, attendee.id]
                        : prevIds.filter((id) => id !== attendee.id)
                    )
                  }
                  checked={attendeeIds.includes(attendee.id)}
                  className="mr-2"
                />
                <span>{attendee.name}</span>
              </div>
            ))}
        </label>
        <button
          className="bg-yellow-500 text-black rounded p-2 w-full hover:bg-yellow-600"
          type="submit"
        >
          {id ? "Update Event" : "Create Event"}
        </button>
      </form>
    </div>
  );
}

export default EventForm;
