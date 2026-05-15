package com.sge.dto;

import com.sge.model.User;

public record LoginResponse(
    String token,
    String tipo,
    long expiraEm,
    UsuarioSimples usuario
) {
    public static LoginResponse of(String token, long expiration, User user) {
        return new LoginResponse(
            token,
            "Bearer",
            expiration,
            new UsuarioSimples(user.getId(), user.getNome(), user.getEmail(), user.getPerfil().name())
        );
    }

    public record UsuarioSimples(
        Long id,
        String nome,
        String email,
        String perfil
    ) {}
}
