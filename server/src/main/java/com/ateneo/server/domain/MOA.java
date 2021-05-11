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
public class MOA extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public MOA(Long id, String name, String foreignDonorAccountNumber, String files, String notes, Date dateSigned, Long connectionId) {
        this.id = id;
        this.name = name;
        this.foreignDonorAccountNumber = foreignDonorAccountNumber;
        this.files = files;
        this.notes = notes;
        this.dateSigned = dateSigned;
        this.connectionId = connectionId;
    }

    @ManyToOne
    @JoinColumn(name = "donor_id")
    @JsonIgnoreProperties({"moaList", "donorDonationList"})
    private Donor donor;

    private String name;
    private String foreignDonorAccountNumber;
    private String files;
    private String notes;
    private Date dateSigned;
    private Long connectionId;
}
