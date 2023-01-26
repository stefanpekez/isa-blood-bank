package com.example.isabloodbank.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String type;
    @Column
    private String note;
    @Column
    private Integer hemoglobin;
    @Column
    private Boolean permitted;
    @Column
    private Integer bbAmount;
    @Column
    private Long idAppointment;
}
