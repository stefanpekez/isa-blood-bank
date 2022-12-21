package com.example.isabloodbank.service;

import com.example.isabloodbank.dto.AppointmentDTO;
import com.example.isabloodbank.model.Appointment;

public interface IAppointmentService {

    AppointmentDTO create(AppointmentDTO appointmentDTO);
}
