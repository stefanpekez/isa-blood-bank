package com.example.isabloodbank.mapper;

import com.example.isabloodbank.dto.AppointmentDTO;
import com.example.isabloodbank.model.Appointment;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AppointmentMapper implements ObjectMapper<Appointment, AppointmentDTO>{
    @Override
    public AppointmentDTO entityToDto(Appointment appointment) {
        AppointmentDTO appointmentDTO = new AppointmentDTO();
        appointmentDTO.setScheduleTime(appointment.getScheduledTime());
        appointmentDTO.setDuration(appointment.getDuration());
        appointmentDTO.setReserved(appointment.isReserved());
        return appointmentDTO;
    }

    @Override
    public List<AppointmentDTO> entityToDtoList(List<Appointment> appointments) {
        return null;
    }

    @Override
    public Appointment dtoToEntity(AppointmentDTO appointmentDTO) {
        return null;
    }

    @Override
    public List<Appointment> dtoListToEntityList(List<AppointmentDTO> appointmentDTOS) {
        return null;
    }
}
