package com.example.isabloodbank.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
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
    @OneToOne()
    private Address address;
    @Column
    private String description;
    @Column
    private Long rating;
    @Column
    private Long donationPrice;
    @Column
    private String workingHours;
    @OneToMany(fetch = FetchType.LAZY)
    private List<Donator> donators = new ArrayList<>();
    @OneToMany(fetch = FetchType.LAZY)
    private List<User> adminsCenter = new ArrayList<>();
    @OneToMany(fetch = FetchType.LAZY)
    private List<Blood> typesOfBlood = new ArrayList<>();
}
