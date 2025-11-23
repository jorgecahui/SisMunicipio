package com.msauth.dto;

import lombok.Data;

@Data
public class AuthUserRegisterDto {
    private String userName;
    private String password;
    private PersonaDTO persona;
}
