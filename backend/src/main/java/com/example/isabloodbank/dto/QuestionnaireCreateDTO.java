package com.example.isabloodbank.dto;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionnaireCreateDTO {
    @NotNull
    private String userEmail;
    private String answers;

}
