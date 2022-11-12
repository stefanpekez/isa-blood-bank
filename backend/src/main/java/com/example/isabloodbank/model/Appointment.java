package com.example.isabloodbank.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private LocalDate scheduledTime;

    @Column
    private Integer duration;

    @OneToMany
    private List<User> assignedStaff = new ArrayList<>();

    @OneToOne
    private User donator;

    @Column
    private boolean isReserved;
}
