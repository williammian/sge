package com.sge.dto;

import com.sge.model.User;
import com.sge.model.enums.Perfil;
import java.time.LocalDateTime;

public record UsuarioResponse(
    Long id,
    String nome,
    String email,
    Perfil perfil,
    boolean ativo,
    LocalDateTime createdAt
) {
    public static UsuarioResponse fromEntity(User user) {
        return new UsuarioResponse(
            user.getId(),
            user.getNome(),
            user.getEmail(),
            user.getPerfil(),
            user.getAtivo(),
            user.getCreatedAt()
        );
    }
}
