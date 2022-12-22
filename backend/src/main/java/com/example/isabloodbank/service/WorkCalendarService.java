package com.example.isabloodbank.service;

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


    public List<Appointment> getAllAppointments(Long id){
        WorkCalendar workCalendar = workCalendarRepository.findWorkCalendarByCenter_Id(id);
        System.out.println(workCalendar.getScheduledAppointments().size());
        return workCalendar.getScheduledAppointments();

    }
}
