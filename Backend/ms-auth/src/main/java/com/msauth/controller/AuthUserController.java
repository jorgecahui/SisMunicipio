package com.msauth.controller;

import com.msauth.dto.AuthResponse;
import com.msauth.dto.AuthUserDto;
import com.msauth.dto.AuthUserRegisterDto;
import com.msauth.entity.AuthUser;
import com.msauth.entity.TokenDto;
import com.msauth.service.AuthUserService;
import com.msauth.service.impl.AuthUserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthUserController {
    @Autowired
    AuthUserService authUserService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthUserDto authUserDto) {
        try {
            AuthResponse response = ((AuthUserServiceImpl) authUserService).loginWithUserInfo(authUserDto);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/validate")
    public ResponseEntity<TokenDto> validate(@RequestParam String token) {
        TokenDto tokenDto = authUserService.validate(token);
        if (tokenDto == null)
            return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(tokenDto);
    }

    @PostMapping("/create")
    public ResponseEntity<AuthUser> save(@RequestBody AuthUserRegisterDto authUserRegisterDto) {;
        return ResponseEntity.ok(authUserService.save(authUserRegisterDto));
    }
}
