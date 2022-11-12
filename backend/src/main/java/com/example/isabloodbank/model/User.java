package com.example.isabloodbank.model;

import com.example.isabloodbank.dto.UserCreateDTO;
import com.example.isabloodbank.model.enums.Gender;
import com.example.isabloodbank.model.enums.Role;
import com.example.isabloodbank.model.enums.WorkStatus;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name = "user_table")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String email;
    @Column
    private String password;
    @Column
    private String name;
    @Column
    private String surname;
    @OneToOne(cascade = CascadeType.ALL)
    private Address address;
    @Column
    private String upin;
    @Column
    private Gender gender;
    @Column
    private String phoneNumber;
    @Column
    private String occupation;
    @Column
    private WorkStatus workStatus;
    @Column
    private Role role;
    @Column
    private Long centerId;

    public void mapUserCreateDTO(UserCreateDTO userDto) {
        this.email = userDto.getEmail();
        this.password = userDto.getPassword();
        this.name = userDto.getName();
        this.surname = userDto.getSurname();
        this.address = userDto.getAddress();
        this.upin = userDto.getUpin();
        this.occupation = userDto.getOccupation();
        this.role = userDto.getRole();
        if (userDto.getGender().equals("MALE")) {
            this.gender = Gender.MALE;
        } else {
            this.gender = Gender.FEMALE;
        }
        if (userDto.getWorkStatus().equals("WORK")) {
            this.workStatus = WorkStatus.WORK;
        } else if (userDto.getWorkStatus().equals("SCHOOL")) {
            this.workStatus = WorkStatus.SCHOOL;
        } else {
            this.workStatus = WorkStatus.UNIVERSITY;
        }
    }
}
