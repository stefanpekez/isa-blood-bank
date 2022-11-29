package com.example.isabloodbank.model;

import com.example.isabloodbank.model.enums.BloodType;
import com.example.isabloodbank.model.enums.Loyalty;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
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
    @ManyToMany
    private List<Center> center;
}
