package com.example.isabloodbank.service;

import com.example.isabloodbank.model.Appointment;
import com.example.isabloodbank.model.User;
import com.example.isabloodbank.repository.ITemplateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private ITemplateRepository templateRepository;

    @Async("threadPoolTaskExecutor")
    public void sendActivationEmail(User user) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@bloodbank.com");
        message.setTo(user.getEmail());
        message.setSubject("Account Activation");

        String template = templateRepository.findById(2L).get().getData();

        template = template.replace("<Name>", user.getName());
        template = template.replace("<UserId>", user.getId().toString());

        message.setText(template);
        emailSender.send(message);
    }

    @Async("threadPoolTaskExecutor")
    public void sendScheduledAppointmentEmail(User user, Appointment appointment) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@bloodbank.com");
        message.setTo(user.getEmail());
        message.setSubject("Appointment Scheduled");

        String template = templateRepository.findById(3L).get().getData();

        template = template.replace("<Name>", user.getName());
        template = template.replace("<Date>", appointment.getScheduledTime().toString());
        template = template.replace("<Duration>", appointment.getDuration().toString());

        message.setText(template);
        emailSender.send(message);
    }
}
