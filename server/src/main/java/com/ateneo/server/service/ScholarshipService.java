package com.ateneo.server.service;

import com.ateneo.server.domain.Donation;
import com.ateneo.server.domain.Scholar;
import com.ateneo.server.domain.Scholarship;
import com.ateneo.server.repository.DonationRepository;
import com.ateneo.server.repository.ScholarshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScholarshipService {

    @Autowired
    private ScholarshipRepository scholarshipRepository;

    @Autowired
    private DonationRepository donationRepository;

    // Create
    public Scholarship saveScholarship(Scholarship scholarship) {
        Donation donation = donationRepository.findDonationByConnectionId(scholarship.getForeignDonationId());
        scholarship.setDonation(donation);
        Scholarship savedScholarship = scholarshipRepository.save(scholarship);

        if (savedScholarship.getConnectionId() == null) {
            Long id = System.currentTimeMillis();
            savedScholarship.setConnectionId(id);
        }

        return scholarshipRepository.save(savedScholarship);
    }

    // Read
    public List<Scholarship> findAllScholarshipsAsc() {
        return scholarshipRepository.findAllByOrderByIdAsc();
    }

    public List<Scholarship> findAllScholarshipsDesc() {
        return scholarshipRepository.findAllByOrderByIdDesc();
    }

    public Scholarship findScholarshipById(Long id) {
        return scholarshipRepository.findById(id).orElse(null);
    }

    public List<Scholarship> findScholarshipsOfDonation(Long foreignDonationId) {
        return scholarshipRepository.findAllByForeignDonationId(foreignDonationId);
    }

    public List<Scholarship> findScholarshipsOfDonor(String donorAccountNumber) {
        return scholarshipRepository.findScholarshipsOfDonor(donorAccountNumber);
    }

    public List<Scholarship> findScholarshipsOfMoa(Long moaId) {
        return scholarshipRepository.findScholarshipsOfMoa(moaId);
    }

    public List<Scholarship> findScholarshipsOfScholar(Long scholarId) {
        return scholarshipRepository.findScholarshipsOfScholar(scholarId);
    }

    public List<Scholarship> searchScholarship(String keyword) {
        return scholarshipRepository.search(keyword);
    }

    // Update
    public Scholarship updateScholarship(Scholarship scholarship) {
        Scholarship existingScholarship = scholarshipRepository.findById(scholarship.getId()).orElse(null);
        Donation donation = donationRepository.findById(scholarship.getForeignDonationId()).orElse(null);

        existingScholarship.setScholarshipName(scholarship.getScholarshipName());
        existingScholarship.setTypeOfScholarship(scholarship.getTypeOfScholarship());
        existingScholarship.setDateEstablished(scholarship.getDateEstablished());
        existingScholarship.setCriteria(scholarship.getCriteria());
        existingScholarship.setForeignDonationId(scholarship.getForeignDonationId());
        existingScholarship.setDonation(donation);

        return scholarshipRepository.save(existingScholarship);
    }

    // Delete
    public String deleteScholarship(Long id) {
        Optional<Scholarship> scholarship = scholarshipRepository.findById(id);

        if (scholarship.isPresent()) {
            scholarship.get().removeAllScholars();
            scholarshipRepository.deleteById(scholarship.get().getId());
            return "Successfully deleted scholarship with id: " + id;
        }

        return "Delete unsuccessful";
    }

    public String deleteAllScholarships() {
        List<Scholarship> scholarships = scholarshipRepository.findAll();

        for (Scholarship scholarship: scholarships) {
            scholarship.removeAllScholars();
        }

        scholarshipRepository.deleteAll();
        return "Successfully deleted all scholarships";
    }

    public String truncateScholarships() {
        scholarshipRepository.truncate();
        return "Succesfully truncated scholarship table.";
    }

    // Create
//    public Scholarship saveScholarship(Scholarship scholarship) {
//        if (scholarship.getDonationId() != null) {
//            Donation donation = donationRepository.findById(scholarship.getDonationId()).orElseThrow(() -> new ResourceNotFoundException("Donation", "id", scholarship.getDonationId()));
//
//            scholarship.addDonation(donation);
//            Scholarship saveScholarship = scholarshipRepository.save(scholarship);
//            donation.addScholarship(saveScholarship);
//            donationRepository.save(donation);
//            return saveScholarship;
//        } else {
//            if (!ObjectUtils.isEmpty(scholarship.getDonations())) {
//                List<Donation> donations = new ArrayList<>();
//
//                for (Donation donation : scholarship.getDonations()) {
//                    donation.addScholarship(scholarship);
//                    donations.add(donationRepository.save(donation));
//                }
//
//                scholarship.setDonations(donations);
//            }
//
//            Scholarship saveScholarship = scholarshipRepository.save(scholarship);
//
//            return saveScholarship;
//        }
//    }
//
//    // Read
//    public List<Scholarship> getAllScholarshipsAsc() {
//        return scholarshipRepository.findAllByOrderByIdAsc();
//    }
//
//    public List<Scholarship> getAllScholarshipDesc() {
//        return scholarshipRepository.findAllByOrderByIdDesc();
//    }
//
//    public Scholarship getScholarshipById(Long id) {
//        return scholarshipRepository.findById(id).orElse(null);
//    }
//
//    public List<Donation> getAllDonationsFromScholarship(Long id) {
//        Scholarship scholarship = scholarshipRepository.findById(id).orElse(null);
//        List<Donation> donations = scholarship.getDonations();
//        Collections.sort(donations);
//        return donations;
//    }
//
//    // Update
//    public String deleteById(Long id) {
//        scholarshipRepository.deleteById(id);
//        return "Deleted scholarship id " + id;
//    }

}
