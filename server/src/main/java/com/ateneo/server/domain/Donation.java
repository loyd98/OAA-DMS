package com.ateneo.server.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Donation extends Auditable implements Comparable<Donation> {
   
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Cannot have an empty account number field.")
    private String accountNumber;
    private String accountName;
    private String orNumber;
    private String date;
    private Double amount;
    private String notes;
    private String needCertificate;
    private String purposeOfDonation;
//    private MultipartFile orFiles;
//    private MultipartFile tyFiles;
//    private MultipartFile codFiles;

    @OneToMany(mappedBy = "donation")
    List<MOA> moaList = new ArrayList<>();

    @Override
    public int compareTo(Donation anotherDonation) {
        return this.getId().compareTo(anotherDonation.getId());
    }
}
