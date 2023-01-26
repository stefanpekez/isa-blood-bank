package com.example.isabloodbank.service;

import com.example.isabloodbank.dto.UserCreateDTO;
import com.example.isabloodbank.dto.UserDTO;
import com.example.isabloodbank.model.User;

import java.util.List;

public interface IUserService {
    User create(User user, String role);

    User getById(Long id);

    User edit(User user, Long id);

    User findByEmail(String email);
    List<UserCreateDTO> getAllUnemployedAdmins();

    List<UserCreateDTO> getAll();

    String activate(Long id);

    UserCreateDTO create(UserCreateDTO userCreateDTO);

    UserCreateDTO updatePassword(UserCreateDTO userCreateDTO);

    User save(User user);

    List<UserDTO> getAllDonators(Long bloodBankId);
}
