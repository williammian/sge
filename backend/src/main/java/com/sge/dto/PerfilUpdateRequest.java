package com.sge.dto;

import jakarta.validation.constraints.Email;

public record PerfilUpdateRequest(
    String nome,
    @Email String email
) {}
