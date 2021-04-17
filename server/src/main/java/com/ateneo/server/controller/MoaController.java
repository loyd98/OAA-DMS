package com.ateneo.server.controller;

import com.ateneo.server.domain.MOA;
import com.ateneo.server.domain.Scholar;
import com.ateneo.server.service.MoaService;
import com.ateneo.server.service.ScholarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/moa")
public class MoaController {

    @Autowired
    private MoaService moaService;

    // Create
    @PostMapping("/add")
    public MOA addMoa(@RequestBody MOA moa) {
        return moaService.saveMoa(moa);
    }

    // Read
    @GetMapping("/asc")
    public List<MOA> getAllScholarsAsc() {
        return moaService.findAllMoasAsc();
    }

    @GetMapping("/desc")
    public List<MOA> getAllScholarsDesc() {
        return moaService.findAllMoasDesc();
    }

    @GetMapping("{id}")
    public MOA getScholarById(@PathVariable Long id) {
        return moaService.findMoaById(id);
    }

    @GetMapping("/ofdonor/{donorAccountNumber}")
    public List<MOA> getMoasOfDonor(@PathVariable String donorAccountNumber) {
        return moaService.findMoasOfDonor(donorAccountNumber);
    }

    @GetMapping("/ofdonation/{donationId}")
    public List<MOA> getMoasOfDonation(@PathVariable Long donationId) {
        return moaService.findMoasOfDonation(donationId);
    }

    @GetMapping("/ofscholar/{scholarId}")
    public List<MOA> getMoasOfScholar(@PathVariable Long scholarId) {
        return moaService.findMoasOfScholar(scholarId);
    }

    @GetMapping("/search")
    public List<MOA> search(@RequestParam("q") String keyword) {
        return moaService.searchMoa(keyword);
    }

    // Update
    @PatchMapping("/update")
    public MOA updateScholar(@RequestBody MOA moa) {
        return moaService.updateMoa(moa);
    }

    // Delete
    @DeleteMapping("{id}")
    public String deleteScholarById(@PathVariable Long id) {
        return moaService.deleteMoa(id);
    }

    @DeleteMapping
    public String deleteAllScholars() {
        return moaService.deleteAllMoa();
    }
}
