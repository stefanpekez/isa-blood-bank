package com.example.isabloodbank.repository;

import com.example.isabloodbank.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {
    public User findOneByEmail(String email);

    Optional<User> findUserByEmail(String email);
}
