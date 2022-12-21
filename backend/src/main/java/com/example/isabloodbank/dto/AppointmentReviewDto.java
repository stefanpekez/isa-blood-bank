package com.example.isabloodbank.dto;

import com.example.isabloodbank.model.Blood;
import com.example.isabloodbank.model.enums.AppointmentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentReviewDto {

    private Long id;

    private AppointmentStatus status;

    private Integer equipmentUsed;

    private String description;

    private Blood blood;
}
