package com.sge.controller;

import com.sge.dto.LoginRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class UsuarioControllerIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    private String adminToken;

    @BeforeEach
    void setUp() {
        var login = new LoginRequest("admin@sge.com.br", "admin123");
        ResponseEntity<Map> response = restTemplate.postForEntity("/api/auth/login", login, Map.class);
        adminToken = "Bearer " + response.getBody().get("token");
    }

    @Test
    void listarUsuarios_semToken_deveRetornar401() {
        ResponseEntity<Map> response = restTemplate.getForEntity("/api/usuarios?page=0&size=20", Map.class);
        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
    }

    @Test
    void listarUsuarios_comTokenAdmin_deveRetornar200() {
        var headers = new HttpHeaders();
        headers.setBearerAuth(adminToken.replace("Bearer ", ""));
        var entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(
            "/api/usuarios?page=0&size=20", HttpMethod.GET, entity, Map.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody().get("content"));
    }

    @Test
    void criarUsuario_comTokenAdmin_deveRetornar201() {
        var headers = new HttpHeaders();
        headers.setBearerAuth(adminToken.replace("Bearer ", ""));
        headers.setContentType(MediaType.APPLICATION_JSON);
        var body = Map.of(
            "nome", "Teste",
            "email", "teste@teste.com",
            "senha", "12345678",
            "perfil", "VENDEDOR"
        );
        var entity = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
            "/api/usuarios", HttpMethod.POST, entity, Map.class);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("Teste", response.getBody().get("nome"));
    }
}
