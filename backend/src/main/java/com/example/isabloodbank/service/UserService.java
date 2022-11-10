package com.example.isabloodbank.service;

import com.example.isabloodbank.model.User;
import com.example.isabloodbank.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements IUserService{

    @Autowired
    IUserRepository userRepository;

    @Override
    public User create(User user) {
        return userRepository.save(user);
    }

    public User getById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if(user.isEmpty()) {
            return null;
        }
        return user.get();
    }
    public User edit(User user, Long id){
        Optional<User> OldUser = userRepository.findById(id);     //provjeravam da li postoji u bazi
        if(OldUser.isEmpty()) {
            return null;
        }
        return userRepository.save(user);
    }
}
