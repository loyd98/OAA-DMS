package com.ateneo.server.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@NotBlank(message = "Cannot have an empty donor ID field.")
    private Long donorId;
    private Long scholarshipId;

    @NotBlank(message = "Cannot have an empty account number field.")
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

    @ManyToMany(mappedBy = "donations", fetch = FetchType.LAZY)    
    @JsonIgnoreProperties("donations")
    private List<Donor> donors = new ArrayList<>();

    public void addDonor(Donor donor) {
        donors.add(donor);
    }
    
    public List<Donor> getDonors() {
		return donors;
	}

	public void setDonors(List<Donor> donors) {
		this.donors = donors;
	}
}
