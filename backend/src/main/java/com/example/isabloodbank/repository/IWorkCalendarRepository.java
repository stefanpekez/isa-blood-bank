package com.example.isabloodbank.repository;

import com.example.isabloodbank.model.WorkCalendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface IWorkCalendarRepository extends JpaRepository<WorkCalendar, Long> {
    WorkCalendar findWorkCalendarByCenter_Id(Long id);
}
