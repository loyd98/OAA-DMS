package com.ateneo.server.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
public class Scholarship extends Auditable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long donationId;
    private String donorAccountNumber;
    private String scholarshipName;
    private String typeOfScholarship;
    private String dateEstablished;
    private String Criteria;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "scholarship_donation",
            joinColumns = @JoinColumn(name = "scholarship_id"),
            inverseJoinColumns = @JoinColumn(name = "donation_id")
    )
    private List<Donation> donations = new ArrayList<>();

    public void addDonation(Donation donation) {
        this.donations.add(donation);
    }
}
