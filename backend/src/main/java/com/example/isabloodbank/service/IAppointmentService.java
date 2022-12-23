package com.example.isabloodbank.service;

import com.example.isabloodbank.dto.AppointmentDTO;
import com.example.isabloodbank.dto.CenterAppointmentDTO;
import com.example.isabloodbank.model.Appointment;
import com.example.isabloodbank.model.User;
import com.example.isabloodbank.model.Center;


import java.util.List;

public interface IAppointmentService {

    AppointmentDTO create(AppointmentDTO appointmentDTO, Long id) throws Exception;
    List<Appointment> getAll();
    List<Appointment> getAllByCenter(long id);
    List<Appointment> getAllByCenterAndUser(Long id, User user);
    List<Appointment> getAllFreeByCenter(Long id);
    List<CenterAppointmentDTO> getAllAvailableBySearch(AppointmentDTO appointmentDTO);
    List<Center> sortAvailableByScore(AppointmentDTO appointmentDTO, String sortOrder, String sortBy);
}
