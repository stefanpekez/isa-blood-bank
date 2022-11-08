package com.example.isabloodbank.controller;

import com.example.isabloodbank.dto.UserCreateDTO;
import com.example.isabloodbank.model.User;

import com.example.isabloodbank.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    IUserService userService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> create(@RequestBody UserCreateDTO user) {
        User newUser = new User();
        newUser.mapUserCreateDTO(user);
        newUser = userService.create(newUser);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }
}
