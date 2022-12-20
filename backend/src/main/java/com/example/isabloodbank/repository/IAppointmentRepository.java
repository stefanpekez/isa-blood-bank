package com.example.isabloodbank.repository;

import com.example.isabloodbank.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IAppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findAllByDonatorId(Long userId);
}
