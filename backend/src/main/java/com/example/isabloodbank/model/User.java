package com.example.isabloodbank.model;

import com.example.isabloodbank.model.enums.Gender;
import com.example.isabloodbank.model.enums.Role;
import com.example.isabloodbank.model.enums.WorkStatus;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "user_table")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String email;
    @Column
    private String password;
    @Column
    private String name;
    @Column
    private String surname;
    @OneToOne
    private Address address;
    @Column
    private String upin;
    @Column
    private Gender gender;
    @Column
    private String occupation;
    @Column
    private WorkStatus workStatus;
    @Column
    private Role role;
    @Column
    private Long centerId;
}
