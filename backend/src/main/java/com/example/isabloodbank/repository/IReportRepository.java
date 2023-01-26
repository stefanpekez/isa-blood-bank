package com.example.isabloodbank.repository;

import com.example.isabloodbank.model.Report;
import com.example.isabloodbank.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IReportRepository extends JpaRepository<Report, Long> {
}
