package com.ateneo.server.controller;

import com.ateneo.server.domain.Donation;
import com.ateneo.server.domain.Donor;
import com.ateneo.server.service.DonorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/donor")
public class DonorController {

    @Autowired
    private DonorService donorService;

    // Create
    @PostMapping("/add")
    public Donor addDonor(@Valid @RequestBody Donor donor) {
        return donorService.saveDonor(donor);
    }

    // Read
    @GetMapping("/asc")
    public List<Donor> getAllDonorsAsc() {
        return donorService.findAllDonorsAsc();
    }

    @GetMapping("/desc")
    public List<Donor> getAllDonorsDesc() {
        return donorService.findAllDonorsDesc();
    }

    @GetMapping("/{id}")
    public Donor getDonorById(@PathVariable Long id) {
        return donorService.findDonorById(id);
    }

    @GetMapping ("/search")
    public List<Donor> search(@RequestParam("q") String keyword) {
        return donorService.searchDonor(keyword);
    }

    @GetMapping("/ofdonation/{donationId}")
    public List<Donor> getDonorsOfDonation(@PathVariable Long donationId) {
        return donorService.findDonorsOfDonation(donationId);
    }

    @GetMapping("/ofmoa/{moaId}")
    public List<Donor> getDonorsOfMoa(@PathVariable Long moaId) {
        return donorService.findDonorsOfMoa(moaId);
    }

    @GetMapping("/ofscholarship/{scholarshipId}")
    public List<Donor> getDonorsOfScholarship(@PathVariable Long scholarshipId) {
        return donorService.findDonorsOfScholarship(scholarshipId);
    }

    @GetMapping("/ofscholar/{scholarId}")
    public List<Donor> getDonorsOfScholar(@PathVariable Long scholarId) {
        return donorService.findDonorsOfScholar(scholarId);
    }

    // Update
    @PatchMapping("/update")
    public Donor updateDonor(@RequestBody Donor donor) {
        return donorService.updateDonor(donor);
    }

    // Delete
    @DeleteMapping("/{id}")
    public String deleteDonorById(@PathVariable Long id) {
        return donorService.deleteDonor(id);
    }

    @DeleteMapping
    public String deleteAllDonors() {
        return donorService.deleteAllDonors();
    }


//    // Create
//    @PostMapping("/add")
//    public Donor addDonor(@Valid  @RequestBody Donor donor) {
//        return  donorService.saveDonor(donor);
//    }
//
//    @PostMapping("add/many")
//    public List<Donor> addDonors(@RequestBody List<Donor> donors) {
//        return  donorService.saveDonors(donors);
//    }
//
//    // Read
//    @GetMapping("/asc")
//    public List<Donor> getAllDonorsAsc() {
//        return donorService.getDonorsAsc();
//    }
//
//    @GetMapping("/desc")
//    public List<Donor> getAllDonorsDesc() {
//        return donorService.getDonorsDesc();
//    }
//
//    @GetMapping("/{id}")
//    public Donor getDonorById(@PathVariable Long id) {
//        return donorService.getDonorById(id);
//    }
//
//    @GetMapping ("/search")
//    public List<Donor> search(Model model, @RequestParam("q") String keyword) {
//        model.addAttribute("keyword", keyword);
//        return donorService.search(keyword);
//    }
//
//    @GetMapping("/donations/{id}")
//    public List<Donation> getDonationsOfDonor(@PathVariable Long id) {
//        return donorService.getAllDonationsFromDonor(id);
//    }
//
//    // Update
//    @PatchMapping("/update")
//    public Donor updateDonor(@RequestBody Donor donor) {
//        return donorService.updateDonor(donor);
//    }
//
//    // Delete
//    @DeleteMapping("/{id}")
//    public List<Donor> deleteDonorById(@PathVariable Long id) {
//        donorService.deleteDonor(id);
//        return donorService.getDonorsAsc();
//    }
//
//    @DeleteMapping("/")
//    public String deleteAllDonors() {
//        return donorService.deleteAllDonors();
//    }
//

}
