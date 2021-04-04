package com.ateneo.server.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;
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
    private String scholarshipName;
    private String typeOfScholarship;
    private Date dateEstablished;
    private String Criteria;

    private Long foreignDonationId;

    @ManyToOne
    @JoinColumn(name = "donation_id")
    @JsonIgnoreProperties("scholarships")
    Donation donation;

//    @ManyToMany(fetch = FetchType.LAZY)
//    @JoinTable(
//            name = "scholarship_donation",
//            joinColumns = @JoinColumn(name = "scholarship_id"),
//            inverseJoinColumns = @JoinColumn(name = "donation_id")
//    )
//    private List<Donation> donations = new ArrayList<>();
//
//    public void addDonation(Donation donation) {
//        this.donations.add(donation);
//    }
}
