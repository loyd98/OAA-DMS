package com.ateneo.server.service;

import com.ateneo.server.domain.Donation;
import com.ateneo.server.domain.Donor;
import com.ateneo.server.domain.MOA;
import com.ateneo.server.exception.ResourceNotFoundException;
import com.ateneo.server.repository.DonationRepository;
import com.ateneo.server.repository.DonorRepository;
import com.ateneo.server.repository.MOARepository;
import lombok.extern.apachecommons.CommonsLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@CommonsLog
public class SyncService {

    @Autowired
    private DonorRepository donorRepository;

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private MOARepository moaRepository;

    public void syncDonorMoaDonation() {
        List<Donor> donors = donorRepository.findAll();
        List<Donation> donations = donationRepository.findAll();
        List<MOA> moas = moaRepository.findAll();

        for (MOA moa: moas) {
            Donor donor = donorRepository.findById(moa.getDonor().getId()).orElseThrow(() ->
                    new ResourceNotFoundException("Donor", "id", moa.getDonor().getId()));
            Donation donation = donationRepository.findById(moa.getDonation().getId()).orElseThrow(() ->
                    new ResourceNotFoundException("Donor", "id", moa.getDonation().getId()));

            moa.setDonor(donor);
            moa.setDonation(donation);

            donor.getMoaList().add(moa);
            donation.getMoaList().add(moa);

            moaRepository.save(moa);
        }
    }
}
