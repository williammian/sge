package com.sge.config;

import com.sge.model.User;
import com.sge.model.enums.Perfil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class JwtServiceTest {

    private JwtService jwtService;

    @BeforeEach
    void setUp() {
        jwtService = new JwtService("0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef", 86400L);
    }

    @Test
    void generateToken_e_isValid_devemFuncionar() {
        var user = new User();
        user.setId(1L);
        user.setEmail("admin@sge.com.br");
        user.setPerfil(Perfil.ADMIN);

        var token = jwtService.generateToken(user);

        assertNotNull(token);
        assertTrue(jwtService.isValid(token));
        assertEquals("1", jwtService.extractUserId(token));
    }

    @Test
    void isValid_quandoTokenInvalido_deveRetornarFalse() {
        assertFalse(jwtService.isValid("token.invalido.aqui"));
    }

    @Test
    void isValid_quandoTokenVazio_deveRetornarFalse() {
        assertFalse(jwtService.isValid(""));
    }

    @Test
    void getExpiration_deveRetornarValorConfigurado() {
        assertEquals(86400L, jwtService.getExpiration());
    }
}
