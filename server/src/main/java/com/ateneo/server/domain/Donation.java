package com.ateneo.server.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table
public class Donation extends Auditable {
    @Id
    @GeneratedValue
    private Long id;
    private Long donorId;
    private Long scholarshipId;
    private String accountNumber;
    private String accountName;
    private String orNumber;
    private String date;
    private Double amount;
    private String notes;
//    private ArrayList<String> orFiles;
//    private ArrayList<String> tyFiles;
//    private ArrayList<String> codFiles;
    private String needCertificate;
    private String purposeOfDonation;

    @ManyToMany(mappedBy = "donations")
    @JsonIgnore
    private List<Donor> donors = new ArrayList<>();

    public void addDonor(Donor donor) {
        donors.add(donor);
    }
}
