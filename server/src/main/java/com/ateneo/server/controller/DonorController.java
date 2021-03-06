package com.ateneo.server.controller;

import com.ateneo.server.domain.Donor;
import com.ateneo.server.service.DonorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DonorController {

    @Autowired
    private DonorService donorService;

    @PostMapping("/addDonor")
    public Donor addDonor(@RequestBody Donor donor) {
        return  donorService.saveDonor(donor);
    }

    @PostMapping("/addDonors")
    public List<Donor> addDonors(@RequestBody List<Donor> donors) {
        return  donorService.saveDonors(donors);
    }

    @GetMapping("/donors")
    public List<Donor> findAllDonors() {
        return donorService.getDonors();
    }

    @GetMapping("/donors/byname")
    public List<Donor> findAllDonorsByName() {
        return donorService.sortByNameAsc();
    }

    @GetMapping("/donor/{id}")
    public Donor findDonorById(@PathVariable  Long id) {
        return donorService.getDonorById(id);
    }

    @GetMapping("/donor/{accountName}")
    public Donor findDonorByAccountName(@PathVariable String accountName) {
        return donorService.getDonorByAccountName(accountName);
    }

    @DeleteMapping("/donors")
    public String deleteAllDonors() {
        return donorService.deleteAllDonors();
    }


}
