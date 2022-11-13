package com.example.isabloodbank.service;

import com.example.isabloodbank.model.Donator;
import com.example.isabloodbank.repository.IDonatorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DonatorService{

    @Autowired
    IDonatorRepository donatorRepository;

    public Donator findOneByUserId(Long id) {
        Optional<Donator> donator = donatorRepository.findOneByUserId(id);
        if(donator.isEmpty()){
            return null;
        }
        return donator.get();
    }
}
