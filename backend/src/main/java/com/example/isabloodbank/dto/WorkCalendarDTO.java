package com.example.isabloodbank.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@Data
public class WorkCalendarDTO {
    private Long id;
    private Long centerId;
    private List<AppointmentDTO> appointmentDTOList;
}
