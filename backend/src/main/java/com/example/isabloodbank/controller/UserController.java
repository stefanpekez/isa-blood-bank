package com.example.isabloodbank.controller;
import com.example.isabloodbank.dto.ActivationResponseDTO;
import com.example.isabloodbank.dto.UserCreateDTO;
import com.example.isabloodbank.mapper.UserMapper;
import com.example.isabloodbank.model.User;
import com.example.isabloodbank.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    IUserService userService;

    @Autowired
    private UserMapper userMapper;

    @GetMapping
    public ResponseEntity<List<UserCreateDTO>> getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAll());
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable("id") Long id) {
        return userService.getById(id);
    }

    @PutMapping("/{id}")
    public User edit(@RequestBody User user, @PathVariable("id") Long id){
        return userService.edit(user, id);
    }

    @GetMapping("/role/center")
    public ResponseEntity<List<UserCreateDTO>> getAllUnemployedAdmin() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUnemployedAdmins());
    }

    @GetMapping("/activate/{id}")
    public ResponseEntity<ActivationResponseDTO> activateAccount(@PathVariable("id") Long id) {
        return new ResponseEntity<>(new ActivationResponseDTO(userService.activate(id)), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<UserCreateDTO> create(@RequestBody UserCreateDTO userCreateDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.create(userCreateDTO));
    }
}
