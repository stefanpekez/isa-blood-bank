package com.example.isabloodbank.mapper;

import com.example.isabloodbank.dto.AppointmentDTO;
import com.example.isabloodbank.model.Appointment;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
public class AppointmentMapper implements ObjectMapper<Appointment, AppointmentDTO>{
    @Override
    public AppointmentDTO entityToDto(Appointment appointment) {
        AppointmentDTO appointmentDTO = new AppointmentDTO();
        appointmentDTO.setScheduleTime(appointment.getScheduledTime());
        appointmentDTO.setDuration(appointment.getDuration());
        appointmentDTO.setReserved(appointment.isReserved());
        appointmentDTO.setStartTime(appointment.getStartTime());
        return appointmentDTO;
    }

    @Override
    public List<AppointmentDTO> entityToDtoList(List<Appointment> appointments) {
        return null;
    }

    @Override
    public Appointment dtoToEntity(AppointmentDTO appointmentDTO) {
        Appointment appointment = new Appointment();
        appointment.setScheduledTime(appointmentDTO.getScheduleTime());
        appointment.setDuration(appointmentDTO.getDuration());
        appointment.setReserved(appointmentDTO.isReserved());
        appointment.setStartTime(appointmentDTO.getStartTime());
        return appointment;
    }

    @Override
    public List<Appointment> dtoListToEntityList(List<AppointmentDTO> appointmentDTOS) {
        return null;
    }
}
