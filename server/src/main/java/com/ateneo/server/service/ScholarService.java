package com.ateneo.server.service;

import com.ateneo.server.domain.Scholar;
import com.ateneo.server.domain.Scholarship;
import com.ateneo.server.repository.ScholarRepository;
import com.ateneo.server.repository.ScholarshipRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class ScholarService {

    @Autowired
    private ScholarRepository scholarRepository;

    @Autowired
    private ScholarshipRepository scholarshipRepository;

    // Create
    public Scholar saveScholar(Scholar scholar) {
        Scholarship scholarship = scholarshipRepository.findById(scholar.getForeignScholarshipId()).orElse(null);
        scholar.setScholarship(scholarship);
        return scholarRepository.save(scholar);
    }

    // Read
    public List<Scholar> findAllScholarAsc() {
        return scholarRepository.findAllByOrderByIdAsc();
    }

    public List<Scholar> findAllScholarDesc() {
        return scholarRepository.findAllByOrderByIdDesc();
    }

    public Scholar findScholarById(Long id) {
        return scholarRepository.findById(id).orElse(null);
    }

    // Update
    public Scholar updateScholar(Scholar scholar) {
        Scholar existingScholar = scholarRepository.findById(scholar.getId()).orElse(null);
        Scholarship scholarship = scholarshipRepository.findById(scholar.getForeignScholarshipId()).orElse(null);

        existingScholar.setForeignScholarshipId(scholar.getForeignScholarshipId());
        existingScholar.setName(scholar.getName());
        existingScholar.setName(scholar.getCourse());
        existingScholar.setName(scholar.getBatchGraduated());

        return scholarRepository.save(existingScholar);
    }

    // Delete
    public String deleteScholar(Long id) {
        scholarRepository.deleteById(id);
        return "Successfully deleted scholar with id: " + id;
    }

    public String deleteAllScholars() {
        scholarRepository.deleteAll();
        return "Successfully deleted all scholars";
    }
}
