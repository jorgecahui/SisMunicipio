package com.msauth.dto;

import com.msauth.entity.Role;
import lombok.Data;

import java.util.List;

@Data
public class AuthUserRegisterDto {
    private String userName;
    private String password;
    private PersonaDTO persona;
    private List<Role> roles;

}
