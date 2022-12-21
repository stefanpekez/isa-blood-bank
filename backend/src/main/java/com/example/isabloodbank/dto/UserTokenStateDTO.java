package com.example.isabloodbank.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserTokenStateDTO {
    private String accessToken;
    private Long expiresIn;
    private String role;
    private Long centerId;
    private Long id;
}
