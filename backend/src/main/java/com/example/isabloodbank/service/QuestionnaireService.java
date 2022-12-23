package com.example.isabloodbank.service;

import com.example.isabloodbank.dto.QuestionnaireDTO;
import com.example.isabloodbank.model.Appointment;
import com.example.isabloodbank.model.Questionnaire;
import com.example.isabloodbank.model.Templates;
import com.example.isabloodbank.repository.IAppointmentRepository;
import com.example.isabloodbank.repository.IQuestionnaireRepository;
import com.example.isabloodbank.repository.ITemplateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QuestionnaireService {
    @Autowired
    IQuestionnaireRepository questionnaireRepository;

    @Autowired
    ITemplateRepository templateRepository;

    @Autowired
    IAppointmentRepository appointmentRepository;

    public QuestionnaireDTO getByUser(String userEmail) {
        QuestionnaireDTO dto = new QuestionnaireDTO();
        Questionnaire questionnaire = questionnaireRepository.findByUserEmail(userEmail);

        if(questionnaire == null) {
            dto.setTemplate(templateRepository.findById(1L).get());
        }

        dto.setFilledQuestionnaire(questionnaire);

        return dto;
    }

    public boolean isUserEligible(Questionnaire questionnaire) {
        String parsedQuestionnaire[] = questionnaire.getAnswers().split(";");

        for (String question : parsedQuestionnaire) {
            if(question.startsWith("13")) {
                String answer = question.split("-")[1];
                if(answer.equals("NE"))
                    return true;

                return false;
            }
        }

        return false;
    }

    public Questionnaire save(Questionnaire questionnaire) {
        return questionnaireRepository.save(questionnaire);
    }

    public boolean isQuestionnaireValidByAppointment(Long id) {
        Optional<Appointment> appointment = appointmentRepository.findById(id);
        if (appointment.isEmpty()) {
            return false;
        }

        Questionnaire questionnaire = questionnaireRepository.findByUserId(appointment.get().getDonator().getId());
        String parsedQuestionnaire[] = questionnaire.getAnswers().split(";");

        Integer counter = 1;
        for (String question : parsedQuestionnaire) {
            if(counter > 13 && question.startsWith(counter.toString())) {
                String answer = question.split("-")[1];
                if(answer.equals("DA"))
                    return false;

                return true;
            }
            ++counter;
        }

        return false;
    }
}
