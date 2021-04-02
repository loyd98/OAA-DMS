package com.ateneo.server.controller;

import com.ateneo.server.service.SyncService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sync")
public class SyncController {

    @Autowired
    private SyncService syncService;

    @GetMapping("")
    public String syncDonorMoaDonation() {
        syncService.syncDonorMoaDonation();
        return "Donor, MOA, and Donation are synced.";
    }
}
