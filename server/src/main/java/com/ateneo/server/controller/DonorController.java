package com.ateneo.server.controller;

import com.ateneo.server.domain.Donor;
import com.ateneo.server.service.DonorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DonorController {

    @Autowired
    private DonorService donorService;

    @PostMapping("/donor/add")
    public Donor addDonor(@RequestBody Donor donor) {
        return  donorService.saveDonor(donor);
    }

    @PostMapping("/donor/add/many")
    public List<Donor> addDonors(@RequestBody List<Donor> donors) {
        return  donorService.saveDonors(donors);
    }

    @GetMapping("/donor/asc")
    public List<Donor> findAllDonorsAsc() {
        return donorService.getDonorsAsc();
    }

    @GetMapping("/donor/desc")
    public List<Donor> findAllDonorsDesc() {
        return donorService.getDonorsDesc();
    }

    @GetMapping("/donor/account/asc")
    public List<Donor> sortAllByAccountNameAsc() {
        return donorService.getAllByAccountNameDesc();
    }

    @GetMapping("/donor/account/desc")
    public List<Donor> sortAllByAccountNameDesc() {
        return donorService.getAllByDonorNameDesc();
    }

    @GetMapping("/donor/name/asc")
    public List<Donor> sortAllByDonorNameAsc() {
        return donorService.getAllByDonorNameAsc();
    }

    @GetMapping("/donor/name/desc")
    public List<Donor> sortAllByDonorNameDesc () {
        return donorService.getAllByDonorNameDesc();
    }

    @GetMapping("/donor/id/{id}")
    public Donor findDonorById(@PathVariable  Long id) {
        return donorService.getDonorById(id);
    }

    @GetMapping("/donor/accname/{accountName}")
    public Donor findDonorByAccountName(@PathVariable String accountName) {
        return donorService.getDonorByAccountName(accountName);
    }

    @DeleteMapping(value = "/donor/delete/id", consumes = {"application/json"})
    public List<Donor> deleteDonorById(@RequestBody Long id) {
        donorService.deleteDonor(id);
        return donorService.getDonorsAsc();
    }

    @DeleteMapping("/donor")
    public String deleteAllDonors() {
        return donorService.deleteAllDonors();
    }

    @RequestMapping ("/donor/search")
    public List<Donor> search(Model model, @Param("keyword") String keyword) {
        model.addAttribute("keyword", keyword);
        return donorService.search(keyword);
    }

    @PatchMapping("/donor/update")
    public Donor updateDonor(@RequestBody Donor donor) {
        return donorService.updateDonor(donor);
    }

}
