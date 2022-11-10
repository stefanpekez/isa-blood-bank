package com.example.isabloodbank.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "templates")
public class Templates {
    @Id
    private Long id;

    @Column(columnDefinition="TEXT")
    private String data;

}
