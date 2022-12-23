package com.example.isabloodbank.controller;

import com.example.isabloodbank.dto.QuestionnaireCreateDTO;
import com.example.isabloodbank.dto.QuestionnaireDTO;
import com.example.isabloodbank.model.Questionnaire;
import com.example.isabloodbank.service.QuestionnaireService;
import com.example.isabloodbank.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.print.attribute.standard.Media;

@RestController
@RequestMapping(value = "/questionnaires")
public class QuestionnaireController {

    @Autowired
    QuestionnaireService questionnaireService;

    @Autowired
    UserService userService;

    @PreAuthorize("hasRole('REGULAR')")
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE, value = "/{email}")
    public ResponseEntity<QuestionnaireDTO> getByUser(@PathVariable String email) {
        QuestionnaireDTO dto = questionnaireService.getByUser(email);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('REGULAR')")
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Questionnaire> create(@RequestBody QuestionnaireCreateDTO questionnaire) {
        Questionnaire newQestionnaire = new Questionnaire();
        newQestionnaire.setUser(userService.findByEmail(questionnaire.getUserEmail()));
        newQestionnaire.setAnswers(questionnaire.getAnswers().replace("\n", ""));

        Questionnaire oldQuestionnaire = questionnaireService.getByUser(questionnaire.getUserEmail()).getFilledQuestionnaire();
        if(oldQuestionnaire != null) {
            newQestionnaire.setId(oldQuestionnaire.getId());
        }

        return new ResponseEntity<>(questionnaireService.save(newQestionnaire), HttpStatus.CREATED);
    }

    @CrossOrigin
    @GetMapping("/valid/{id}")
    public boolean isQuestionnaireValidByAppointment(@PathVariable("id") Long id) {
        return questionnaireService.isQuestionnaireValidByAppointment(id);
    }
}
