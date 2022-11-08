package com.example.isabloodbank.dto;

import com.example.isabloodbank.model.Address;
import com.example.isabloodbank.model.enums.Gender;
import com.example.isabloodbank.model.enums.Role;
import com.example.isabloodbank.model.enums.WorkStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

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
    private Address address;
    @NotNull
    private String upin;
    @NotNull
    private String gender;
    @NotNull
    private String occupation;
    @NotNull
    private String workStatus;
    @JsonIgnore
    private Role role;

    public UserCreateDTO() {
        this.role = Role.REGULAR;
    }
}
