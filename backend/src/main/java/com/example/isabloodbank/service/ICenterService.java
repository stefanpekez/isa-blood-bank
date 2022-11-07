package com.example.isabloodbank.service;


import com.example.isabloodbank.model.Center;

import java.util.List;

public interface ICenterService {
    List<Center> getAll();
    List<Center> getAll(String sortBy, String sortOrder);
    Center create(Center center);
}
