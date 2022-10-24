package com.example.isabloodbank.model;

import com.example.isabloodbank.model.enums.BloodType;
import com.example.isabloodbank.model.enums.Loyalty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Donator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    private User user;
    @Column
    private Loyalty loyalty;
    @Column
    private BloodType bloodType;
    @Column
    private int penalties;
    @Column
    private int points;
}
