package com.ateneo.server.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Donor extends Auditable implements Comparable<Donor>{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Cannot have an empty account number field.")
    private String accountNumber;
    private String accountName;
    private String salutation;
    private String donorName;
    private String cellphoneNumber;
    private String emailAddress;
    private String companyTIN;
    private String phone1;
    private String phone2;
    private String faxNumber;
    private String address1;
    private String address2;
    private String address3;
    private String address4;
    private String address5;
    private String companyAddress;
    private Date birthDate;
    private String notes;
    private Long idCopy;

    public Donor(Long id, @NotBlank(message = "Cannot have an empty account number field.") String accountNumber, String accountName, String salutation, String donorName, String cellphoneNumber, String emailAddress, String companyTIN, String phone1, String phone2, String faxNumber, String address1, String address2, String address3, String address4, String address5, String companyAddress, Date birthDate, String notes, Long idCopy) {
        this.id = id;
        this.accountNumber = accountNumber;
        this.accountName = accountName;
        this.salutation = salutation;
        this.donorName = donorName;
        this.cellphoneNumber = cellphoneNumber;
        this.emailAddress = emailAddress;
        this.companyTIN = companyTIN;
        this.phone1 = phone1;
        this.phone2 = phone2;
        this.faxNumber = faxNumber;
        this.address1 = address1;
        this.address2 = address2;
        this.address3 = address3;
        this.address4 = address4;
        this.address5 = address5;
        this.companyAddress = companyAddress;
        this.birthDate = birthDate;
        this.notes = notes;
        this.idCopy = idCopy;
    }

    @OneToMany(mappedBy = "donor")
    List<DonorDonation> donorDonationList = new ArrayList<>();

    @OneToMany(mappedBy = "donor")
    List<MOA> moaList = new ArrayList<>();

    public void removeDonorDonation(DonorDonation donorDonation) {
        this.getDonorDonationList().remove(donorDonation);
        donorDonation.setDonor(null);
        donorDonation.setDonorAccountNumber(null);
    }

    public void removeDonorDonations() {
        for (DonorDonation donorDonation: new ArrayList<>(donorDonationList)) {
            removeDonorDonation(donorDonation);
        }
    }

    @Override
    public int compareTo(Donor anotherDonor) {
        return this.getAccountNumber().compareTo(anotherDonor.getAccountNumber());
    }
}
