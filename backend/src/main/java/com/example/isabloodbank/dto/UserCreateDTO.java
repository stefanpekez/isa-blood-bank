package com.example.isabloodbank.dto;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserCreateDTO {
    @NotNull
    private String email;
    @NotNull
    private String password;
    @NotNull
    private String name;
    @NotNull
    private String surname;
    @NotNull
    private AddressDTO address;
    @NotNull
    private String upin;
    @NotNull
    private String gender;
    @NotNull
    private String phoneNumber;
    private String occupation;
    private String workStatus;
    @NotNull
    private String role;

}
