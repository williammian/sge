package com.sge.service;

import com.sge.dto.*;
import com.sge.model.User;
import com.sge.model.enums.Perfil;
import com.sge.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public Page<UsuarioResponse> listar(Pageable pageable) {
        return repository.findAllByOrderByNomeAsc(pageable)
            .map(UsuarioResponse::fromEntity);
    }

    public UsuarioResponse buscarPorId(Long id) {
        return repository.findById(id)
            .map(UsuarioResponse::fromEntity)
            .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
    }

    @Transactional
    public UsuarioResponse criar(UsuarioRequest request) {
        if (repository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("Email já cadastrado");
        }

        var user = new User();
        user.setNome(request.nome());
        user.setEmail(request.email());
        user.setSenha(passwordEncoder.encode(request.senha()));
        user.setPerfil(request.perfil());
        user.setAtivo(true);

        return UsuarioResponse.fromEntity(repository.save(user));
    }

    @Transactional
    public UsuarioResponse atualizar(Long id, UsuarioUpdateRequest request) {
        var user = repository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

        if (request.nome() != null) {
            user.setNome(request.nome());
        }
        if (request.email() != null && !request.email().equals(user.getEmail())) {
            if (repository.existsByEmail(request.email())) {
                throw new IllegalArgumentException("Email já cadastrado");
            }
            user.setEmail(request.email());
        }
        if (request.senha() != null) {
            user.setSenha(passwordEncoder.encode(request.senha()));
        }
        if (request.perfil() != null) {
            user.setPerfil(request.perfil());
        }

        return UsuarioResponse.fromEntity(repository.save(user));
    }

    @Transactional
    public UsuarioResponse alterarStatus(Long id, UsuarioStatusRequest request) {
        var user = repository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
        user.setAtivo(request.ativo());
        return UsuarioResponse.fromEntity(repository.save(user));
    }

    @Transactional
    public void alterarSenha(Long id, String senhaAtual, String novaSenha) {
        var user = repository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
        if (!passwordEncoder.matches(senhaAtual, user.getSenha())) {
            throw new IllegalArgumentException("Senha atual inválida");
        }
        user.setSenha(passwordEncoder.encode(novaSenha));
        repository.save(user);
    }

    public User buscarPorEmail(String email) {
        return repository.findByEmail(email)
            .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
    }
}
