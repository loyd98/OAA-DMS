package com.ateneo.server.service;

import com.ateneo.server.domain.Scholar;
import com.ateneo.server.domain.Scholarship;
import com.ateneo.server.repository.ScholarRepository;
import com.ateneo.server.repository.ScholarshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScholarService {

    @Autowired
    private ScholarRepository scholarRepository;

    @Autowired
    private ScholarshipRepository scholarshipRepository;

    // Create
    public Scholar saveScholar(Scholar scholar) {
        Scholarship scholarship = scholarshipRepository.findScholarshipByConnectionId(scholar.getForeignScholarshipId());
        scholar.setScholarship(scholarship);
        Scholar savedScholar = scholarRepository.save(scholar);

        if (savedScholar.getConnectionId() == null) {
            savedScholar.setConnectionId(savedScholar.getId());
        }

        return scholarRepository.save(savedScholar);
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

    public List<Scholar> findScholarsOfDonor(String donorAccountNumber) {
        return scholarRepository.findScholarsOfDonor(donorAccountNumber);
    }

    public List<Scholar> findScholarsOfDonation(Long donationId) {
        return scholarRepository.findScholarsOfDonation(donationId);
    }

    public List<Scholar> findScholarsOfMoa(Long moaId) {
        return scholarRepository.findScholarsOfMoa(moaId);
    }

    public List<Scholar> findScholarsOfScholarship(Long scholarshipId) {
        return scholarRepository.findAllByForeignScholarshipId(scholarshipId);
    }

    public List<Scholar> searchScholar(String keyword) {
        return scholarRepository.search(keyword);
    }

    // Update
    public Scholar updateScholar(Scholar scholar) {
        Scholar existingScholar = scholarRepository.findById(scholar.getId()).orElse(null);
        Scholarship scholarship = scholarshipRepository.findById(scholar.getForeignScholarshipId()).orElse(null);

        existingScholar.setScholarship(scholarship);
        existingScholar.setForeignScholarshipId(scholar.getForeignScholarshipId());
        existingScholar.setName(scholar.getName());
        existingScholar.setCourse(scholar.getCourse());
        existingScholar.setBatchGraduated(scholar.getBatchGraduated());

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

    public String truncateScholars() {
        scholarRepository.truncate();
        return "Successfully truncated scholar table";
    }
}
