package com.example.isabloodbank.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CenterDTO {
    private String name;
    private String description;
    private AddressDTO address;
    private String donationPrice;
    private String workingHours;
    private String rating;
}
