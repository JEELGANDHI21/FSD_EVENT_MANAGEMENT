import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function OrganizerForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/api/organizers/${id}`)
        .then(response => {
          const organizer = response.data;
          setName(organizer.name);
          setEmail(organizer.email);
        })
        .catch(error => console.error('Error fetching organizer details:', error));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const organizerPayload = {
      name,
      email,
    };

    const endpoint = id ? `http://localhost:8080/api/organizers/${id}` : 'http://localhost:8080/api/organizers';

    try {
      await axios.post(endpoint, organizerPayload);
      alert(id ? 'Organizer updated successfully!' : 'Organizer created successfully!');
    } catch (error) {
      console.error('Error submitting organizer:', error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-500 to-blue-500 h-screen p-4 text-black flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-8">{id ? 'Edit Organizer' : 'Create Organizer'}</h2>
      <form onSubmit={handleSubmit} className="max-w-md w-full p-6 rounded-md shadow-md bg-white">
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
        <button
          className="bg-yellow-500 text-black rounded p-2 w-full hover:bg-yellow-600"
          type="submit"
        >
          {id ? 'Update Organizer' : 'Create Organizer'}
        </button>
      </form>
    </div>
  );
}

export default OrganizerForm;
