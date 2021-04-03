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

    // Update

    // Delete

    @DeleteMapping("/{id}")
    public String deleteMoaById(@PathVariable Long id) {
        return moaService.deleteMoa(id);
    }

}
