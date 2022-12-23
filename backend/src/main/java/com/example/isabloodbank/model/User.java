package com.example.isabloodbank.model;

import com.example.isabloodbank.dto.UserCreateDTO;
import com.example.isabloodbank.mapper.AddressMapper;
import com.example.isabloodbank.model.enums.Gender;
import com.example.isabloodbank.model.Role;
import com.example.isabloodbank.model.enums.WorkStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name = "user_table")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String email;
    @Column
    private String password;
    @Column
    private String name;
    @Column
    private String surname;
    @OneToOne(cascade = CascadeType.ALL)
    private Address address;
    @Column
    private String upin;
    @Column
    private Gender gender;
    @Column
    private String phoneNumber;
    @Column
    private String occupation;
    @Column
    private WorkStatus workStatus;
    @ManyToOne(cascade = CascadeType.ALL)
    private Role role;
    @Column
    private Long centerId;
    @Column(name = "last_password_reset_date")
    private Timestamp lastPasswordResetDate;
    @Column(columnDefinition = "boolean default false")
    private boolean activated;

    @Column(columnDefinition = "integer default 0")
    private Integer penalties;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<com.example.isabloodbank.model.Role> roles = new ArrayList<>();
        roles.add(this.role);
        return roles;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return activated;
    }
}
