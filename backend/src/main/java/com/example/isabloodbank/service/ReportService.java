package com.example.isabloodbank.service;

import com.example.isabloodbank.model.Report;
import com.example.isabloodbank.repository.IReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportService {

    @Autowired
    private IReportRepository reportRepository;

    public Report saveReport(Report report) {
        return this.reportRepository.save(report);
    }
}
