package com.ateneo.server.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
public class Document extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String files;
    private String notes;
    private Long connectionId;

    public Document(Long id, String name, String files, String notes, Long connectionId) {
        this.id = id;
        this.name = name;
        this.files = files;
        this.notes = notes;
        this.connectionId = connectionId;
    }
}
