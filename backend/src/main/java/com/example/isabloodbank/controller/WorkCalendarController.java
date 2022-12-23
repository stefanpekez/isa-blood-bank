package com.example.isabloodbank.controller;

import com.example.isabloodbank.dto.AppointmentDTO;
import com.example.isabloodbank.dto.WorkCalendarDTO;
import com.example.isabloodbank.model.Appointment;
import com.example.isabloodbank.service.WorkCalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/calendars")
public class WorkCalendarController {

    @Autowired
    WorkCalendarService workCalendarService;

    @PreAuthorize("hasAnyRole('ADMIN_SYSTEM', 'ADMIN_CENTER')")
    @GetMapping("/{id}")
    public ResponseEntity<WorkCalendarDTO> getById(@PathVariable("id") Long id){
        return new ResponseEntity<>(workCalendarService.getById(id), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN_SYSTEM', 'ADMIN_CENTER')")
    @GetMapping("/appointments/{id}")
    public ResponseEntity<List<AppointmentDTO>> getAllAppointments(@PathVariable("id") Long id){
        List<AppointmentDTO> appointments;
        appointments = workCalendarService.getAllAppointments(id);
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

}
