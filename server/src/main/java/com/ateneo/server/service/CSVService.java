package com.ateneo.server.service;

import com.ateneo.server.domain.Donation;
import com.ateneo.server.domain.Donor;
import com.ateneo.server.domain.DonorDonation;
import com.ateneo.server.helper.CSVHelper;
import com.ateneo.server.repository.DonationRepository;
import com.ateneo.server.repository.DonorRepository;
import org.apache.xpath.operations.Mult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class CSVService {

    @Autowired
    DonorService donorService;

    @Autowired
    DonationService donationService;

    @Autowired
    DonorDonationService donorDonationService;

    public void saveDonor(MultipartFile file) {
        try {
            donorService.deleteAllDonors();
            List<Donor> donors = CSVHelper.csvToDonors(file.getInputStream());
            for (Donor donor: donors) {
                donorService.saveDonor(donor);
            }
        } catch (IOException e) {
            throw new RuntimeException("fail to store csv data: " + e.getMessage());
        }
    }

    public void saveDonation(MultipartFile file) {
        try {
            donationService.deleteAllDonations();
            List<Donation> donations = CSVHelper.csvToDonations(file.getInputStream());
            for (Donation donation: donations) {
                donationService.saveDonation(donation);
            }
        } catch (IOException e) {
            throw new RuntimeException("fail to store csv data: " + e.getMessage());
        }
    }

    public void saveConnection(MultipartFile file) {
        try {
            donorDonationService.deleteAllDonorDonations();
            List<DonorDonation> connections = CSVHelper.csvToConnections(file.getInputStream());
            for (DonorDonation connection: connections) {
                donorDonationService.saveDonorDonation(connection);
            }
        } catch (IOException e) {
            throw new RuntimeException("fail to store csv data: " + e.getMessage());
        }
    }

}
