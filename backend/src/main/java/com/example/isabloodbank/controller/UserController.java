package com.example.isabloodbank.controller;
import com.example.isabloodbank.dto.ActivationResponseDTO;
import com.example.isabloodbank.dto.LoggedInUserDTO;
import com.example.isabloodbank.dto.UserCreateDTO;
import com.example.isabloodbank.mapper.UserMapper;
import com.example.isabloodbank.model.User;
import com.example.isabloodbank.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200")
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
        User user = userMapper.dtoToEntity(userCreateDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(userMapper.entityToDto(userService.create(user, userCreateDTO.getRole())));
    }

    @PreAuthorize("hasRole('ADMIN_SYSTEM')")
    @PutMapping("/change")
    public ResponseEntity<UserCreateDTO> updatePassword(@RequestBody UserCreateDTO userCreateDTO) {
        UserCreateDTO dto = userService.updatePassword(userCreateDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @GetMapping("/find/{email}")
    public ResponseEntity<UserCreateDTO> findUserByEmail(@PathVariable String email) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userMapper.entityToDto(userService.findByEmail(email)));
    }

    @GetMapping("/findLoggedIn")
    public ResponseEntity<LoggedInUserDTO> findLoggedInUser() {
        User user = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return new ResponseEntity<>(new LoggedInUserDTO(user.getEmail()), HttpStatus.OK);
    }
}
