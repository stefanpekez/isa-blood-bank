package com.example.isabloodbank.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private User fromUser;

    @Column
    private String description;

    @OneToOne
    private Center aimedCenter;

    @Column
    private boolean isForCenter;

    @OneToOne
    private User aimedUser;

    @Column
    private String response;
}
