package org.example.backend.Services;

import jakarta.persistence.EntityNotFoundException;
import org.example.backend.Entities.Organizer;
import org.example.backend.Repositories.OrganizerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrganizerService {

    @Autowired
    private OrganizerRepository organizerRepository;

    public List<Organizer> getAllOrganizers() {
        return organizerRepository.findAll();
    }

    public Optional<Organizer> getOrganizerById(Long id) {
        return organizerRepository.findById(id);
    }

    public Organizer createOrganizer(Organizer organizer) {
        return organizerRepository.save(organizer);
    }

    public Organizer updateOrganizer(Long id, Organizer updatedOrganizer) {
        Organizer existingOrganizer = organizerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Organizer not found with id: " + id));


        existingOrganizer.setName(updatedOrganizer.getName());
        existingOrganizer.setEmail(updatedOrganizer.getEmail());

        return organizerRepository.save(existingOrganizer);
    }

    public void deleteOrganizer(Long id) {
        organizerRepository.deleteById(id);
    }
}
