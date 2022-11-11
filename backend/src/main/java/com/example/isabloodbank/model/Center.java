package com.example.isabloodbank.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class Center {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;
    @OneToOne(cascade = CascadeType.ALL)
    private Address address;
    @Column
    private String description;
    @Column
    private Double rating;
    @Column
    private Long donationPrice;
    @Column
    private String workingHours;
    @OneToMany
    private List<Donator> donators = new ArrayList<>();
    @ManyToMany(cascade = CascadeType.PERSIST)
    private List<User> adminsCenter = new ArrayList<>();
    @OneToMany
    private List<Blood> typesOfBlood = new ArrayList<>();
}
