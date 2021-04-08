package com.ateneo.server.controller;

import com.ateneo.server.domain.Donation;
import com.ateneo.server.domain.MOA;
import com.ateneo.server.service.MOAService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/moa")
public class MOAController {

    @Autowired
    private MOAService moaService;

    // Create
    @PostMapping("/add")
    public MOA addMOA(@RequestBody MOA moa) {
        return moaService.saveMoa(moa);
    }

    // Read
    @GetMapping("/asc")
    public List<MOA> getAllMoasASc() {
        return moaService.findAllMoasAsc();
    }

    @GetMapping("/desc")
    public List<MOA> getAllMoasDesc() {
        return moaService.findAllMoasDesc();
    }

    @GetMapping("/{id}")
    public MOA getMoaById(@PathVariable Long id) {
        return moaService.findMoaById(id);
    }

    @GetMapping("/search")
    public List<MOA> search(@RequestParam("q") String keyword) {
        return moaService.search(keyword);
    }

    @GetMapping("/ofdonor/{donorAccountNumber}")
    public List<MOA> getMoasOfDonor(@PathVariable String donorAccountNumber) {
        return moaService.findMoasOfDonor(donorAccountNumber);
    }

    @GetMapping("/ofdonation/{donationId}")
    public List<MOA> getMoasOfDonation(@PathVariable Long donationId) {
        return moaService.findMoasOfDonation(donationId);
    }

    @GetMapping("/ofscholarship/{scholarshipId}")
    public List<MOA> getMoasOfScholarship(@PathVariable Long scholarshipId) {
        return moaService.findMoasOfScholarship(scholarshipId);
    }

    // Update
    @PatchMapping("/update")
    public MOA updateMoa(@RequestBody MOA moa) {
        return moaService.updateMoa(moa);
    }

    // Delete
    @DeleteMapping("/{id}")
    public String deleteMoaById(@PathVariable Long id) {
        return moaService.deleteMoa(id);
    }

    @DeleteMapping
    public String deleteAllMoas() {
        return moaService.deleteAllMoas();
    }
}
