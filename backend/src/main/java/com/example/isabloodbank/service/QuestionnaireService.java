package com.example.isabloodbank.service;

import com.example.isabloodbank.dto.QuestionnaireDTO;
import com.example.isabloodbank.model.Questionnaire;
import com.example.isabloodbank.model.Templates;
import com.example.isabloodbank.repository.IQuestionnaireRepository;
import com.example.isabloodbank.repository.ITemplateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionnaireService {
    @Autowired
    IQuestionnaireRepository questionnaireRepository;

    @Autowired
    ITemplateRepository templateRepository;

    public QuestionnaireDTO getByUser(String userEmail) {
        QuestionnaireDTO dto = new QuestionnaireDTO();
        Questionnaire questionnaire = questionnaireRepository.findByUserEmail(userEmail);

        if(questionnaire == null) {
            dto.setTemplate(templateRepository.findById(1L).get());
        }

        dto.setFilledQuestionnaire(questionnaire);

        return dto;
    }

    public Questionnaire save(Questionnaire questionnaire) {
        return questionnaireRepository.save(questionnaire);
    }
}
