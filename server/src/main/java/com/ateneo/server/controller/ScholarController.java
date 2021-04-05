package com.ateneo.server.controller;

import com.ateneo.server.domain.Scholar;
import com.ateneo.server.domain.Scholarship;
import com.ateneo.server.service.ScholarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/scholar")
public class ScholarController {

    @Autowired
    private ScholarService scholarService;

    // Create
    @PostMapping("/add")
    public Scholar addScholar(@RequestBody Scholar scholar) {
        return scholarService.saveScholar(scholar);
    }

    // Read
    @GetMapping("/asc")
    public List<Scholar> getAllScholarsAsc() {
        return scholarService.findAllScholarAsc();
    }

    @GetMapping("/desc")
    public List<Scholar> getAllScholarsDesc() {
        return scholarService.findAllScholarDesc();
    }

    @GetMapping("{id}")
    public Scholar getScholarById(@PathVariable Long id) {
        return scholarService.findScholarById(id);
    }

    @GetMapping("ofscholarship/{scholarshipId}}")
    public List<Scholar> getScholarsOfScholarship(@PathVariable Long scholarshipId) {
        return scholarService.findScholarsOfScholarship(scholarshipId);
    }

    // Update
    @PatchMapping("/update")
    public Scholar updateScholar(@RequestBody Scholar scholar) {
        return scholarService.updateScholar(scholar);
    }

    // Delete
    @DeleteMapping("{id}")
    public String deleteScholarById(@PathVariable Long id) {
        return scholarService.deleteScholar(id);
    }

    @DeleteMapping
    public String deleteAllScholars() {
        return scholarService.deleteAllScholars();
    }
}
