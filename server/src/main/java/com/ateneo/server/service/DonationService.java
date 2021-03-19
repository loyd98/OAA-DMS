package com.ateneo.server.service;

import com.ateneo.server.domain.Donation;
import com.ateneo.server.domain.Donor;
import com.ateneo.server.repository.DonationRepository;
import com.ateneo.server.repository.DonorRepository;
import com.ateneo.server.util.DonorDonationContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DonationService {

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private DonorRepository donorRepository;

    public List<Donation> getAllDonationsAsc() {
        return donationRepository.findAllByOrderByIdAsc();
    }

    public List<Donation> getAllDonationsDesc() {
        return donationRepository.findAllByOrderByIdDesc();
    }

    public List<Donation> saveDonation(Donation donation) {
        Donor donor = donorRepository.findById(donation.getDonorId()).orElse(null);

        donor.addDonation(donation);
        donationRepository.save(donation);
        return donor.getDonations();
    }

    public String deleteDonation(Long id) {
        donationRepository.deleteById(id);
        return "Donation removed " + id;
    }

    public Donation getDonationById(Long id) {
        return donationRepository.findById(id).orElse(null);
    }

    public List<Donor> getDonorsWithDonation(Long id) {
        Donation donation = donationRepository.findById(id).orElse(null);
        return donation.getDonors();
    }

    public List<Donation> saveDonations(List<Donation> donations) {
        return donationRepository.saveAll(donations);
    }

    public Donation updateDonation(Donation donation) {
        Donation existingDonation = donationRepository.findById(donation.getId()).orElse(null);
        existingDonation.setAccountNumber(donation.getAccountNumber());
        existingDonation.setAccountName(donation.getAccountName());
        existingDonation.setScholarshipId(donation.getScholarshipId());
        existingDonation.setDonorId(donation.getDonorId());
        existingDonation.setOrNumber(donation.getOrNumber());
        existingDonation.setDate(donation.getDate());
        existingDonation.setAmount(donation.getAmount());
        existingDonation.setNotes(donation.getNotes());
        existingDonation.setNeedCertificate(donation.getNeedCertificate());
        existingDonation.setPurposeOfDonation(donation.getPurposeOfDonation());
    }
}
