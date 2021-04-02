package com.ateneo.server.service;

import com.ateneo.server.domain.Donation;
import com.ateneo.server.domain.Scholarship;
import com.ateneo.server.exception.ResourceNotFoundException;
import com.ateneo.server.repository.DonationRepository;
import com.ateneo.server.repository.ScholarshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class ScholarshipService {

    @Autowired
    private ScholarshipRepository scholarshipRepository;

    @Autowired
    private DonationRepository donationRepository;

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
