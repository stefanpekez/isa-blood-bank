package com.example.isabloodbank.model;

import com.example.isabloodbank.model.enums.AppointmentStatus;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "appointment")
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
    @JoinColumn(name="donator_id")
    private User donator;

    @Column
    private boolean isReserved;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "work_calendar_id")
    private WorkCalendar workCalendar;

    private String description;

    private AppointmentStatus status;

    @Column
    private LocalTime startTime;
}
