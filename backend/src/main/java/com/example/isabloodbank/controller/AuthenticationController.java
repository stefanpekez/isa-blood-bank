package com.example.isabloodbank.controller;

import com.example.isabloodbank.dto.LoginDTO;
import com.example.isabloodbank.dto.UserCreateDTO;
import com.example.isabloodbank.dto.UserTokenStateDTO;
import com.example.isabloodbank.mapper.UserMapper;
import com.example.isabloodbank.model.User;
import com.example.isabloodbank.service.UserService;
import com.example.isabloodbank.util.TokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/auth")
public class AuthenticationController {

    @Autowired
    private TokenUtils tokenUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private UserMapper userMapper;


    @PostMapping("/login")
    public ResponseEntity<UserTokenStateDTO> login(@RequestBody LoginDTO loginCredentials) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginCredentials.getEmail(), loginCredentials.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = (User) authentication.getPrincipal();
        String jwt = tokenUtils.generateToken(user.getUsername());
        int expiresIn = tokenUtils.getExpiredIn();

        return new ResponseEntity<>(new UserTokenStateDTO(jwt, (long) expiresIn, user.getRole().getName(), user.getCenterId()), HttpStatus.OK);
    }

    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> create(@RequestBody UserCreateDTO user) {
        User newUser = new User();
        newUser = userMapper.dtoToEntity(user);
        newUser = userService.create(newUser, user.getRole());
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }
}

