package com.ateneo.server.service;

import com.ateneo.server.domain.*;
import com.ateneo.server.helper.CSVHelper;
import com.ateneo.server.repository.DonationRepository;
import com.ateneo.server.repository.DonorRepository;
import org.apache.xpath.operations.Mult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.swing.text.html.parser.Entity;
import javax.transaction.Transactional;
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

    @Autowired
    MoaService moaService;

    @Autowired
    ScholarService scholarService;

    @Autowired
    ScholarshipService scholarshipService;

    @Autowired
    DocumentService documentService;

    public void saveDonor(MultipartFile file) {
        try {
            donorService.truncateDonors();
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
            donationService.truncateDonations();
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
            donorDonationService.truncateDonorDonations();
            List<DonorDonation> connections = CSVHelper.csvToConnections(file.getInputStream());
            for (DonorDonation connection: connections) {
                donorDonationService.saveDonorDonation(connection);
            }
        } catch (IOException e) {
            throw new RuntimeException("fail to store csv data: " + e.getMessage());
        }
    }

    public void saveMoa(MultipartFile file) {
        try {
            moaService.truncateMoas();
            List<MOA> moas = CSVHelper.csvToMoas(file.getInputStream());
            for (MOA moa: moas) {
                moaService.saveMoa(moa);
            }
        } catch (IOException e) {
            throw new RuntimeException("fail to store csv data: " + e.getMessage());
        }
    }

    public void saveScholarship(MultipartFile file) {
        try {
            scholarService.truncateScholars();
            List<Scholarship> scholarships = CSVHelper.csvToScholarships(file.getInputStream());
            for (Scholarship scholarship: scholarships) {
                scholarshipService.saveScholarship(scholarship);
            }
        } catch (IOException e) {
            throw new RuntimeException("fail to store csv data: " + e.getMessage());
        }
    }

    public void saveScholar(MultipartFile file) {
        try {
            scholarService.truncateScholars();
            List<Scholar> scholars = CSVHelper.csvToScholars(file.getInputStream());
            for (Scholar scholar: scholars) {
                scholarService.saveScholar(scholar);
            }
        } catch (IOException e) {
            throw new RuntimeException("fail to store csv data: " + e.getMessage());
        }
    }

    public void saveDocument(MultipartFile file) {
        try {
            documentService.truncateDocuments();
            List<Document> documents = CSVHelper.csvToDocuments(file.getInputStream());
            for (Document document: documents) {
                documentService.saveDocument(document);
            }
        } catch (IOException e) {
            throw new RuntimeException("fail to store csv data: " + e.getMessage());
        }
    }

}
