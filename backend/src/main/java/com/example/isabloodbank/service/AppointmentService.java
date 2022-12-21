package com.example.isabloodbank.service;

import com.example.isabloodbank.dto.AppointmentReviewDto;
import com.example.isabloodbank.model.Appointment;
import com.example.isabloodbank.model.enums.AppointmentStatus;
import com.example.isabloodbank.repository.IAppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    IAppointmentRepository appointmentRepository;

    @Autowired
    UserService userService;

    @Autowired
    CenterService centerService;

    public List<Appointment> getAllByUser(Long userId) {
        return appointmentRepository.findAllByDonatorId(userId);
    }

    public void review(AppointmentReviewDto appointmentReviewDto) {
        Optional<Appointment> optionalAppointment = appointmentRepository.findById(appointmentReviewDto.getId());
        if (optionalAppointment.isEmpty()) {
            return;
        }
        Appointment appointment = optionalAppointment.get();
        addAppointmentReview(appointmentReviewDto, appointment);
        appointmentRepository.save(appointment);
    }

    private void addAppointmentReview(AppointmentReviewDto appointmentReviewDto, Appointment appointment) {
        if (appointment.getStatus() == AppointmentStatus.DENIED
                || appointment.getStatus() == AppointmentStatus.CANCELED
                || appointment.getStatus() == AppointmentStatus.FINISHED) {
            return;
        }
        switch (appointmentReviewDto.getStatus()) {
            case DENIED -> {
                appointment.setStatus(AppointmentStatus.DENIED);
            }
            case CANCELED -> {
                appointment.setStatus(AppointmentStatus.CANCELED);
                userService.addPenalty(appointment.getDonator());
            }
            case FINISHED -> {
                appointment.setStatus(AppointmentStatus.FINISHED);
                appointment.setDescription(appointmentReviewDto.getDescription());
                centerService.changeBloodAndEquipment(appointmentReviewDto.getBlood(), appointmentReviewDto.getEquipmentUsed(), appointment.getWorkCalendar().getCenter().getId());
            }
        }
    }

}