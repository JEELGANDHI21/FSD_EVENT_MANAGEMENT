import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import EventList from "./components/EventList";
import EventForm from "./components/EventForm";
import AttendeeList from "./components/AttendeeList";
import AttendeeForm from "./components/AttendeeForm";
import OrganizerList from "./components/OrganizerList";
import OrganizerForm from "./components/OrganizerForm";
import HomePage from "./components/HomePage";
import UpdateEvent from "./components/UpdateEvent";
import EventDetail from "./components/EventDetail";



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/events/add" element={<EventForm />} />
          <Route path="/events/edit/:id" element={<EventForm />} />
          <Route path="/events/:id/update" element={<UpdateEvent />} />
          <Route path="/events/:id" element={<EventDetail />} />

          <Route path="/attendees" element={<AttendeeList />} />
          <Route path="/attendees/add" element={<AttendeeForm />} />
          <Route path="/attendees/edit/:id" element={<AttendeeForm />} />

          <Route path="/organizers" element={<OrganizerList />} />
          <Route path="/organizers/add" element={<OrganizerForm />} />
          <Route path="/organizers/edit/:id" element={<OrganizerForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
