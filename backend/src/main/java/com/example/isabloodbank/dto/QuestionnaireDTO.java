package com.example.isabloodbank.dto;

import com.example.isabloodbank.model.Questionnaire;
import com.example.isabloodbank.model.Templates;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionnaireDTO {
    private Questionnaire filledQuestionnaire;
    private Templates template;
}
