package com.example.isabloodbank.controller;

import com.example.isabloodbank.dto.*;
import com.example.isabloodbank.model.*;
import com.example.isabloodbank.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import com.example.isabloodbank.model.Appointment;
import com.example.isabloodbank.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PutMapping;

import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.swing.text.html.Option;

@RestController
@RequestMapping(value = "/appointments")
@CrossOrigin(origins = "http://localhost:4200")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private QuestionnaireService questionnaireService;

    @Autowired
    private ReportService reportService;

    @GetMapping("/user/{id}")
    public List<Appointment> getAllByUser(@PathVariable("id")Long userId ) {
        return appointmentService.getAllByUser(userId);
    }

    @PostMapping("/review")
    public void review(@RequestBody AppointmentReviewDto appointmentReviewDto) {
        appointmentService.review(appointmentReviewDto);
    }

    @PutMapping
    @CrossOrigin(origins = "http://localhost:4200/")
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

    @CrossOrigin(origins = "http://localhost:4200/")
    @PutMapping(value = "/{id}")
    public ResponseEntity<Appointment> cancel(@PathVariable Long id) {
        Appointment appointment = appointmentService.cancel(id);
        return new ResponseEntity<>(appointment, appointment == null ? HttpStatus.BAD_GATEWAY : HttpStatus.OK);
    }

    @GetMapping("/filter/{centerId}")
    public ResponseEntity<List<Appointment>> getAllByCenterAndUser(@PathVariable("centerId") Long centerId) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.status(HttpStatus.OK).body(appointmentService.getAllByCenterAndUser(centerId, user));
    }

    @GetMapping("/filter-free/{centerId}")
    public ResponseEntity<List<Appointment>> getAllFreeByCenter(@PathVariable("centerId") Long centerId){
        return ResponseEntity.status(HttpStatus.OK).body(appointmentService.getAllFreeByCenter(centerId));
    }
    @PostMapping("/find-available")
    public ResponseEntity<List<CenterAppointmentDTO>> getAllAvailableBySearch(@RequestBody AppointmentDTO appointmentDTO){
        return ResponseEntity.status(HttpStatus.OK).body(appointmentService.getAllAvailableBySearch(appointmentDTO));
    }

    @PostMapping("/sort-available")
    public ResponseEntity<List<Center>> sortAvailableByScore(@RequestBody AppointmentDTO appointmentDTO, @RequestParam("sort-order") Optional<String> sortOrder,  @RequestParam("sort-by") Optional<String> sortBy){
        if (sortOrder.isPresent() && sortBy.isPresent()) {
            if ((!sortOrder.get().equals("asc") && !sortOrder.get().equals("desc")) || !sortBy.get().equals("rating")) {
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
            }
           // centers = centerService.getAll(sortBy.get(), sortOrder.get(), centers);
        }
        //return new ResponseEntity<>(centers, HttpStatus.OK);
        return ResponseEntity.status(HttpStatus.OK).body(appointmentService.sortAvailableByScore(appointmentDTO, sortOrder.get(), sortBy.get()));

    }

    @GetMapping("/user-history")
    public ResponseEntity<List<Appointment>> getUserAppointmentHistory(
            @RequestParam("username") String username,
            @RequestParam("center-id") String centerId,
            @RequestParam("sort-order") Optional<String> sortOrder,
            @RequestParam("sort-type") Optional<String> sortType
    ) {
        String sortOrderParsed = sortOrder.isPresent() ? sortOrder.get() : "asc";
        String sortTypeParsed = sortType.isPresent() ? sortType.get() : "date";

        List<Appointment> appointments = appointmentService.getUserHistory(username, Integer.parseInt(centerId), sortOrderParsed, sortTypeParsed);
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }
    @GetMapping("/get/{id}")
    public ResponseEntity<AppointmentDTO> getById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(this.appointmentService.getById(id));
    }

    @PostMapping("/save-report")
    public ResponseEntity<Report> saveReport(@RequestBody Report report){
        return ResponseEntity.status(HttpStatus.CREATED).body(this.reportService.saveReport(report));
    }

}
