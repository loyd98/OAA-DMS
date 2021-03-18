package com.ateneo.server.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table
public class Donor extends Auditable{
    @Id
    @GeneratedValue
    private Long id;
    private String donorName;
    private String accountNumber;
    private String accountName;
    private String companyTIN;
    private String companyAddress;
    private String address1;
    private String address2;
    private String address3;
    private String address4;
    private String address5;
    private String phone1;
    private String phone2;
    private String faxNumber;
    private String cellphoneNumber;
    private String emailAddress;
    private String salutation;
    private String birthDate;
    private String notes;

    @ManyToMany()
    @JoinTable(
            name = "donor_donation",
            joinColumns = @JoinColumn(name = "donor_id"),
            inverseJoinColumns = @JoinColumn(name = "donation_id")
    )
    private List<Donation> donations = new ArrayList<>();

    public void addDonation(Donation donation) {
        donations.add(donation);
    }
}
