package com.sge.controller;

import com.sge.dto.PerfilUpdateRequest;
import com.sge.dto.SenhaUpdateRequest;
import com.sge.dto.UsuarioResponse;
import com.sge.model.User;
import com.sge.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class PerfilController {

    private final UserService userService;

    public PerfilController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UsuarioResponse> me(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(UsuarioResponse.fromEntity(user));
    }

    @PutMapping("/me")
    public ResponseEntity<UsuarioResponse> atualizarPerfil(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody PerfilUpdateRequest request) {
        var dto = new com.sge.dto.UsuarioUpdateRequest(
            request.nome(), request.email(), null, null);
        return ResponseEntity.ok(userService.atualizar(user.getId(), dto));
    }

    @PutMapping("/me/senha")
    public ResponseEntity<Void> alterarSenha(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody SenhaUpdateRequest request) {
        userService.alterarSenha(user.getId(), request.senhaAtual(), request.novaSenha());
        return ResponseEntity.noContent().build();
    }
}
