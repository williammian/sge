package com.sge.service;

import com.sge.config.JwtService;
import com.sge.dto.LoginRequest;
import com.sge.dto.LoginResponse;
import com.sge.model.User;
import com.sge.repository.UserRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {
        var user = userRepository.findByEmail(request.email())
            .orElseThrow(() -> new BadCredentialsException("Email ou senha inválidos"));

        if (!user.getAtivo()) {
            throw new BadCredentialsException("Usuário desativado. Contate o administrador.");
        }

        if (!passwordEncoder.matches(request.senha(), user.getSenha())) {
            throw new BadCredentialsException("Email ou senha inválidos");
        }

        var token = jwtService.generateToken(user);
        return LoginResponse.of(token, jwtService.getExpiration(), user);
    }
}
