package com.example.isabloodbank.service;


import com.example.isabloodbank.dto.CenterDTO;
import com.example.isabloodbank.model.Center;

import java.util.List;

public interface ICenterService {
    List<Center> getAll();
    List<Center> getAll(String sortBy, String sortOrder);

    CenterDTO create(CenterDTO center) throws Exception;

    Center getById(Long id);

    Center edit(Center center, Long id);
}
