package com.msauth.service;

import com.msauth.dto.AuthUserDto;
import com.msauth.entity.AuthUser;
import com.msauth.entity.TokenDto;

public interface AuthUserService {
    public AuthUser save(AuthUserDto authUserDto);


    public TokenDto login(AuthUserDto authUserDto);


    public TokenDto validate(String token);
}