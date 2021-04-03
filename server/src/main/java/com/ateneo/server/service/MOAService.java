package com.ateneo.server.service;

import com.ateneo.server.domain.Donation;
import com.ateneo.server.domain.Donor;
import com.ateneo.server.domain.MOA;
import com.ateneo.server.repository.DonationRepository;
import com.ateneo.server.repository.DonorRepository;
import com.ateneo.server.repository.MOARepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MOAService {

    @Autowired
    private MOARepository moaRepository;

    @Autowired
    private DonorRepository donorRepository;

    @Autowired
    private DonationRepository donationRepository;

    // Create
    public MOA saveMoa(MOA moa) {
        Donor donor = donorRepository.findDonorByAccountNumber(moa.getDonorAccountNumber());
        Donation donation = donationRepository.findById(moa.getForeignDonationId()).orElse(null);

        moa.setDonor(donor);
        moa.setDonation(donation);

        donor.getMoaList().add(moa);
        donorRepository.save(donor);

        donation.getMoaList().add(moa);
        donorRepository.save(donor);
//
        return moaRepository.save(moa);
    }

    // Read
    public List<MOA> findAllMoasAsc() {
        return moaRepository.findAllByOrderByIdAsc();
    }

    public List<MOA> findAllMoasDesc() {
        return moaRepository.findAllByOrderByIdDesc();
    }

    public MOA findMoaById(Long id) {
        return moaRepository.findById(id).orElse(null);
    }

    // Update
    public MOA updateMoa(MOA moa) {
        MOA existingMoa = moaRepository.findById(moa.getId()).orElse(null);
        Donor donor = donorRepository.findDonorByAccountNumber(moa.getDonorAccountNumber());
        Donation donation = donationRepository.findById(moa.getForeignDonationId()).orElse(null);

        existingMoa.setName(moa.getName());
        existingMoa.setDateSigned(moa.getDateSigned());
        existingMoa.setDonorAccountNumber(moa.getDonorAccountNumber());
        existingMoa.setForeignDonationId(moa.getForeignDonationId());
        existingMoa.setDonor(donor);
        existingMoa.setDonation(donation);

        return moaRepository.save(existingMoa);
    }

    // Delete
    public String deleteMoa(Long id) {
        moaRepository.deleteById(id);
        return "Successfully deleted MOA with id: " + id;
    }

}
