package com.msauth.service.impl;

import com.msauth.dto.AuthResponse;
import com.msauth.dto.AuthUserDto;
import com.msauth.dto.AuthUserRegisterDto;
import com.msauth.dto.PersonaDTO;
import com.msauth.entity.AuthUser;
import com.msauth.entity.Role;
import com.msauth.entity.TokenDto;
import com.msauth.fegin.PersonaClient;
import com.msauth.repository.AuthUserRepository;
import com.msauth.security.JwtProvider;
import com.msauth.service.AuthUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class AuthUserServiceImpl implements AuthUserService {
    @Autowired
    AuthUserRepository authUserRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JwtProvider jwtProvider;

    @Autowired
    PersonaClient personaClient;

    @Override
    public AuthUser save(AuthUserRegisterDto dto) {
        // 1. Validaciones de username y password (las tuyas)
        if (authUserRepository.findByUserName(dto.getUserName()).isPresent()) {
            throw new RuntimeException("El nombre de usuario ya está registrado.");
        }
        if (dto.getPassword() == null || dto.getPassword().isBlank()) {
            throw new RuntimeException("La contraseña no puede estar vacía.");
        }

        // 2. Crear persona con los datos recibidos
        PersonaDTO personaRequest = new PersonaDTO();
                personaRequest.setId(null);
                personaRequest.setNombres(dto.getPersona().getNombres());
                personaRequest.setApellidos(dto.getPersona().getApellidos());
                personaRequest.setDni(dto.getPersona().getDni());
                personaRequest.setCorreo(dto.getPersona().getCorreo());
                personaRequest.setTelefono(dto.getPersona().getTelefono());

        // 4. Guardar persona en ms-persona mediante Feign
        PersonaDTO personaResponse = personaClient.create(personaRequest);

        if (personaResponse == null || personaResponse.getId() == null) {
            throw new RuntimeException("Error al registrar la persona en ms-persona.");
        }

        // 5. Crear usuario en ms-auth referenciando personaId
        AuthUser newUser = AuthUser.builder()
                .userName(dto.getUserName())
                .password(passwordEncoder.encode(dto.getPassword()))
                .personaId(personaResponse.getId())
                .roles(List.of(Role.ROLE_USER))   // FK hacia persona creada
                .build();

        // 6. Guardar usuario final
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
    public AuthResponse loginWithUserInfo(AuthUserDto dto) {
        AuthUser user = authUserRepository.findByUserName(dto.getUserName())
                .orElseThrow(() -> new RuntimeException("Usuario o contraseña incorrectos."));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Usuario o contraseña incorrectos.");
        }

        String token = jwtProvider.createToken(user);

        return AuthResponse.builder()
                .token(token)
                .userName(user.getUserName())
                .personaId(user.getPersonaId())
                .roles(user.getRoles())
                .build();
    }
}
