package com.example.isabloodbank.service;

import com.example.isabloodbank.dto.AppointmentDTO;
import com.example.isabloodbank.dto.WorkCalendarDTO;
import com.example.isabloodbank.mapper.AppointmentMapper;
import com.example.isabloodbank.mapper.WorkCalendarMapper;
import com.example.isabloodbank.model.Appointment;
import com.example.isabloodbank.model.WorkCalendar;
import com.example.isabloodbank.repository.IAppointmentRepository;
import com.example.isabloodbank.repository.IWorkCalendarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkCalendarService {

    @Autowired
    IWorkCalendarRepository workCalendarRepository;
    @Autowired
    private AppointmentMapper appointmentMapper;
    @Autowired
    private WorkCalendarMapper workCalendarMapper;

    public WorkCalendarDTO getById(Long centeriId){
        WorkCalendar workCalendar = workCalendarRepository.findWorkCalendarByCenter_Id(centeriId);
        return workCalendarMapper.entityToDto(workCalendar);
    }

    public List<AppointmentDTO> getAllAppointments(Long id){
        WorkCalendar workCalendar = workCalendarRepository.findWorkCalendarByCenter_Id(id);
        System.out.println(workCalendar.getScheduledAppointments().size());
        return appointmentMapper.entityToDtoList(workCalendar.getScheduledAppointments());
    }
}
