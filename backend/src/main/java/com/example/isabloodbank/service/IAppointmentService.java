package com.example.isabloodbank.service;

import com.example.isabloodbank.dto.AppointmentDTO;
import com.example.isabloodbank.model.Appointment;

import java.util.List;

public interface IAppointmentService {

    AppointmentDTO create(AppointmentDTO appointmentDTO, Long id) throws Exception;
    List<Appointment> getAll();
    List<Appointment> getAllByCenter(long id);
}
