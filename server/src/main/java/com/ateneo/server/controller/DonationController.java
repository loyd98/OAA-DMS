package com.ateneo.server.controller;

import com.ateneo.server.domain.Donation;
import com.ateneo.server.domain.Donor;
import com.ateneo.server.service.DonationService;
import com.ateneo.server.util.DonorDonationContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/donation")
public class DonationController {

    @Autowired
    private DonationService donationService;

    @GetMapping("/asc")
    public List<Donation> getAllDonationsAsc() {
        return donationService.getAllDonationsAsc();
    }

    // Not working
    @PostMapping("/add")
    public List<Donation> addDonation(@RequestBody DonorDonationContext donorDonationContext) {
        return donationService.saveDonation(donorDonationContext);
    }

    @PatchMapping("/update")
    public Donation updateDonation(@RequestBody Donation donation) {
        return donationService.updateDonation(donation);
    }

    @DeleteMapping(value = "/delete/id", consumes = {"application/json"})
    public List<Donation> deleteDonorById(@RequestBody Long id) {
        donationService.deleteDonation(id);
        return donationService.getAllDonationsAsc();
    }

}
