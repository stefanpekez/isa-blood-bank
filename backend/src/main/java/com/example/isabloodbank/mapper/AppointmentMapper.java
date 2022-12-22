package com.example.isabloodbank.mapper;

import com.example.isabloodbank.dto.AppointmentDTO;
import com.example.isabloodbank.model.Appointment;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class AppointmentMapper implements ObjectMapper<Appointment, AppointmentDTO>{
    @Override
    public AppointmentDTO entityToDto(Appointment appointment) {
        AppointmentDTO appointmentDTO = new AppointmentDTO();
        appointmentDTO.setScheduleTime(appointment.getScheduledTime().toString());
        appointmentDTO.setDuration(appointment.getDuration());
        appointmentDTO.setReserved(appointment.isReserved());
        appointmentDTO.setId(appointment.getId());
        if (appointment.getStartTime() != null)
            appointmentDTO.setStartTime(appointment.getStartTime().toString());
        return appointmentDTO;
    }

    @Override
    public List<AppointmentDTO> entityToDtoList(List<Appointment> appointments) {
        return appointments.stream().map(x -> entityToDto(x)).collect(Collectors.toList());
    }

    @Override
    public Appointment dtoToEntity(AppointmentDTO appointmentDTO) {
        Appointment appointment = new Appointment();
        appointment.setScheduledTime(LocalDate.parse(appointmentDTO.getScheduleTime()));
        appointment.setDuration(appointmentDTO.getDuration());
        appointment.setReserved(appointmentDTO.isReserved());
        if (appointmentDTO.getStartTime() != null)
            appointment.setStartTime(LocalTime.parse(appointmentDTO.getStartTime()));
        return appointment;
    }

    @Override
    public List<Appointment> dtoListToEntityList(List<AppointmentDTO> appointmentDTOS) {
        return appointmentDTOS.stream().map(x -> dtoToEntity(x)).collect(Collectors.toList());
    }
}
