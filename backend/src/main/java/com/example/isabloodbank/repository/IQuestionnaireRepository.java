package com.example.isabloodbank.repository;

import com.example.isabloodbank.model.Questionnaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IQuestionnaireRepository extends JpaRepository<Questionnaire, Long> {

    public Questionnaire findByUserEmail(String email);
}
