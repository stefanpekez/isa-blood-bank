package com.example.isabloodbank.service;

import com.example.isabloodbank.model.Center;
import com.example.isabloodbank.model.User;

public interface IUserService {
    User create(User user);

    User getById(Long id);

    User edit(User user, Long id);

    User findByEmail(String email);
}
