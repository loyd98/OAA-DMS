package com.ateneo.server.service;

import com.ateneo.server.domain.Donation;
import com.ateneo.server.domain.Donor;
import com.ateneo.server.exception.ResourceNotFoundException;
import com.ateneo.server.repository.DonationRepository;
import com.ateneo.server.repository.DonorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
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

    public Donation saveDonation(Donation donation) 
    {
    	if (donation.getDonorId()!= null)
    	{
    		Donor donor = donorRepository.findById(donation.getDonorId()).orElseThrow(()
									-> new ResourceNotFoundException("Donor", "id", donation.getDonorId()));
    		
    		donation.addDonor(donor);    		
    		Donation saveDonation = donationRepository.save(donation);
    		donor.getDonations().add(saveDonation);
    		donorRepository.save(donor);
    		return saveDonation;
    	}     
    	else
    	{
    		if(!ObjectUtils.isEmpty(donation.getDonors()))
    		{    			
    			List<Donor> donors = new ArrayList<>();    			
    			
    			for (Donor donor : donation.getDonors()) {
        			donor.getDonations().add(donation);
        			donors.add(donorRepository.save(donor));
    			}	    		
	    		//donation.getDonors().addAll(donors);	
	    		donation.setDonors(donors);	
    		}
    		
    		Donation saveDonation = donationRepository.save(donation);
    		
    		return saveDonation;
    	}
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
        return donationRepository.save(donation);
    }

    // Search
    public List<Donation> search(String keyword) {
        if (keyword != null) {
            return donationRepository.search(keyword);
        }

        return donationRepository.findAll();
    }
}
