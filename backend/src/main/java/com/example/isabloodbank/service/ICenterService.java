package com.example.isabloodbank.service;


import com.example.isabloodbank.dto.CenterDTO;
import com.example.isabloodbank.model.Center;
import java.util.Optional;

import java.util.List;

public interface ICenterService {
    List<Center> getAll();
    List<Center> getAll(String sortBy, String sortOrder, List<Center> centers);

    CenterDTO create(CenterDTO center) throws Exception;

    Center getById(Long id);

    Center edit(Center center, Long id);

    List<Center> getAll(double filterMin, double filterMax);

    List<Center> getAll(Optional<String> searchName, Optional<String> searchStreetName, Optional<String> searchTown, List<Center> centers);
}
