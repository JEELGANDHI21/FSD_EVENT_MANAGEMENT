import React, { useState, useEffect } from "react";
import axios from "axios";

function OrganizerList() {
  const [organizers, setOrganizers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/organizers")
      .then((response) => setOrganizers(response.data))
      .catch((error) => console.error("Error fetching organizers:", error));
  }, []);
  const handleDeleteOrganizer = async (organizerId) => {
    try {
      await axios.delete(`http://localhost:8080/api/organizers/${organizerId}`);
      
      const updatedOrganizers = organizers.filter(organizer => organizer.id !== organizerId);
      setOrganizers(updatedOrganizers);
    } catch (error) {
      console.error('Error deleting organizer:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Organizer List</h2>
      <ul>
        {organizers.map((organizer) => (
          <li
            key={organizer.id}
            className="mb-2 border p-4 rounded flex justify-between items-center"
          >
            <div>
              <strong>{organizer.name}</strong> - {organizer.email}
            </div>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => handleDeleteOrganizer(organizer.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrganizerList;
