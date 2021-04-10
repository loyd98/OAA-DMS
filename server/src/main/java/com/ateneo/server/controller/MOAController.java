package com.ateneo.server.controller;

import com.ateneo.server.domain.Donation;
import com.ateneo.server.domain.MOA;
import com.ateneo.server.service.MOAService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/moa")
public class MOAController {

    @Autowired
    private MOAService moaService;

    // Create
    @PostMapping("/add")
    public MOA addMOA(MOA moa, @RequestParam(required = false) MultipartFile file) throws IOException {
        return moaService.saveMoa(moa, file);
    }

    // Read
    @GetMapping("/asc")
    public List<MOA> getAllMoasAsc() {
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

    @GetMapping("/ofscholar/{scholarId}")
    public List<MOA> getMoasOfScholar(@PathVariable Long scholarId) {
        return moaService.findMoasOfScholar(scholarId);
    }

    @GetMapping("download/{moaId}/{fileName}")
    public ResponseEntity downloadMoa(@PathVariable Long moaId, @PathVariable String fileName) {
        return moaService.downloadMoa(moaId, fileName);
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
