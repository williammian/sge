package com.sge.service;

import com.sge.config.JwtService;
import com.sge.dto.LoginRequest;
import com.sge.model.User;
import com.sge.model.enums.Perfil;
import com.sge.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthService authService;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setNome("Admin");
        user.setEmail("admin@sge.com.br");
        user.setSenha("encoded");
        user.setPerfil(Perfil.ADMIN);
        user.setAtivo(true);
    }

    @Test
    void login_quandoCredenciaisValidas_deveRetornarToken() {
        var request = new LoginRequest("admin@sge.com.br", "admin123");
        when(userRepository.findByEmail("admin@sge.com.br")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("admin123", "encoded")).thenReturn(true);
        when(jwtService.generateToken(user)).thenReturn("token.jwt.aqui");
        when(jwtService.getExpiration()).thenReturn(86400L);

        var response = authService.login(request);

        assertEquals("token.jwt.aqui", response.token());
        assertEquals("Bearer", response.tipo());
        assertEquals(86400L, response.expiraEm());
        assertEquals("Admin", response.usuario().nome());
    }

    @Test
    void login_quandoEmailInvalido_deveLancarExcecao() {
        var request = new LoginRequest("inexistente@test.com", "senha");
        when(userRepository.findByEmail("inexistente@test.com")).thenReturn(Optional.empty());

        var ex = assertThrows(BadCredentialsException.class, () -> authService.login(request));
        assertEquals("Email ou senha inválidos", ex.getMessage());
    }

    @Test
    void login_quandoUsuarioInativo_deveLancarExcecao() {
        user.setAtivo(false);
        var request = new LoginRequest("admin@sge.com.br", "admin123");
        when(userRepository.findByEmail("admin@sge.com.br")).thenReturn(Optional.of(user));

        var ex = assertThrows(BadCredentialsException.class, () -> authService.login(request));
        assertEquals("Usuário desativado. Contate o administrador.", ex.getMessage());
    }

    @Test
    void login_quandoSenhaInvalida_deveLancarExcecao() {
        var request = new LoginRequest("admin@sge.com.br", "senhaerrada");
        when(userRepository.findByEmail("admin@sge.com.br")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("senhaerrada", "encoded")).thenReturn(false);

        var ex = assertThrows(BadCredentialsException.class, () -> authService.login(request));
        assertEquals("Email ou senha inválidos", ex.getMessage());
    }
}
