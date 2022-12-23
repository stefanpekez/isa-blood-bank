package com.example.isabloodbank.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "work_calendar")
public class WorkCalendar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "work_calendar_id")
    private Long id;

    @OneToOne
    private Center center;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "workCalendar")
    @JsonBackReference
    private List<Appointment> scheduledAppointments = new ArrayList<>();

}
