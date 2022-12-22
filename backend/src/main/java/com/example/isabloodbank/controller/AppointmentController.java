package com.example.isabloodbank.controller;

import com.example.isabloodbank.dto.AppointmentReviewDto;
import com.example.isabloodbank.model.Appointment;
import com.example.isabloodbank.service.AppointmentService;
import com.example.isabloodbank.service.ICenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.example.isabloodbank.dto.QuestionnaireDTO;
import com.example.isabloodbank.dto.ScheduleAppointmentDTO;
import com.example.isabloodbank.model.Appointment;
import com.example.isabloodbank.model.User;
import com.example.isabloodbank.service.AppointmentService;
import com.example.isabloodbank.service.EmailService;
import com.example.isabloodbank.service.QuestionnaireService;
import com.example.isabloodbank.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PutMapping;

import com.example.isabloodbank.dto.AppointmentDTO;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private QuestionnaireService questionnaireService;


    @GetMapping("/user/{id}")
    public List<Appointment> getAllByUser(@PathVariable("id")Long userId ) {
        return appointmentService.getAllByUser(userId);
    }

    @PostMapping("/review")
    public void review(@RequestBody AppointmentReviewDto appointmentReviewDto) {
        appointmentService.review(appointmentReviewDto);
    }

    @PutMapping
    @PreAuthorize("hasRole('REGULAR')")
    public ResponseEntity<Appointment> reserve(@RequestBody ScheduleAppointmentDTO scheduleDto) {
        User user = userService.findByEmail(scheduleDto.getUserEmail());

        QuestionnaireDTO questionnaire = questionnaireService.getByUser(user.getEmail());

        if (questionnaire.getFilledQuestionnaire() == null || !questionnaireService.isUserEligible(questionnaire.getFilledQuestionnaire()))
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        Appointment appointment = appointmentService.schedule(user, scheduleDto.getAppointment());

        if (appointment == null)
            return new ResponseEntity<>(null, HttpStatus.BAD_GATEWAY);

        emailService.sendScheduledAppointmentEmail(user, appointment);

        return new ResponseEntity<>(appointment, HttpStatus.OK);
    }

    @PostMapping("/{id}")
    public ResponseEntity<AppointmentDTO> create(@RequestBody AppointmentDTO appointmentDTO, @PathVariable("id") Long id) throws Exception{
        return ResponseEntity.status(HttpStatus.CREATED).body(appointmentService.create(appointmentDTO, id));
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Appointment>> getAll(){
       return ResponseEntity.status(HttpStatus.OK).body(appointmentService.getAll());
    }

    @GetMapping("/center/{id}")
    public ResponseEntity<List<Appointment>> getAllByCenter(@PathVariable("id") Long id){
        return ResponseEntity.status(HttpStatus.OK).body(appointmentService.getAllByCenter(id));
    }
}
