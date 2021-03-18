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

    public List<Donation> saveDonation(Donation donation) {
       Donor donor = donorRepository.findById(donation.getDonorId()).orElse(null);

       donor.addDonation(donation);
       donationRepository.save(donation);
       return donor.getDonations();
    }

//    public List<Donation> saveDonation(DonorDonationContext donorDonationContext) {
//        Donor currentDonor = donorRepository.findById(donorDonationContext.getId()).orElse(null);
//
//        Donation donation = donorDonationContext.getDonation();
//        currentDonor.addDonation(donation);
//        donationRepository.save(donation);
//        return currentDonor.getDonations();
//    }

    public Donation updateDonation(Donation donation) {
        Donation currentDonation = donationRepository.findById(donation.getId()).orElse(null);
        currentDonation.setAccountNumber(donation.getAccountNumber());
        currentDonation.setAccountName(donation.getAccountName());
        currentDonation.setOrNumber(donation.getOrNumber());
        currentDonation.setDate(donation.getDate());
        currentDonation.setAmount(donation.getAmount());
        currentDonation.setNotes(donation.getNotes());
        return currentDonation;
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

    public List<Donation> addManyDonations(List<Donation> donations) {
        return donationRepository.saveAll(donations);
    }
}
