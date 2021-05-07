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
public class Scholarship extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String scholarshipName;
    private String typeOfScholarship;
    private Date dateEstablished;
    private String Criteria;
    private Long foreignDonationId;

    public Scholarship(Long id, String scholarshipName, String typeOfScholarship, Date dateEstablished, String criteria, Long foreignDonationId) {
        this.id = id;
        this.scholarshipName = scholarshipName;
        this.typeOfScholarship = typeOfScholarship;
        this.dateEstablished = dateEstablished;
        Criteria = criteria;
        this.foreignDonationId = foreignDonationId;
    }

    @ManyToOne
    @JoinColumn(name = "donation_id")
    @JsonIgnoreProperties({"scholarships", "donorDonationList"})
    Donation donation;

    @OneToMany(mappedBy = "scholarship")
    List<Scholar> scholars = new ArrayList<>();

    public void removeScholar(Scholar scholar) {
        this.getScholars().remove(scholar);
        scholar.setScholarship(null);
        scholar.setForeignScholarshipId(null);
    }

    public void removeAllScholars() {
        for (Scholar scholar: new ArrayList<>(scholars)) {
            removeScholar(scholar);
        }
    }

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
