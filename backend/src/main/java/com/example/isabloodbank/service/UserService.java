package com.example.isabloodbank.service;

import com.example.isabloodbank.dto.UserCreateDTO;
import com.example.isabloodbank.dto.UserDTO;
import com.example.isabloodbank.mapper.UserMapper;
import com.example.isabloodbank.model.Appointment;
import com.example.isabloodbank.model.Role;
import com.example.isabloodbank.model.User;
import com.example.isabloodbank.model.WorkCalendar;
import com.example.isabloodbank.model.enums.AppointmentStatus;
import com.example.isabloodbank.repository.IUserRepository;
import com.example.isabloodbank.repository.IWorkCalendarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
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

    @Autowired
    private IWorkCalendarRepository workCalendarRepository;

    @Override
    public User create(User user, String role) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        List<Role> roles;

        if(role == null) roles = roleService.findByName("ROLE_REGULAR");
        else roles = roleService.findByName("ROLE_"+role);

        user.setRole(roles.get(0));
        user.setActivated(false);
        if (user.getRole().getName().equals("ROLE_ADMIN_SYSTEM") || user.getRole().getName().equals("ROLE_ADMIN_CENTER")) {
            user.setActivated(true);
        }
        return userRepository.save(user);
    }

    @Override
    public String activate(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) return "No user with this id exists";

        if (user.get().isActivated()) return "Account already activated!";

        user.get().setActivated(true);
        userRepository.save(user.get());

        return String.format("Hello %s, Welcome to the isa-blood-bank portal, your account has been successfully activated and you will be redirected to the login screen soon", user.get().getName());
    }
    public UserCreateDTO create(UserCreateDTO userCreateDTO) {
        User user = userMapper.dtoToEntity(userCreateDTO);
        userRepository.save(user);
        return userCreateDTO;
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

    public void addPenalty(User donator) {
        donator.setPenalties(donator.getPenalties() + 1);
        userRepository.save(donator);
    }
    public UserCreateDTO updatePassword(UserCreateDTO userCreateDTO) {
        User user = userRepository.findById(userCreateDTO.getId()).get();
        user.setLastPasswordResetDate(Timestamp.valueOf(userCreateDTO.getLastPasswordResetDate()));
        user.setPassword(passwordEncoder.encode(userCreateDTO.getPassword()));
        return userMapper.entityToDto(userRepository.save(user));
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public List<UserDTO> getAllDonators(Long centerId) {
        WorkCalendar workCalendar = workCalendarRepository.findWorkCalendarByCenter_Id(centerId);
        List<Appointment> appointments = workCalendar.getScheduledAppointments();
        List <UserDTO> userDTOS = new ArrayList<>();
        if (appointments.isEmpty()) {
            return null;
        }
        for (Appointment a : appointments) {
            if (a.getStatus() == null || a.getStatus() != AppointmentStatus.FINISHED) {
                continue;
            }
            if (a.getStatus().equals(AppointmentStatus.FINISHED)) {
                boolean found = false;
                for (UserDTO u : userDTOS) {
                    if (Objects.equals(u.getId(), a.getDonator().getId())) {
                        found = true;
                    }
                }
                if (!found) {
                    User user = a.getDonator();
                    userDTOS.add(new UserDTO(user.getId(), user.getName(), user.getSurname(), a.getScheduledTime()));
                }
            }
        }
        return userDTOS;
    }
}
