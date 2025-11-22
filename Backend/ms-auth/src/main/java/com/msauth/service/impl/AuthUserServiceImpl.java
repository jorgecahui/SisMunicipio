package com.msauth.service.impl;

import com.msauth.dto.AuthUserDto;
import com.msauth.entity.AuthUser;
import com.msauth.entity.TokenDto;
import com.msauth.repository.AuthUserRepository;
import com.msauth.security.JwtProvider;
import com.msauth.service.AuthUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



@Service
public class AuthUserServiceImpl implements AuthUserService {
    @Autowired
    AuthUserRepository authUserRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JwtProvider jwtProvider;

    @Override
    public AuthUser save(AuthUserDto dto) {
        if (authUserRepository.findByUserName(dto.getUserName()).isPresent()) {
            throw new RuntimeException("El nombre de usuario ya está registrado.");
        }
        if (dto.getPassword() == null || dto.getPassword().isBlank()) {
            throw new RuntimeException("La contraseña no puede estar vacía.");
        }
        AuthUser newUser = AuthUser.builder()
                .userName(dto.getUserName())         // el usuario lo elige
                .password(passwordEncoder.encode(dto.getPassword()))
                .build();

        return authUserRepository.save(newUser);
    }

    @Override
    public TokenDto login(AuthUserDto dto) {

        AuthUser user = authUserRepository.findByUserName(dto.getUserName())
                .orElseThrow(() -> new RuntimeException("Usuario o contraseña incorrectos."));
        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Usuario o contraseña incorrectos.");
        }
        String token = jwtProvider.createToken(user);

        return new TokenDto(token);
    }
    @Override
    public TokenDto validate(String token) {

        if (!jwtProvider.validate(token)) {
            throw new RuntimeException("Token inválido.");
        }

        String username = jwtProvider.getUserNameFromToken(token);

        // Validar que el usuario exista en BD
        authUserRepository.findByUserName(username)
                .orElseThrow(() -> new RuntimeException("Token inválido: usuario no encontrado."));

        return new TokenDto(token);
    }
}
