package com.example.isabloodbank.repository;

import com.example.isabloodbank.model.Center;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICenterRepository extends JpaRepository<Center, Long> {
}
