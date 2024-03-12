import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateEvent() {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8080/api/events/${id}`)
      .then(response => {
        const eventData = response.data;
        setEvent(eventData);
        setTitle(eventData.title);
        setDescription(eventData.description);
      })
      .catch(error => console.error('Error fetching event details:', error));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedEvent = {
      title,
      description,
    };

    try {
      // Make a PUT request to update the event
      await axios.put(`http://localhost:8080/api/events/${id}/update`, updatedEvent);
      alert('Event updated successfully!');
      // Redirect to the event list page or any other desired location
      window.location.href = '/events';
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-500 to-blue-500 h-screen p-4 text-black flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-8">Update Event</h2>
      <form onSubmit={handleUpdate} className="max-w-md w-full p-6 rounded-md shadow-md bg-white">
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
        <button className="bg-yellow-500 text-black rounded p-2 w-full hover:bg-yellow-600" type="submit" >
          Update Event
        </button>
      </form>
    </div>
  );
}

export default UpdateEvent;
