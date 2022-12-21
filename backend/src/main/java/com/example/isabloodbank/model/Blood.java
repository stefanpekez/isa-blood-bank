package com.example.isabloodbank.model;

import com.example.isabloodbank.model.enums.BloodType;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Data
@RequiredArgsConstructor
public class Blood {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private BloodType bloodType;
    @Column
    private int amount;
    @Column
    private Long centerId;
}
