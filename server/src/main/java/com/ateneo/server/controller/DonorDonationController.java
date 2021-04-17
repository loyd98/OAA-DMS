package com.ateneo.server.controller;

import com.ateneo.server.domain.DonorDonation;
import com.ateneo.server.service.DonorDonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/connection")
public class DonorDonationController {

    @Autowired
    private DonorDonationService donorDonationService;

    // Create
    @PostMapping("/add")
    public DonorDonation addDonorDonation(@RequestBody DonorDonation donorDonation) {
        System.out.println(donorDonation.getForeignDonationId());
        System.out.println(donorDonation.getDonorAccountNumber());
        return donorDonationService.saveDonorDonation(donorDonation);
    }

    // Read
    @GetMapping("/asc")
    public List<DonorDonation> getAllDonorDonationsAsc() {
        return donorDonationService.findAllDonorDonationAsc();
    }

    @GetMapping("/desc")
    public List<DonorDonation> getAllDonorDonationsDesc() {
        return donorDonationService.findAllDonorDonationDesc();
    }

    @GetMapping("/{id}")
    public DonorDonation getDonorDonationById(@PathVariable Long id) {
        return donorDonationService.findDonorDonationById(id);
    }

    @GetMapping("/search")
    public List<DonorDonation> search(@RequestParam("q") String keyword) {
        return donorDonationService.search(keyword);
    }

    @GetMapping("/ofdonor/{donorAccountNumber}")
    public List<DonorDonation> getDonorDonationOfDonor(@PathVariable String donorAccountNumber) {
        return donorDonationService.findDonorDonationOfDonor(donorAccountNumber);
    }

    @GetMapping("/ofdonation/{donationId}")
    public List<DonorDonation> getDonorDonationOfDonation(@PathVariable Long donationId) {
        return donorDonationService.findDonorDonationOfDonation(donationId);
    }

    @GetMapping("/ofscholarship/{scholarshipId}")
    public List<DonorDonation> getDonorDonationOfScholarship(@PathVariable Long scholarshipId) {
        return donorDonationService.findDonorDonationOfScholarship(scholarshipId);
    }

    @GetMapping("/ofscholar/{scholarId}")
    public List<DonorDonation> getDonorDonationOfScholar(@PathVariable Long scholarId) {
        return donorDonationService.findDonorDonationOfScholar(scholarId);
    }

    // Update
    @PatchMapping("/update")
    public DonorDonation updateDonorDonation(@RequestBody DonorDonation donorDonation) {
        return donorDonationService.updateDonorDonation(donorDonation);
    }

    // Delete
    @DeleteMapping("/{id}")
    public String deleteDonorDonationById(@PathVariable Long id) {
        return donorDonationService.deleteDonorDonation(id);
    }

    @DeleteMapping
    public String deleteAllDonorDonation() {
        return donorDonationService.deleteAllDonorDonations();
    }
}
