package com.example.isabloodbank.model;

import com.example.isabloodbank.model.enums.BloodType;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class Blood {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private BloodType bloodType;
    @Column
    private int amount;
}
