package com.ateneo.server.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Scholar extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long foreignScholarshipId;
    private String name;
    private String course;
    private String batchGraduated;

    public Scholar(Long id, Long foreignScholarshipId, String name, String course, String batchGraduated) {
        this.id = id;
        this.foreignScholarshipId = foreignScholarshipId;
        this.name = name;
        this.course = course;
        this.batchGraduated = batchGraduated;
    }

    @ManyToOne
    @JoinColumn(name = "scholarship_id")
    @JsonIgnoreProperties("scholars")
    Scholarship scholarship;

}
