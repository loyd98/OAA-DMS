package com.ateneo.server.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
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
    private String donorName;
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
    private LocalDate birthDate;
    private String notes;

    @OneToMany(mappedBy = "donor")
    List<MOA> moaList = new ArrayList<>();

    @Override
    public int compareTo(Donor anotherDonor) {
        return this.getAccountNumber().compareTo(anotherDonor.getAccountNumber());
    }

}
