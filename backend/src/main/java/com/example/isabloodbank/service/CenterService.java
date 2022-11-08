package com.example.isabloodbank.service;

import com.example.isabloodbank.model.Center;
import com.example.isabloodbank.repository.ICenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CenterService implements ICenterService{

    @Autowired
    ICenterRepository centerRepository;

    @Override
    public List<Center> getAll() {
        return centerRepository.findAll();
    }

    @Override
    public List<Center> getAll(String sortBy, String sortOrder) {
        List<Center> centers = centerRepository.findAll();
        centers.sort((c1, c2) -> {
            int order;
            if(sortOrder.equals("asc")) {
                order = 1;
            } else {
                order = -1;
            }

            return switch (sortBy) {
                case "name" -> c1.getName().compareTo(c2.getName()) * order;
                case "city" -> c1.getAddress().getTown().compareTo(c2.getAddress().getTown()) * order;
                default -> c1.getRating().compareTo(c2.getRating()) * order;
            };
        });

        return centers;
    }
}
