package com.ateneo.server.controller;

import com.ateneo.server.domain.Donation;
import com.ateneo.server.domain.Donor;
import com.ateneo.server.service.DonorService;
import com.ateneo.server.util.DonorDonationContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/donor")
public class DonorController {

    @Autowired
    private DonorService donorService;

    @PostMapping("/add")
    public Donor addDonor(@RequestBody Donor donor) {
        return  donorService.saveDonor(donor);
    }

    @PostMapping("add/many")
    public List<Donor> addDonors(@RequestBody List<Donor> donors) {
        return  donorService.saveDonors(donors);
    }

    @GetMapping("/asc")
    public List<Donor> getAllDonorsAsc() {
        return donorService.getDonorsAsc();
    }

    @GetMapping("/desc")
    public List<Donor> getAllDonorsDesc() {
        return donorService.getDonorsDesc();
    }

    @GetMapping("/account/asc")
    public List<Donor> getAllByAccountNameAsc() {
        return donorService.getAllByAccountNameAsc();
    }

    @GetMapping("/account/desc")
    public List<Donor> getAllByAccountNameDesc() {
        return donorService.getAllByAccountNameDesc();
    }

    @GetMapping("/name/asc")
    public List<Donor> getAllByDonorNameAsc() {
        return donorService.getAllByDonorNameAsc();
    }

    @GetMapping("/name/desc")
    public List<Donor> getAllByDonorNameDesc () {
        return donorService.getAllByDonorNameDesc();
    }

    @GetMapping("/{id}")
    public Donor getDonorById(@PathVariable Long id) {
        return donorService.getDonorById(id);
    }

    @GetMapping("/accname/{accountName}")
    public Donor getDonorByAccountName(@PathVariable String accountName) {
        return donorService.getDonorByAccountName(accountName);
    }

    @DeleteMapping(value = "/{id}")
    public List<Donor> deleteDonorById(@PathVariable Long id) {
        donorService.deleteDonor(id);
        return donorService.getDonorsAsc();
    }

    @DeleteMapping("/")
    public String deleteAllDonors() {
        return donorService.deleteAllDonors();
    }

    @GetMapping ("/search")
    public List<Donor> search(Model model, @RequestParam("q") String keyword) {
        model.addAttribute("keyword", keyword);
        return donorService.search(keyword);
    }

    @PatchMapping("/update")
    public Donor updateDonor(@RequestBody Donor donor) {
        return donorService.updateDonor(donor);
    }

    @GetMapping("/donations/{id}")
    public List<Donation> getDonationsOfDonor(@PathVariable Long id) {
        return donorService.getAllDonationsFromDonor(id);
    }

}
