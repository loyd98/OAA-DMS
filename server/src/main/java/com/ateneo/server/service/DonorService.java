package com.ateneo.server.service;

import com.ateneo.server.domain.Donor;
import com.ateneo.server.domain.DonorDonation;
import com.ateneo.server.domain.MOA;
import com.ateneo.server.repository.DonorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DonorService {

    @Autowired
    private DonorRepository donorRepository;

    // Create
    public Donor saveDonor(Donor donor) {
        Donor savedDonor = donorRepository.save(donor);

        if (savedDonor.getConnectionId() == null) {
            Long id = System.currentTimeMillis();
            savedDonor.setConnectionId(id);
        }

        return donorRepository.save(savedDonor);
    }

    // Read
    public List<Donor> findAllDonorsAsc() {
        return donorRepository.findAllByOrderByIdAsc();
    }

    public List<Donor> findAllDonorsDesc() {
        return donorRepository.findAllByOrderByIdDesc();
    }

    public Donor findDonorById(Long id) {
        return donorRepository.findById(id).orElse(null);
    }

    public List<Donor> searchDonor(String keyword) {
        return donorRepository.search(keyword);
    }

    public List<Donor> findDonorsOfDonation(Long donationId) {
        return donorRepository.findDonorsOfDonation(donationId);
    }

    public List<Donor> findDonorsOfMoa(Long moaId) {
        return donorRepository.findDonorsOfMoa(moaId);
    }

    public List<Donor> findDonorsOfScholarship(Long scholarshipId) {
        return donorRepository.findDonorsOfScholarship(scholarshipId);
    }

    public List<Donor> findDonorsOfScholar(Long scholarId) {
        return donorRepository.findDonorsOfScholar(scholarId);
    }

    // Update
    public Donor updateDonor(Donor donor) {
        Donor existingDonor = donorRepository.findById(donor.getId()).orElse(null);

        existingDonor.setAccountNumber(donor.getAccountNumber());
        existingDonor.setAccountName(donor.getAccountName());
        existingDonor.setSalutation(donor.getSalutation());
        existingDonor.setDonorName(donor.getDonorName());
        existingDonor.setCellphoneNumber(donor.getCellphoneNumber());
        existingDonor.setEmailAddress(donor.getEmailAddress());
        existingDonor.setCompanyTIN(donor.getCompanyTIN());
        existingDonor.setPhone1(donor.getPhone1());
        existingDonor.setPhone2(donor.getPhone2());
        existingDonor.setFaxNumber(donor.getFaxNumber());
        existingDonor.setAddress1(donor.getAddress1());
        existingDonor.setAddress2(donor.getAddress2());
        existingDonor.setAddress3(donor.getAddress3());
        existingDonor.setAddress4(donor.getAddress4());
        existingDonor.setAddress5(donor.getAddress5());
        existingDonor.setCompanyAddress(donor.getCompanyAddress());
        existingDonor.setBirthDate(donor.getBirthDate());
        existingDonor.setNotes(donor.getNotes());

        for (DonorDonation donorDonation: existingDonor.getDonorDonationList()) {
            donorDonation.setDonorAccountNumber(donor.getAccountNumber());
        }

        return donorRepository.save(existingDonor);
    }

    // Delete
    public String deleteDonor(Long id) {
        Optional<Donor> donor = donorRepository.findById(id);

        if (donor.isPresent()) {
            donor.get().removeDonorDonations();
            donorRepository.deleteById(donor.get().getId());
            return "Successfully deleted donor with account number: " + id;
        }

        return "Delete unsuccessful";
    }

    public String deleteAllDonors() {
        List<Donor> donors = donorRepository.findAll();

        for (Donor donor: donors) {
            donor.removeDonorDonations();
        }

        donorRepository.deleteAll();
        return "Successfully deleted all donors.";
    }

    public String truncateDonors() {
        donorRepository.truncate();
        return "Successfully truncated donor table.";
    }

//    public Donor saveDonor(Donor donor)
//    {
//        if (donor.getDonationId() != null)
//        {
//            Donation donation = donationRepository.findById(donor.getDonationId()).orElseThrow(()
//            								-> new ResourceNotFoundException("Donation", "account number", donor.getDonationId()));
//
//            donor.addDonation(donation);
//            Donor saveDonor = donorRepository.save(donor);
//
//            donation.getDonors().add(saveDonor);
//            donationRepository.save(donation);
//
//    		return saveDonor;
//        }
//        else
//    	{
//    		if(!ObjectUtils.isEmpty(donor.getDonations()))
//    		{
//    			List<Donation> donations = new ArrayList<>();
//
//    			for (Donation donation : donor.getDonations()) {
//    				donation.getDonors().add(donor);
//    				donations.add(donationRepository.save(donation));
//    			}
//    			donor.setDonations(donations);
//    		}
//
//    		Donor saveDonor =  donorRepository.save(donor);
//
//    		return saveDonor;
//    	}
//    }
//
//    public List<Donor> saveDonors(List<Donor> donors) {
//
//        return donorRepository.saveAll(donors);
//    }
//
//    //GET
//    public List<Donor> getDonorsAsc() {
//        return donorRepository.findAllByOrderByIdAsc();
//    }
//
//    public List<Donor> getDonorsDesc() {
//        return donorRepository.findAllByOrderByIdDesc();
//    }
//
//    public Donor getDonorById(Long id) {
//        return donorRepository.findById(id).orElse(null);
//    }
//
//    //DELETE
//    public String deleteDonor(Long id) {
//        donorRepository.deleteById(id);
//        return "Donor removed! " + id;
//    }
//
//    public String deleteAllDonors() {
//        donorRepository.deleteAll();
//        return "All donors removed!";
//    }
//
//    // Update
//    public Donor updateDonor(Donor donor) {
//        Donor existingDonor = donorRepository.findById(donor.getId()).orElse(null);
//        existingDonor.setDonorName(donor.getDonorName());
//        existingDonor.setAccountNumber(donor.getAccountNumber());
//        existingDonor.setAccountName(donor.getAccountName());
//        existingDonor.setCompanyTIN(donor.getCompanyTIN());
//        existingDonor.setCompanyAddress(donor.getCompanyAddress());
//        existingDonor.setAddress1(donor.getAddress1());
//        existingDonor.setAddress1(donor.getAddress2());
//        existingDonor.setAddress3(donor.getAddress3());
//        existingDonor.setAddress4(donor.getAddress4());
//        existingDonor.setAddress5(donor.getAddress5());
//        existingDonor.setPhone1(donor.getPhone1());
//        existingDonor.setPhone2(donor.getPhone2());
//        existingDonor.setFaxNumber(donor.getFaxNumber());
//        existingDonor.setCellphoneNumber(donor.getCellphoneNumber());
//        existingDonor.setEmailAddress(donor.getEmailAddress());
//        existingDonor.setSalutation(donor.getSalutation());
//        existingDonor.setBirthDate(donor.getBirthDate());
//        existingDonor.setNotes(donor.getNotes());
//        return donorRepository.save(existingDonor);
//    }
//
//    // Read
//    public List<Donor> getAllByAccountNameAsc() {
//        return donorRepository.findAllByOrderByAccountNameAsc();
//    }
//
//    public List<Donor> getAllByAccountNameDesc() { return donorRepository.findAllByOrderByAccountNameDesc();}
//
//    public List<Donor> getAllByDonorNameAsc() {
//        return donorRepository.findAllByOrderByDonorNameAsc();
//    }
//
//    public List<Donor> getAllByDonorNameDesc() {
//        return donorRepository.findAllByOrderByDonorNameDesc();
//    }
//
//    // Search
//    public List<Donor> search(String keyword) {
//        if (keyword != null) {
//            return donorRepository.search(keyword);
//        }
//
//        return donorRepository.findAll();
//    }
//
//    public List<Donation> getAllDonationsFromDonor(Long id) {
//        Donor donor = donorRepository.findById(id).orElse(null);
//        List<Donation> donations = donor.getDonations();
//        Collections.sort(donations);
//        return donations;
//    }
}
