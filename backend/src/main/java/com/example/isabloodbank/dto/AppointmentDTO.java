package com.example.isabloodbank.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@Data
public class AppointmentDTO {
    private LocalDate scheduleTime;
    private Integer duration;
    private boolean isReserved;
    private LocalTime startTime;
}
