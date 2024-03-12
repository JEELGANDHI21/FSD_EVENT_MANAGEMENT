package org.example.backend.Services;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.example.backend.Entities.Attendee;
import org.example.backend.Repositories.AttendeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AttendeeService {

    @Autowired
    private AttendeeRepository attendeeRepository;

    public List<Attendee> getAllAttendees() {
        return attendeeRepository.findAll();
    }

    public Optional<Attendee> getAttendeeById(Long id) {
        return attendeeRepository.findById(id);
    }
    @Transactional
    public Attendee createAttendee(Attendee attendee) {
        return attendeeRepository.save(attendee);
    }

    public Attendee updateAttendee(Long id, Attendee updatedAttendee) {
        Attendee existingAttendee = attendeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Attendee not found with id: " + id));

        existingAttendee.setName(updatedAttendee.getName());
        existingAttendee.setEmail(updatedAttendee.getEmail());

        return attendeeRepository.save(existingAttendee);
    }

    @Transactional
    public void deleteAttendee(Long attendeeId) {
        Attendee attendee = attendeeRepository.findById(attendeeId).orElse(null);

        if (attendee != null) {
            // Remove attendee from events
            attendee.getEvents().forEach(event -> event.getAttendees().remove(attendee));

            // Clear attendee's events
            attendee.getEvents().clear();

            // Delete the attendee
            attendeeRepository.delete(attendee);
        }
    }
}

