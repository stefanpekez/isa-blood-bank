package com.example.isabloodbank.service;

import com.example.isabloodbank.dto.UserCreateDTO;
import com.example.isabloodbank.model.User;

import java.util.List;

public interface IUserService {
    User create(User user);

    User getById(Long id);

    User edit(User user, Long id);

    User findByEmail(String email);
    List<UserCreateDTO> getAllUnemployedAdmins();
}
