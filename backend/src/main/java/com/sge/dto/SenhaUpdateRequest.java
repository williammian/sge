package com.sge.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SenhaUpdateRequest(
    @NotBlank String senhaAtual,
    @NotBlank @Size(min = 8) String novaSenha
) {}
