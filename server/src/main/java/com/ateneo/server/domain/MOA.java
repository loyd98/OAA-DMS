package com.ateneo.server.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MOA extends Auditable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "donor_id")
    @JsonIgnoreProperties("moaList")
    private Donor donor;

    @ManyToOne
    @JoinColumn(name = "donation_id")
    @JsonIgnoreProperties("moaList")
    private Donation donation;

    private String name;
    private String donorAccountNumber;
    private Long foreignDonationId;
//    private MultipartFile file;
    private LocalDate dateSigned;
}
