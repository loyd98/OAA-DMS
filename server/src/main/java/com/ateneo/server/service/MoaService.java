package com.ateneo.server.service;

import com.ateneo.server.domain.Donor;
import com.ateneo.server.domain.MOA;
import com.ateneo.server.domain.Scholar;
import com.ateneo.server.domain.Scholarship;
import com.ateneo.server.repository.DonorRepository;
import com.ateneo.server.repository.MoaRepository;
import com.ateneo.server.repository.ScholarRepository;
import com.ateneo.server.repository.ScholarshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MoaService {

    @Autowired
    private MoaRepository moaRepository;

    @Autowired
    private DonorRepository donorRepository;

    // Create
    public MOA saveMoa(MOA moa) {
        Donor donor = donorRepository.findDonorByAccountNumber(moa.getForeignDonorAccountNumber());
        moa.setDonor(donor);
        return moaRepository.save(moa);
    }

    // Read
    public List<MOA> findAllMoasAsc() {
        return moaRepository.findAllByOrderByIdAsc();
    }

    public List<MOA> findAllMoasDesc() {
        return moaRepository.findAllByOrderByIdDesc();
    }

    public MOA findMoaById(Long id) {
        return moaRepository.findById(id).orElse(null);
    }

    public List<MOA> findMoasOfDonor(String donorAccountNumber) {
        return moaRepository.findAllByForeignDonorAccountNumber(donorAccountNumber);
    }

    public List<MOA> findMoasOfDonation(Long donationId) {
        return moaRepository.findMoasOfDonation(donationId);
    }

    public List<MOA> findMoasOfScholar(Long scholarId) {
        return moaRepository.findMoasOfScholar(scholarId);
    }

    public List<MOA> searchMoa(String keyword) {
        return moaRepository.search(keyword);
    }

    // Update
    public MOA updateMoa(MOA moa) {
        MOA existingMoa = moaRepository.findById(moa.getId()).orElse(null);
        Donor donor = donorRepository.findDonorByAccountNumber(moa.getForeignDonorAccountNumber());

        existingMoa.setName(moa.getName());
        existingMoa.setDonor(donor);
        existingMoa.setForeignDonorAccountNumber(moa.getForeignDonorAccountNumber());
        existingMoa.setFiles(moa.getFiles());
        existingMoa.setNotes(moa.getNotes());
        existingMoa.setDateSigned(moa.getDateSigned());

        return moaRepository.save(existingMoa);
    }

    // Delete
    public String deleteMoa(Long id) {
        moaRepository.deleteById(id);
        return "Successfully deleted scholar with id: " + id;
    }

    public String deleteAllMoa() {
        moaRepository.deleteAll();
        return "Successfully deleted all scholars";
    }
}
