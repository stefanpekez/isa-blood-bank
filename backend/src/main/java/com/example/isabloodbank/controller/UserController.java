package com.example.isabloodbank.controller;
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
}
