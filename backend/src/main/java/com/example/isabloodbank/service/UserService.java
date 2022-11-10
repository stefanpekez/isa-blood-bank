package com.example.isabloodbank.service;

import com.example.isabloodbank.model.User;
import com.example.isabloodbank.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService{

    @Autowired
    IUserRepository userRepository;

    @Override
    public User create(User user) {
        return userRepository.save(user);
    }
}
