package com.example.isabloodbank.mapper;

import com.example.isabloodbank.dto.WorkCalendarDTO;
import com.example.isabloodbank.model.WorkCalendar;
import com.example.isabloodbank.service.CenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class WorkCalendarMapper implements ObjectMapper<WorkCalendar, WorkCalendarDTO> {

    @Autowired
    private AppointmentMapper appointmentMapper;
    @Autowired
    private CenterService centerService;

    @Override
    public WorkCalendarDTO entityToDto(WorkCalendar workCalendar) {
        WorkCalendarDTO workCalendarDTO = new WorkCalendarDTO();
        workCalendarDTO.setId(workCalendar.getId());
        workCalendarDTO.setCenterId(workCalendar.getCenter().getId());
        workCalendarDTO.setAppointmentDTOList(appointmentMapper.entityToDtoList(workCalendar.getScheduledAppointments()));
        return workCalendarDTO;
    }

    @Override
    public List<WorkCalendarDTO> entityToDtoList(List<WorkCalendar> workCalendars) {
        return null;
    }

    @Override
    public WorkCalendar dtoToEntity(WorkCalendarDTO workCalendarDTO) {
        WorkCalendar workCalendar = new WorkCalendar();
        workCalendar.setId(workCalendarDTO.getId());
        workCalendar.setCenter(centerService.getById(workCalendarDTO.getCenterId()));
        workCalendar.setScheduledAppointments(appointmentMapper.dtoListToEntityList(workCalendarDTO.getAppointmentDTOList()));
        return workCalendar;
    }

    @Override
    public List<WorkCalendar> dtoListToEntityList(List<WorkCalendarDTO> workCalendarDTOS) {
        return null;
    }
}
