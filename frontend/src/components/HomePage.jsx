import React from "react";
import Header from "./Header";
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handleAddEventClick = () => {
    navigate('/events/add');
  };
  const handleShowEventClick = () => {
    navigate('/events');
  };
  return (
    <div className="h-screen">
      <Header />
      <div className="flex h-full p-8">
        <div className="flex-1">
          <img
            src="https://buynsellhub.s3.ap-south-1.amazonaws.com/Food/WhatsApp+Image+2024-03-10+at+22.12.53_4033dd06.jpg"
            alt="Event Image"
            className="w-full h-auto max-h-full object-cover"
          />
        </div>

        <div className="flex-1 p-4 flex flex-col justify-center items-center">
          <h2 className="text-3xl  mb-6 text-center text-gray-800">
            Transform your events with ease on our all-in-one platform.
            <br />
            Connect and celebrate.
            <br /> Your perfect event, effortlessly managed.
          </h2>

          <div className="flex space-x-4">
            <button className="bg-blue-500 text-white px-4 py-4 rounded-full font-bold" onClick={handleAddEventClick}>
              Add Event
            </button>
            <button className="bg-green-500 text-white px-4 py-4 rounded-full font-bold" onClick={handleShowEventClick}>
              Show Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
