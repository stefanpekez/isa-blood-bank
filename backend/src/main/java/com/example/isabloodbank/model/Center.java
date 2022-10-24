package com.example.isabloodbank.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
public class Center {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;
    @OneToOne
    private Address address;
    @Column
    private String description;
    @Column
    private Long rating;
    @Column
    private Long donationPrice;
    @Column
    private String workingHours;
    @OneToMany
    private List<Donator> donators;
    @OneToMany
    private List<User> adminsCenter;
    @OneToMany
    private List<Blood> typesOfBlood;
}
