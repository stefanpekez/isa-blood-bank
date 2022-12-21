package com.example.isabloodbank.service;

import com.example.isabloodbank.dto.UserCreateDTO;
import com.example.isabloodbank.mapper.UserMapper;
import com.example.isabloodbank.model.Role;
import com.example.isabloodbank.model.User;
import com.example.isabloodbank.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService, UserDetailsService {
    @Autowired
    IUserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleService roleService;

    @Override
    public User create(User user, String role) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        List<Role> roles;

        if(role == null) roles = roleService.findByName("ROLE_REGULAR");
        else roles = roleService.findByName(role);

        user.setRole(roles.get(0));
        user.setActivated(false);
        return userRepository.save(user);
    }

    @Override
    public String activate(Long id) {
        Optional<User> user = userRepository.findById(id);
        if(user.isEmpty()) return "No user with this id exists";

        if(user.get().isActivated()) return "Account already activated!";

        user.get().setActivated(true);
        userRepository.save(user.get());

        return String.format("Hello %s, Welcome to the isa-blood-bank portal, your account has been successfully activated and you will be redirected to the login screen soon", user.get().getName());
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


    /** TODO: Fix role retrieval */
    public List<UserCreateDTO> getAllUnemployedAdmins() {
        List<User> users = userRepository.findAll();
        List<UserCreateDTO> centerAdmins = new ArrayList<>();
        for (User user: users) {
            if (!(user.getRole().equals("ADMIN_CENTER")))
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

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findOneByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException(String.format("No user found with email '%s'.", username));
        } else {
            return user;
        }
    }
}
