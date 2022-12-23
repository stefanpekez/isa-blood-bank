package com.example.isabloodbank.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Data
public class CenterDTO {
    private Long id;
    private String name;
    private String description;
    private AddressDTO address;
    private String donationPrice;
    private String workingHours;
    private String rating;
    private List<UserCreateDTO> admins;
}
