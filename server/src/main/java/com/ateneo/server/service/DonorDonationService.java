package com.ateneo.server.service;

import com.ateneo.server.domain.Donation;
import com.ateneo.server.domain.Donor;
import com.ateneo.server.domain.DonorDonation;
import com.ateneo.server.domain.MOA;
import com.ateneo.server.repository.DonationRepository;
import com.ateneo.server.repository.DonorRepository;
import com.ateneo.server.repository.DonorDonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class DonorDonationService {

    @Autowired
    private DonorDonationRepository donorDonationRepository;

    @Autowired
    private DonorRepository donorRepository;

    @Autowired
    private DonationRepository donationRepository;

    // Create
    public DonorDonation saveDonorDonation(DonorDonation donorDonation) {
        if (donorDonation.getDonorAccountNumber() != null) {
            Donor donor = donorRepository.findDonorByAccountNumber(donorDonation.getDonorAccountNumber());
            donorDonation.setDonor(donor);
        }

        if (donorDonation.getForeignDonationId() != null) {
            Donation donation = donationRepository.findDonationByConnectionId(donorDonation.getForeignDonationId());
            donorDonation.setDonation(donation);
        }

        DonorDonation savedDonorDonation = donorDonationRepository.save(donorDonation);

        if (savedDonorDonation.getConnectionId() == null) {
            savedDonorDonation.setConnectionId(savedDonorDonation.getId());
        }

        return donorDonationRepository.save(savedDonorDonation);
    }

    // Read
    public List<DonorDonation> findAllDonorDonationAsc() {
        return donorDonationRepository.findAllByOrderByIdAsc();
    }

    public List<DonorDonation> findAllDonorDonationDesc() {
        return donorDonationRepository.findAllByOrderByIdDesc();
    }

    public DonorDonation findDonorDonationById(Long id) {
        return donorDonationRepository.findById(id).orElse(null);
    }

    public List<DonorDonation> findDonorDonationOfDonor(String donorAccountNumber) {
        return donorDonationRepository.findAllByDonorAccountNumber(donorAccountNumber);
    }

    public List<DonorDonation> findDonorDonationOfDonation(Long donationId) {
        return donorDonationRepository.findAllByForeignDonationId(donationId);
    }

    public List<DonorDonation> findDonorDonationOfScholarship(Long scholarshipId) {
        return donorDonationRepository.findDonorDonationOfScholarship(scholarshipId);
    }

    public List<DonorDonation> findDonorDonationOfScholar(Long scholarId) {
        return donorDonationRepository.findDonorDonationOfScholar(scholarId);
    }

    public List<DonorDonation> search(String keyword) {
        return donorDonationRepository.search(keyword);
    }

    // Update
    public DonorDonation updateDonorDonation(DonorDonation donorDonation) {
        DonorDonation existingDonorDonation = donorDonationRepository.findById(donorDonation.getId()).orElse(null);
        Donor donor = donorRepository.findDonorByAccountNumber(donorDonation.getDonorAccountNumber());
        Donation donation = donationRepository.findById(donorDonation.getForeignDonationId()).orElse(null);

        existingDonorDonation.setNotes(donorDonation.getNotes());
        existingDonorDonation.setDonorAccountNumber(donorDonation.getDonorAccountNumber());
        existingDonorDonation.setForeignDonationId(donorDonation.getForeignDonationId());
        existingDonorDonation.setDonor(donor);
        existingDonorDonation.setDonation(donation);

        return donorDonationRepository.save(existingDonorDonation);
    }

    // Delete
    public String deleteDonorDonation(Long id) {
        donorDonationRepository.deleteById(id);
        return "Successfully deleted MOA with id: " + id;
    }

    public String deleteAllDonorDonations() {
        donorDonationRepository.deleteAll();
        return "Successfully deleted all MOAs";
    }

    public String truncateDonorDonations() {
        donorDonationRepository.truncate();
        return "Successfully truncated donor_donation table.";
    }

}
