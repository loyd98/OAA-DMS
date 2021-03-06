package com.ateneo.server.service;

import com.ateneo.server.domain.Donation;
import com.ateneo.server.domain.Donor;
import com.ateneo.server.domain.DonorDonation;
import com.ateneo.server.domain.MOA;
import com.ateneo.server.repository.DonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class DonationService {

    @Autowired
    private DonationRepository donationRepository;

    // Create
    public Donation saveDonation(Donation donation) {
        Donation savedDonation = donationRepository.save(donation);

        if (savedDonation.getConnectionId() == null) {
            Long id = System.currentTimeMillis();
            savedDonation.setConnectionId(id);
        }

        return donationRepository.save(savedDonation);
    }

    // Read
    public List<Donation> findAllDonationsAsc() {
        return donationRepository.findAllByOrderByIdAsc();
    }

    public List<Donation> findAllDonationsDesc() {
        return donationRepository.findAllByOrderByIdDesc();
    }

    public Donation findDonationById(Long id) {
        return donationRepository.findById(id).orElse(null);
    }

    public List<Donation> searchDonation(String keyword) {
        return donationRepository.search(keyword);
    }

    public List<Donation> findDonationsOfDonor(String accountNumber) {
        return donationRepository.findDonationsOfDonor(accountNumber);
    }

    public List<Donation> findDonationsOfMoa(Long moaId) {
        return donationRepository.findDonationsOfMoa(moaId);
    }

    public List<Donation> findDonationOfScholarship(Long scholarshipId) {
        return donationRepository.findDonationOfScholarship(scholarshipId);
    }

    public List<Donation> findDonationOfScholar(Long scholarId) {
        return donationRepository.findDonationOfScholar(scholarId);
    }

    // Update
    public Donation updateDonation(Donation donation) {
        Donation existingDonation = donationRepository.findById(donation.getId()).orElse(null);
        existingDonation.setAccountNumber(donation.getAccountNumber());
        existingDonation.setAccountName(donation.getAccountName());
        existingDonation.setOrNumber(donation.getOrNumber());
        existingDonation.setDate(donation.getDate());
        existingDonation.setAmount(donation.getAmount());
        existingDonation.setNotes(donation.getNotes());
        existingDonation.setNeedCertificate(donation.getNeedCertificate());
        existingDonation.setPurposeOfDonation(donation.getPurposeOfDonation());
        existingDonation.setOrFiles(donation.getOrFiles());
        existingDonation.setTyFiles(donation.getTyFiles());
        existingDonation.setCodFiles(donation.getCodFiles());

        for (DonorDonation donorDonation: donation.getDonorDonationList()) {
            donorDonation.setDonorAccountNumber(donation.getAccountNumber());
        }

        return donationRepository.save(existingDonation);
    }

    // Delete
    public String deleteDonation(Long id) {
        Optional<Donation> donation = donationRepository.findById(id);

        if (donation.isPresent()) {
            donation.get().removeDonorDonations();
            donation.get().removeScholarships();
            donationRepository.deleteById(donation.get().getId());
            return "Successfully deleted donation with id: " + id;
        }

        return "Delete unsuccessful";
    }

    public String deleteAllDonations() {
        List<Donation> donations = donationRepository.findAll();

        for (Donation donation: donations) {
            donation.removeDonorDonations();
            donation.removeScholarships();
        }

        donationRepository.deleteAll();
        return "Successfully deleted all donations";
    }

    public String truncateDonations() {
        donationRepository.truncate();
        return "Successfully truncated donation table";
    }

    // Export
    public List<String> findAllYears() {
        return donationRepository.findAllYears();
    }

    public List<Donation> findDonationsOfAll() {
        return donationRepository.findDonationsOfAll();
    }

    public List<Donation> findDonationsOfYear(String year) {
        return donationRepository.findDonationsOfYear(year);
    }

    public Double findTotalOfAll() {
        return donationRepository.getTotal();
    }

    public Double findTotalOfYear(String year) {
        return donationRepository.getTotalOfYear(year);
    }

//    public List<Donation> getAllDonationsAsc() {
//        return donationRepository.findAllByOrderByIdAsc();
//    }
//
//    public List<Donation> getAllDonationsDesc() {
//        return donationRepository.findAllByOrderByIdDesc();
//    }
//
//    public Donation saveDonation(Donation donation)
//    {
//        if (donation.getDonorAccountNumber() != null && donation.getScholarshipId() != null)
//        {
//            Donor donor = donorRepository.findByAccountNumber(donation.getDonorAccountNumber()).orElseThrow(()
//                    -> new ResourceNotFoundException("Donor", "account number", donation.getDonorAccountNumber()));
//
//            Scholarship scholarship = scholarshipRepository.findById(donation.getScholarshipId()).orElseThrow(()
//                    -> new ResourceNotFoundException("Scholarship", "id", donation.getScholarshipId()));
//
//            donation.addDonor(donor);
//            donation.addScholarship(scholarship);
//
//            Donation saveDonation = donationRepository.save(donation);
//            donor.getDonations().add(saveDonation);
//            scholarship.addDonation(saveDonation);
//            donorRepository.save(donor);
//            scholarshipRepository.save(scholarship);
//            return saveDonation;
//        }
//    	else if (donation.getDonorAccountNumber() != null)
//    	{
//    		Donor donor = donorRepository.findByAccountNumber(donation.getDonorAccountNumber()).orElseThrow(()
//									-> new ResourceNotFoundException("Donor", "account number", donation.getDonorAccountNumber()));
//
//    		donation.addDonor(donor); // Add donor to donation
//    		Donation saveDonation = donationRepository.save(donation); // Save donation
//    		donor.getDonations().add(saveDonation); // Add donation to donor
//    		donorRepository.save(donor); // Save donor?
//
//    		return saveDonation;
//    	}
//    	else if (donation.getScholarshipId() != null)
//        {
//            Scholarship scholarship = scholarshipRepository.findById(donation.getScholarshipId()).orElseThrow(()
//                    -> new ResourceNotFoundException("Scholarship", "id", donation.getScholarshipId()));
//
//            donation.addScholarship(scholarship);
//            Donation saveDonation = donationRepository.save(donation);
//            scholarship.addDonation(saveDonation);
//            scholarshipRepository.save(scholarship);
//            return saveDonation;
//        }
//    	else
//    	{
//    		if(!ObjectUtils.isEmpty(donation.getDonors()))
//    		{
//    			List<Donor> donors = new ArrayList<>();
//
//    			for (Donor donor : donation.getDonors()) {
//        			donor.getDonations().add(donation);
//        			donors.add(donorRepository.save(donor));
//    			}
//	    		//donation.getDonors().addAll(donors);
//	    		donation.setDonors(donors);
//    		}
//
//    		Donation saveDonation = donationRepository.save(donation);
//
//    		return saveDonation;
//    	}
//    }
//
//    public List<Donation> saveDonations(List<Donation> donations) {
//        List<Donation> savedDonations = new ArrayList<>();
//
//        for  (Donation donation: donations) {
//            savedDonations.add(saveDonation(donation));
//        }
//
//        return savedDonations;
//    }
//
//    public String deleteDonation(Long id) {
//        donationRepository.deleteById(id);
//        return "Donation removed " + id;
//    }
//
//    public Donation getDonationById(Long id) {
//        return donationRepository.findById(id).orElse(null);
//    }
//
//    public List<Donor> getDonorsFromDonation(Long id) {
//        Donation donation = donationRepository.findById(id).orElse(null);
//        List<Donor> donors = donation.getDonors();
//        Collections.sort(donors);
//        return donors;
//    }
//
//    public Donation updateDonation(Donation donation) {
//        Donation existingDonation = donationRepository.findById(donation.getId()).orElse(null);
//        existingDonation.setAccountNumber(donation.getAccountNumber());
//        existingDonation.setAccountName(donation.getAccountName());
//        existingDonation.setOrNumber(donation.getOrNumber());
//        existingDonation.setDate(donation.getDate());
//        existingDonation.setAmount(donation.getAmount());
//        existingDonation.setNotes(donation.getNotes());
//        existingDonation.setNeedCertificate(donation.getNeedCertificate());
//        existingDonation.setPurposeOfDonation(donation.getPurposeOfDonation());
//
//        if (donation.getDonorAccountNumber() != null) {
//            // Get donor connected to old donation
//            Donor donor = donorRepository.findByAccountNumber(existingDonation.getDonorAccountNumber()).orElseThrow(() ->
//                    new ResourceNotFoundException("Donor", "account number", existingDonation.getDonorAccountNumber()));
//
//            // Disconnect old donation;
//            donor.getDonations().removeIf(obj -> obj.getId() == existingDonation.getId());
//
//            // Save changes
//            donorRepository.save(donor);
//
//            // Find new donor with new donation's account number
//            Donor newDonor = donorRepository.findByAccountNumber(donation.getDonorAccountNumber()).orElseThrow(() ->
//                    new ResourceNotFoundException("Donor", "account", donation.getDonorAccountNumber()));
//
//            // Connect new donation to new donor
//            newDonor.getDonations().add(donation);
//
//            // Save changes
//            donorRepository.save(newDonor);
//
//            // Set the new account number
//            existingDonation.setDonorAccountNumber(donation.getDonorAccountNumber());
//        }
//
//        if (donation.getScholarshipId() != null) {
//
//            if (existingDonation.getScholarshipId() != null) {
//                Scholarship scholarship = scholarshipRepository.findById(existingDonation.getScholarshipId()).orElseThrow(() ->
//                        new ResourceNotFoundException("Scholarship", "id", existingDonation.getScholarshipId()));
//
//                scholarship.getDonations().removeIf(obj -> obj.getId() == existingDonation.getId());
//                scholarshipRepository.save(scholarship);
//            }
//
//            Scholarship newScholarship = scholarshipRepository.findById(donation.getScholarshipId()).orElseThrow(() ->
//                    new ResourceNotFoundException("Scholarship", "id", donation.getId()));
//            newScholarship.getDonations().add(donation);
//            scholarshipRepository.save(newScholarship);
//            existingDonation.setScholarshipId(donation.getScholarshipId());
//        }
//
//
//        return donationRepository.save(existingDonation);
//    }
//
//    // Search
//    public List<Donation> search(String keyword) {
//        if (keyword != null) {
//            return donationRepository.search(keyword);
//        }
//
//        return donationRepository.findAll();
//    }
}
