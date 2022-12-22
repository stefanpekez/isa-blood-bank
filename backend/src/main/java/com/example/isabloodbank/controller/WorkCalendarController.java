package com.example.isabloodbank.controller;

import com.example.isabloodbank.model.Appointment;
import com.example.isabloodbank.service.WorkCalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/calendars")
public class WorkCalendarController {

    @Autowired
    WorkCalendarService workCalendarService;

    @GetMapping("/appointments/{id}")
    public ResponseEntity<List<Appointment>> getAllAppointments(@PathVariable("id") Long id){
        List<Appointment> appointments;
        appointments = workCalendarService.getAllAppointments(id);
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

}
