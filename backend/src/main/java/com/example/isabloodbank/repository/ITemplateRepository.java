package com.example.isabloodbank.repository;

import com.example.isabloodbank.model.Templates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITemplateRepository extends JpaRepository<Templates, Long> {
}
