package com.example.isabloodbank.repository;

import com.example.isabloodbank.model.Donator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IDonatorRepository extends JpaRepository<Donator,Long> {

    public Optional<Donator> findOneByUserId(Long id);
}
