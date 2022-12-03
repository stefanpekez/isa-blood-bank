package com.example.isabloodbank.service;

import com.example.isabloodbank.model.Role;
import com.example.isabloodbank.repository.IRoleRepository;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {
    @Autowired
    private IRoleRepository roleRepository;
    public List<Role> findByName(String name) {
        List<Role> roles = this.roleRepository.findByName(name);
        return roles;
    }
}
