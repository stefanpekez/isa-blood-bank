package com.example.isabloodbank.dto;

import com.example.isabloodbank.model.Appointment;
import com.example.isabloodbank.model.Center;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class CenterAppointmentDTO {
    private Center center;
    private Appointment appointment;
}
