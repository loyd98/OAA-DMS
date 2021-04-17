package com.ateneo.server.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DonorDonation extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "donor_id")
    @JsonIgnoreProperties("donorDonationList")
    private Donor donor;

    @ManyToOne
    @JoinColumn(name = "donation_id")
    @JsonIgnoreProperties("donorDonationList")
    private Donation donation;

    private String notes;
    private String donorAccountNumber;
    private Long foreignDonationId;
}
