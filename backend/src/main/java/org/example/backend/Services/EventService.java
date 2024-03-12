package org.example.backend.Services;

import jakarta.persistence.EntityNotFoundException;
import org.example.backend.Entities.Attendee;
import org.example.backend.Entities.Event;
import org.example.backend.Entities.Organizer;
import org.example.backend.Repositories.AttendeeRepository;
import org.example.backend.Repositories.EventRepository;
import org.example.backend.Repositories.OrganizerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private OrganizerRepository organizerRepository;

    @Autowired
    private AttendeeRepository attendeeRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    public Event createEvent(Event event, Long organizerId, Set<Long> attendeeIds) {
        // Check if organizer exists
        Organizer organizer = organizerRepository.findById(organizerId)
                .orElseThrow(() -> new EntityNotFoundException("Organizer not found with id: " + organizerId));
        event.setOrganizer(organizer);

        // Check if attendees exist
        Set<Attendee> attendees = attendeeRepository.findAllById(attendeeIds)
                .stream()
                .collect(Collectors.toSet());
        event.setAttendees(attendees);

        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, Event updatedEvent/*Long organizerId, Set<Long> attendeeIds*/) {
        Event existingEvent = eventRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + id));

//        // Check if organizer exists
//        Organizer organizer = organizerRepository.findById(organizerId)
//                .orElseThrow(() -> new EntityNotFoundException("Organizer not found with id: " + organizerId));
//        existingEvent.setOrganizer(organizer);
//
//        // Check if attendees exist
//        Set<Attendee> attendees = attendeeRepository.findAllById(attendeeIds)
//                .stream()
//                .collect(Collectors.toSet());
//        existingEvent.setAttendees(attendees);

        // Update other fields as needed
        existingEvent.setTitle(updatedEvent.getTitle());
        existingEvent.setDescription(updatedEvent.getDescription());
        // Update other fields

        return eventRepository.save(existingEvent);
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}