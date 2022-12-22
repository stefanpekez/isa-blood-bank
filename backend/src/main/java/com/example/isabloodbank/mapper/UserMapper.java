package com.example.isabloodbank.mapper;

import com.example.isabloodbank.dto.UserCreateDTO;
import com.example.isabloodbank.model.User;
import com.example.isabloodbank.model.enums.Gender;
import com.example.isabloodbank.model.enums.WorkStatus;
import com.example.isabloodbank.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserMapper implements ObjectMapper<User, UserCreateDTO> {

    @Autowired
    private AddressMapper addressMapper;
    @Autowired
    private RoleService roleService;

    @Override
    public UserCreateDTO entityToDto(User user) {
        UserCreateDTO userCreateDTO = new UserCreateDTO();
        userCreateDTO.setId(user.getId());
        userCreateDTO.setEmail(user.getEmail());
        userCreateDTO.setPassword(user.getPassword());
        userCreateDTO.setName(user.getName());
        userCreateDTO.setSurname(user.getSurname());
        userCreateDTO.setAddress(addressMapper.entityToDto(user.getAddress()));
        userCreateDTO.setUpin(user.getUpin());
        userCreateDTO.setOccupation(user.getOccupation());
        userCreateDTO.setPhoneNumber(user.getPhoneNumber());

        if (user.getGender() == Gender.MALE)
            userCreateDTO.setGender("MALE");
        else
            userCreateDTO.setGender("FEMALE");

        if (user.getWorkStatus() == WorkStatus.WORK) {
            userCreateDTO.setWorkStatus("WORK");
        } else if (user.getWorkStatus() == WorkStatus.SCHOOL) {
            userCreateDTO.setWorkStatus("SCHOOL");
        } else {
            userCreateDTO.setWorkStatus("UNIVERSITY");
        }

//        if (user.getRole().getName().equals("ROLE_REGULAR")) {
        userCreateDTO.setRole(user.getRole().getName());
//        } else if (user.getRole().getName().equals("ROLE_ADMIN_CENTER")) {
//            userCreateDTO.setRole("ADMIN_CENTER");
//        } else {
//            userCreateDTO.setRole("ADMIN_SYSTEM");
//        }

        if (user.getLastPasswordResetDate() != null)
            userCreateDTO.setLastPasswordResetDate(user.getLastPasswordResetDate().toString());

        return userCreateDTO;
    }

    @Override
    public List<UserCreateDTO> entityToDtoList(List<User> entities) {
        return entities.stream().map(x -> entityToDto(x)).collect(Collectors.toList());
    }

    @Override
    public User dtoToEntity(UserCreateDTO userCreateDTO) {
        User user = new User();
        user.setId(userCreateDTO.getId());
        user.setEmail(userCreateDTO.getEmail());
        user.setPassword(userCreateDTO.getPassword());
        user.setName(userCreateDTO.getName());
        user.setSurname(userCreateDTO.getSurname());
        user.setAddress(addressMapper.dtoToEntity(userCreateDTO.getAddress()));
        user.setUpin(userCreateDTO.getUpin());
        if (userCreateDTO.getOccupation() != null) {
            user.setOccupation(userCreateDTO.getOccupation());
        }
        user.setPhoneNumber(userCreateDTO.getPhoneNumber());

        if (userCreateDTO.getGender().equals("MALE"))
            user.setGender(Gender.MALE);
        else
            user.setGender(Gender.FEMALE);

        if (userCreateDTO.getWorkStatus() != null) {
            if (userCreateDTO.getWorkStatus().equals("WORK")) {
                user.setWorkStatus(WorkStatus.WORK);
            } else if (userCreateDTO.getWorkStatus().equals("SCHOOL")) {
                user.setWorkStatus(WorkStatus.SCHOOL);
            } else {
                user.setWorkStatus(WorkStatus.UNIVERSITY);
            }
        }


//        if (userCreateDTO.getRole().equals("REGULAR")) {
        System.out.println("ROLE: " + roleService.findByName("ROLE_"+userCreateDTO.getRole()).get(0).getName());
//        user.setRole(roleService.findByName("ROLE_"+userCreateDTO.getRole()).get(0));
//        } else if (userCreateDTO.getRole().equals("ADMIN_CENTER")) {
//            user.setRole(roleService.findByName("ROLE_"+userCreateDTO.getRole()).get(0));
//        } else {
//            user.setRole(roleService.findByName("ROLE_"+userCreateDTO.getRole()).get(0));
//        }

        if (userCreateDTO.getLastPasswordResetDate() != null)
            user.setLastPasswordResetDate(Timestamp.valueOf(userCreateDTO.getLastPasswordResetDate()));

        return user;
    }

    public List<User> dtoListToEntityList(List<UserCreateDTO> dtos) {
        return dtos.stream().map(x -> dtoToEntity(x)).collect(Collectors.toList());
    }
}
