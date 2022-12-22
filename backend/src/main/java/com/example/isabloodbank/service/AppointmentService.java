package com.example.isabloodbank.service;


import com.example.isabloodbank.dto.AppointmentDTO;
import com.example.isabloodbank.dto.AppointmentReviewDto;
import com.example.isabloodbank.model.Appointment;
import com.example.isabloodbank.model.enums.AppointmentStatus;
import com.example.isabloodbank.dto.ScheduleAppointmentDTO;
import com.example.isabloodbank.model.Appointment;
import com.example.isabloodbank.model.User;
import com.example.isabloodbank.model.Center;
import com.example.isabloodbank.model.WorkCalendar;
import com.example.isabloodbank.repository.IAppointmentRepository;
import com.example.isabloodbank.repository.ICenterRepository;
import com.example.isabloodbank.repository.IWorkCalendarRepository;
import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.example.isabloodbank.mapper.AppointmentMapper;

import java.util.List;

@Service
public class AppointmentService implements IAppointmentService{

    @Autowired
    IAppointmentRepository appointmentRepository;

    @Autowired
    UserService userService;

    @Autowired
    CenterService centerService;

    @Autowired
    AppointmentMapper appointmentMapper;

    @Autowired
    IWorkCalendarRepository workCalendarRepository;

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

    public Appointment schedule(User user, Long appointmentId) {
        Optional<Appointment> appointmentOptional = appointmentRepository.findById(appointmentId);
        if (appointmentOptional.isEmpty() || appointmentOptional.get().isReserved()) return null;

        Appointment appointment = appointmentOptional.get();

        appointment.setDonator(user);
        appointment.setReserved(true);

        appointmentRepository.save(appointment);
        return appointment;
    }

    public Appointment cancel(Long appointmentId) {
        Optional<Appointment> appointmentOptional = appointmentRepository.findById(appointmentId);
        if (appointmentOptional.isEmpty() || !checkDate(appointmentOptional.get().getScheduledTime(), appointmentOptional.get().getStartTime()))
            return null;

        Appointment appointment = appointmentOptional.get();
        appointment.setDonator(null);
        appointment.setReserved(false);

        appointmentRepository.save(appointment);
        return appointment;
    }

    private boolean checkDate(LocalDate appointmentDate, LocalTime appointmentTime) {
        LocalDate now = LocalDate.now();
        LocalTime nowTime = LocalTime.now();

        if(now.isBefore(appointmentDate.minusDays(1)))
            return true;
        else if(now.isBefore(appointmentDate) && nowTime.isBefore(appointmentTime))
            return true;

        return false;
    }



    public AppointmentDTO create(AppointmentDTO appointmentDTO, Long id) throws Exception{
        Appointment appointment = appointmentMapper.dtoToEntity(appointmentDTO);
        Center center = new Center();
        WorkCalendar workCalendar = new WorkCalendar();
        center = centerService.getById(id);
        workCalendar = workCalendarRepository.findWorkCalendarByCenter_Id(id);

        //System.out.println("Unos: " +appointment.getScheduledTime());

        int workHourEnd =  Integer.parseInt(center.getWorkingHours().substring(6,8));
        int workHourStart =  Integer.parseInt(center.getWorkingHours().substring(0,2));



        if(center.getWorkingHours().substring(0,1).equals("0")){  workHourStart =  Integer.parseInt(center.getWorkingHours().substring(1,2));}
        if(appointment.getStartTime().getHour() < workHourStart || appointment.getStartTime().getHour() + appointment.getDuration() > workHourEnd){
            throw new Exception("Appointment time slot is not define within center working hours");
        }
        appointment.setWorkCalendar(workCalendar);

        List<Appointment> defineAppointments = workCalendar.getScheduledAppointments();
        System.out.println(defineAppointments.size());
        if(!workCalendar.getScheduledAppointments().isEmpty()){
            for(Appointment scheduledAppointment: defineAppointments){
                if(scheduledAppointment.getScheduledTime().equals(appointment.getScheduledTime())){
                    if(scheduledAppointment.getStartTime().getHour() == appointment.getStartTime().getHour()){
                        throw new Exception("This time and date are already taken");
                    }
                }
            }
        }

        appointment = appointmentRepository.save(appointment);
        defineAppointments.add(appointment);
        workCalendar.setScheduledAppointments(defineAppointments);
        workCalendar = workCalendarRepository.save(workCalendar);
        return appointmentMapper.entityToDto(appointment);
    }

    public List<Appointment> getAll(){
        return appointmentRepository.findAll();
    }

    public List<Appointment> getAllByCenter(long id){
        return appointmentRepository.findAllByWorkCalendar_Center_Id(id);
    }

    public List<Center> getAllAvailableBySearch(AppointmentDTO appointmentDTO){
        Appointment appointment = appointmentMapper.dtoToEntity(appointmentDTO);
        List<Appointment> allAppointments = new ArrayList<Appointment>();
        List<Center> result = new ArrayList<Center>();
        allAppointments = appointmentRepository.findAll();

        for(Appointment a: allAppointments) {
            if (a.getScheduledTime().equals(appointment.getScheduledTime())) {
                System.out.println(appointment.getScheduledTime());
                if (a.getStartTime().getHour() == appointment.getStartTime().getHour() && !a.isReserved()) {
                    Center center = a.getWorkCalendar().getCenter();
                    result.add(center);
                }
            }
        }
        return result;
    }

    public List<Center> sortAvailableByScore(AppointmentDTO appointmentDTO, String sortOrder, String sortBy){
        List<Center> centers = getAllAvailableBySearch(appointmentDTO);
        List<Center> result = new ArrayList<>();

        if(!centers.isEmpty())
            result = centerService.getAll(sortBy, sortOrder,centers);
        return result;
    }

    @Override
    public List<Appointment> getAllByCenterAndUser(Long id, User user) {
        List<Appointment> appointments = getAllByCenter(id);
        List<Appointment> filteredAppointments = new ArrayList<>();

        for(Appointment appointment: appointments) {
            if(appointment.getDonator() != null && appointment.getDonator().getEmail().equals(user.getEmail()))
                filteredAppointments.add(appointment);
        }

        return filteredAppointments;
    }

    @Override
    public List<Appointment> getAllFreeByCenter(Long id) {
        List<Appointment> appointments = getAllByCenter(id);
        List<Appointment> filteredAppointments = new ArrayList<>();

        for(Appointment appointment: appointments) {
            if(!appointment.isReserved()) filteredAppointments.add(appointment);
        }

        return filteredAppointments;
    }
}
