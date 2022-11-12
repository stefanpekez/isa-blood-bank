package com.example.isabloodbank.controller;

import com.example.isabloodbank.model.Donator;
import com.example.isabloodbank.service.DonatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/donators")
public class DonatorController {

    @Autowired
    DonatorService donatorService;

    @GetMapping("/{id}")
    public Donator findOneByUserId(@PathVariable("id") Long id){
        return donatorService.findOneByUserId(id);
    }

}
