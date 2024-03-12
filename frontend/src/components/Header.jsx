// Header.js

import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gradient-to-r from-teal-500 to-indigo-800 p-4 text-center">
      <h1 className="text-white text-4xl font-extrabold mb-6">Event Management System</h1>
      <nav>
        <ul className="flex justify-center space-x-6">
          <li>
            <Link className="text-white hover:text-yellow-300" to="/events">
              Event List
            </Link>
          </li>
          <li>
            <Link className="text-white hover:text-yellow-300" to="/events/add">
              Add Event
            </Link>
          </li>
          <li>
            <Link className="text-white hover:text-yellow-300" to="/attendees">
              Attendee List
            </Link>
          </li>
          <li>
            <Link className="text-white hover:text-yellow-300" to="/attendees/add">
              Add Attendee
            </Link>
          </li>
          <li>
            <Link className="text-white hover:text-yellow-300" to="/organizers">
              Organizer List
            </Link>
          </li>
          <li>
            <Link className="text-white hover:text-yellow-300" to="/organizers/add">
              Add Organizer
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
