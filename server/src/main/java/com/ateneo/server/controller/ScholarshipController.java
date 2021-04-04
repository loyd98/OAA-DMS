package com.ateneo.server.controller;

import com.ateneo.server.domain.Donation;
import com.ateneo.server.domain.Scholarship;
import com.ateneo.server.service.ScholarshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/scholarship")
public class ScholarshipController {

    @Autowired
    private ScholarshipService scholarshipService;

    // Create
    @PostMapping("/add")
    public Scholarship addScholarship(@RequestBody Scholarship scholarship) {
        return scholarshipService.saveScholarship(scholarship);
    }

    // Read
    @GetMapping("/asc")
    public List<Scholarship> getScholarshipAsc() {
        return scholarshipService.findAllScholarshipsAsc();
    }

    @GetMapping("/desc")
    public List<Scholarship> getScholarshipDesc() {
        return scholarshipService.findAllScholarshipsDesc();
    }

    @GetMapping("{id}")
    public Scholarship getScholarshipById(@PathVariable Long id) {
        return scholarshipService.findScholarshipById(id);
    }

    // Update
    @PatchMapping("/update")
    public Scholarship updateScholarship(@RequestBody Scholarship scholarship) {
        return scholarshipService.updateScholarship(scholarship);
    }

    // Delete
    @DeleteMapping("{id}")
    public String deleteScholarshipById(@PathVariable Long id) {
        return scholarshipService.deleteScholarship(id);
    }

    @DeleteMapping
    public String deleteAllScholarships() {
        return scholarshipService.deleteAllScholarships();
    }

    // Create
//    @PostMapping("/add")
//    public Scholarship addScholarship(@RequestBody Scholarship scholarship) {
//        return scholarshipService.saveScholarship(scholarship);
//    }
//
//    // Read
//    @GetMapping("/asc")
//    public List<Scholarship> getAllScholarshipAsc() {
//        return scholarshipService.getAllScholarshipsAsc();
//    }
//
//    @GetMapping("/desc")
//    public List<Scholarship> getAllScholarshipDesc() {
//        return scholarshipService.getAllScholarshipDesc();
//    }
//
//    @GetMapping("/{id}")
//    public Scholarship getScholarshipById(@PathVariable Long id) {
//        return scholarshipService.getScholarshipById(id);
//    }
//
//    @GetMapping("/donations/{id}")
//    public List<Donation> getDonationsFromScholarship(@PathVariable Long id) {
//        return scholarshipService.getAllDonationsFromScholarship(id);
//    }
//
//    // Update
//
//    // Delete
//    @DeleteMapping("/{id}")
//    public String deleteScholarshipById(@PathVariable Long id) {
//        return scholarshipService.deleteById(id);
//    }
//

}
