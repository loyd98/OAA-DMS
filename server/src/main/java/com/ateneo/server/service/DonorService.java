package com.ateneo.server.service;

import com.ateneo.server.domain.Donor;
import com.ateneo.server.repository.DonorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

 import java.util.List;

@Service
public class DonorService {

    @Autowired
    private DonorRepository donorRepository;

    //POST
    public Donor saveDonor(Donor donor) {
        return donorRepository.save(donor);
    }

    public List<Donor> saveDonors(List<Donor> donors) {

        return donorRepository.saveAll(donors);
    }

    //GET
    public List<Donor> getDonors() {
        return donorRepository.findAllByOrderByIdAsc();
    }

    public Donor getDonorById(Long id) {
        return donorRepository.findById(id).orElse(null);
    }

    public Donor getDonorByAccountName(String accountName) {
        return donorRepository.findByAccountName(accountName);
    }

    //DELETE
    public String deleteDonor(Long id) {
        donorRepository.deleteById(id);
        return "Donor removed! " + id;
    }

    public String deleteAllDonors() {
        donorRepository.deleteAll();
        return "All donors removed!";
    }

    //PUT
    public Donor updateDonor(Donor donor) {
        Donor existingDonor = donorRepository.findById(donor.getId()).orElse(null);
        existingDonor.setAccountNumber(donor.getAccountNumber());
        existingDonor.setAccountName(donor.getAccountName());
        existingDonor.setCompanyTIN(donor.getCompanyTIN());
        existingDonor.setCompanyAddress(donor.getCompanyAddress());
        existingDonor.setAddress1(donor.getAddress1());
        existingDonor.setAddress1(donor.getAddress2());
        existingDonor.setAddress3(donor.getAddress3());
        existingDonor.setAddress4(donor.getAddress4());
        existingDonor.setAddress5(donor.getAddress5());
        existingDonor.setPhone1(donor.getPhone1());
        existingDonor.setPhone2(donor.getPhone2());
        existingDonor.setFaxNumber(donor.getFaxNumber());
        existingDonor.setCellphoneNumber(donor.getCellphoneNumber());
        existingDonor.setEmailAddress(donor.getEmailAddress());
        existingDonor.setSalutation(donor.getSalutation());
        existingDonor.setBirthDate(donor.getBirthDate());
        existingDonor.setNotes(donor.getNotes());
        return donorRepository.save(existingDonor);
    }

    // Sort
    public List<Donor> sortByNameAsc() {
        return donorRepository.findAllByOrderByAccountNameAsc();
    }



}
