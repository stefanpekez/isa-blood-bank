package com.example.isabloodbank.service;

import com.example.isabloodbank.dto.UserCreateDTO;
import com.example.isabloodbank.mapper.UserMapper;
import com.example.isabloodbank.model.User;
import com.example.isabloodbank.model.enums.Role;
import com.example.isabloodbank.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService{
    @Autowired
    IUserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

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
    public User edit(User user, Long id) {
        Optional<User> OldUser = userRepository.findById(id);
        if (OldUser.isEmpty()) {
            return null;
        }
        return userRepository.save(user);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findOneByEmail(email);
    }

    public List<UserCreateDTO> getAllUnemployedAdmins() {
        List<User> users = userRepository.findAll();
        List<UserCreateDTO> centerAdmins = new ArrayList<>();
        for (User user: users) {
            if (!(user.getRole() == Role.ADMIN_CENTER))
                continue;
            if(!(user.getCenterId() == null))
                continue;

            centerAdmins.add(userMapper.entityToDto(user));
        }

        return centerAdmins;
    }

    public List<UserCreateDTO> getAll() {
        return userMapper.entityToDtoList(userRepository.findAll());
    }

    public Optional<User> findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }
}
