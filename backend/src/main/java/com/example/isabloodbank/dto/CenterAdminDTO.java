package com.example.isabloodbank.dto;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CenterAdminDTO {
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
    private String occupation;
    @NotNull
    private String role;
}
