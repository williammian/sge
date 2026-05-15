package com.sge.dto;

import com.sge.model.enums.Perfil;
import jakarta.validation.constraints.Email;

public record UsuarioUpdateRequest(
    String nome,
    @Email String email,
    String senha,
    Perfil perfil
) {}
