package com.example.isabloodbank.repository;

import com.example.isabloodbank.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface IAppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findAllByDonatorId(Long userId);
    Optional<Appointment> findAllByWorkCalendar_Center_Id(long centerId);
}
