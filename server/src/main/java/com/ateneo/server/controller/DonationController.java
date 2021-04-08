package com.ateneo.server.controller;

import com.ateneo.server.domain.Donation;
import com.ateneo.server.domain.Donor;
import com.ateneo.server.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/donation")
public class DonationController {

    @Autowired
    private DonationService donationService;

    // Create
    @PostMapping("/add")
    public Donation addDonation(@Valid @RequestBody Donation donation) {
        return donationService.saveDonation(donation);
    }

    // Read
    @GetMapping("/asc")
    public List<Donation> getAllDonationsAsc() {
        return donationService.findAllDonationsAsc();
    }

    @GetMapping("/desc")
    public List<Donation> getAllDonationsDesc() {
        return donationService.findAllDonationsDesc();
    }

    @GetMapping("/{id}")
    public Donation getDonationById(@PathVariable Long id) {
        return donationService.findDonationById(id);
    }

    @GetMapping ("/search")
    public List<Donation> search(@RequestParam("q") String keyword) {
        return donationService.searchDonation(keyword);
    }

    @GetMapping("/ofdonor/{accountNumber}")
    public List<Donation> getDonationsOfDonor(@PathVariable String accountNumber) {
        return donationService.findDonationsOfDonor(accountNumber);
    }

    @GetMapping("/ofmoa/{moaId}")
    public List<Donation> getDonationsOfMoa(@PathVariable Long moaId) {
        return donationService.findDonationsOfMoa(moaId);
    }

    @GetMapping("/ofscholarship/{scholarshipId}")
    public List<Donation> getDonationOfScholarship(@PathVariable Long scholarshipId) {
        return donationService.findDonationOfScholarship(scholarshipId);
    }

    // Update
    @PatchMapping("/update")
    public Donation updateDonation(@RequestBody Donation donation) {
        return donationService.updateDonation(donation);
    }

    // Delete
    @DeleteMapping("/{id}")
    public String deleteDonationById(@PathVariable Long id) {
        return donationService.deleteDonation(id);
    }

    @DeleteMapping
    public String deleteAllDonations() {
        return donationService.deleteAllDonations();
    }

//    @PostMapping("/add")
//    public Donation addDonation(@Valid @RequestBody Donation donation) {
//    	System.out.println(donation);
//        return donationService.saveDonation(donation);
//    }
//
//    @PostMapping("/add/many")
//    public List<Donation> addDonations(@RequestBody List<Donation> donations) {
//        return donationService.saveDonations(donations);
//    }
//
//    // Read
//    @GetMapping("/asc")
//    public List<Donation> getAllDonationsAsc() {
//        return donationService.getAllDonationsAsc();
//    }
//
//    @GetMapping("/desc")
//    public List<Donation> getAllDonationsDesc() {return donationService.getAllDonationsDesc();}
//
//    @GetMapping("/{id}")
//    public Donation getDonationById(@PathVariable Long id) {
//        return donationService.getDonationById(id);
//    }
//
//    @GetMapping("/donors/{id}")
//    public List<Donor> getDonorsOfDonation(@PathVariable Long id) {
//        return donationService.getDonorsFromDonation(id);
//    }
//
//    @GetMapping ("/search")
//    public List<Donation> search(Model model, @RequestParam("q") String keyword) {
//        model.addAttribute("keyword", keyword);
//        return donationService.search(keyword);
//    }
//
//    // Update
//    @PatchMapping("/update")
//    public Donation updateDonation(@RequestBody Donation donation) {
//        return donationService.updateDonation(donation);
//    }
//
//    // Delete
//    @DeleteMapping("/{id}")
//    public List<Donation> deleteDonorById(@PathVariable Long id) {
//        donationService.deleteDonation(id);
//        return donationService.getAllDonationsAsc();
//    }

}
