package com.ateneo.server.service;

import com.ateneo.server.domain.Donation;
import com.ateneo.server.domain.Donor;
import com.ateneo.server.domain.MOA;
import com.ateneo.server.repository.DonationRepository;
import com.ateneo.server.repository.DonorRepository;
import com.ateneo.server.repository.MOARepository;
import org.apache.tomcat.util.file.ConfigurationSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
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
    public MOA saveMoa(MOA moa, MultipartFile file) throws IOException {
        MOA savedMoa = null;

        if (moa.getDonorAccountNumber() != null) {
            Donor donor = donorRepository.findDonorByAccountNumber(moa.getDonorAccountNumber());
            moa.setDonor(donor);
        }

        if (moa.getForeignDonationId() != null) {
            Donation donation = donationRepository.findById(moa.getForeignDonationId()).orElse(null);
            moa.setDonation(donation);
        }

        if (file != null) {
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            moa.setFileName(fileName);
            savedMoa = moaRepository.save(moa);

            String uploadDir = "./moaFiles/" + savedMoa.getId();

            Path uploadPath = Paths.get(uploadDir);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            try (InputStream inputStream = file.getInputStream()) {
                Path filePath = uploadPath.resolve(fileName);
                Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException e) {
                throw new IOException("Could now save uploaded file " + fileName);
            }
        } else {
            savedMoa = moaRepository.save(moa);
        }

        return savedMoa;
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

    public List<MOA> findMoasOfDonor(String donorAccountNumber) {
        return moaRepository.findAllByDonorAccountNumber(donorAccountNumber);
    }

    public List<MOA> findMoasOfDonation(Long donationId) {
        return moaRepository.findAllByForeignDonationId(donationId);
    }

    public List<MOA> findMoasOfScholarship(Long scholarshipId) {
        return moaRepository.findMoasOfScholarship(scholarshipId);
    }

    public List<MOA> findMoasOfScholar(Long scholarId) {
        return moaRepository.findMoasOfScholar(scholarId);
    }

    public List<MOA> search(String keyword) {
        return moaRepository.search(keyword);
    }
    public ResponseEntity downloadMoa(Long moaId, String fileName) {
        String uploadDir = "./moaFiles/" + moaId;
        Path uploadPath = Paths.get(uploadDir);
        Path filePath = uploadPath.resolve(fileName);
        Resource resource = null;
        String contentType = null;

        try {
            resource = new UrlResource(filePath.toUri());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        try {
            contentType = Files.probeContentType(filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
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

    public String deleteAllMoas() {
        moaRepository.deleteAll();
        return "Successfully deleted all MOAs";
    }

}
