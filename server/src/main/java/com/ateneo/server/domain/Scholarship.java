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

    @ManyToMany(mappedBy = "scholarships", fetch = FetchType.LAZY)
    @JsonIgnoreProperties("scholarships")
    private List<Donor> donors = new ArrayList<>();
}
