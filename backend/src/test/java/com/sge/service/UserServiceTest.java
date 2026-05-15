package com.sge.service;

import com.sge.dto.*;
import com.sge.model.User;
import com.sge.model.enums.Perfil;
import com.sge.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository repository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

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
    void listar_deveRetornarPagina() {
        PageRequest pageable = PageRequest.of(0, 20);
        Page<User> page = new PageImpl<>(List.of(user));
        when(repository.findAllByOrderByNomeAsc(pageable)).thenReturn(page);

        Page<UsuarioResponse> result = userService.listar(pageable);

        assertEquals(1, result.getContent().size());
        assertEquals("Admin", result.getContent().getFirst().nome());
        verify(repository).findAllByOrderByNomeAsc(pageable);
    }

    @Test
    void buscarPorId_quandoExiste_deveRetornarUsuario() {
        when(repository.findById(1L)).thenReturn(Optional.of(user));

        UsuarioResponse result = userService.buscarPorId(1L);

        assertEquals("Admin", result.nome());
        verify(repository).findById(1L);
    }

    @Test
    void buscarPorId_quandoNaoExiste_deveLancarExcecao() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> userService.buscarPorId(99L));
    }

    @Test
    void criar_deveSalvarERetornarUsuario() {
        var request = new UsuarioRequest("Novo", "novo@test.com", "12345678", Perfil.VENDEDOR);
        when(repository.existsByEmail("novo@test.com")).thenReturn(false);
        when(passwordEncoder.encode("12345678")).thenReturn("encoded");
        when(repository.save(any())).thenAnswer(invocation -> {
            User u = invocation.getArgument(0);
            u.setId(2L);
            return u;
        });

        UsuarioResponse result = userService.criar(request);

        assertEquals("Novo", result.nome());
        assertEquals("novo@test.com", result.email());
        assertEquals(Perfil.VENDEDOR, result.perfil());
        verify(repository).existsByEmail("novo@test.com");
        verify(passwordEncoder).encode("12345678");
        verify(repository).save(any());
    }

    @Test
    void criar_quandoEmailDuplicado_deveLancarExcecao() {
        var request = new UsuarioRequest("Admin", "admin@sge.com.br", "12345678", Perfil.ADMIN);
        when(repository.existsByEmail("admin@sge.com.br")).thenReturn(true);

        assertThrows(IllegalArgumentException.class, () -> userService.criar(request));
        verify(repository, never()).save(any());
    }

    @Test
    void alterarStatus_deveAtivarOuDesativar() {
        when(repository.findById(1L)).thenReturn(Optional.of(user));
        when(repository.save(user)).thenReturn(user);

        userService.alterarStatus(1L, new UsuarioStatusRequest(false));

        assertFalse(user.getAtivo());
        verify(repository).save(user);
    }

    @Test
    void alterarSenha_quandoSenhaAtualCorreta_deveAlterar() {
        when(repository.findById(1L)).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("senhaAtual", "encoded")).thenReturn(true);
        when(passwordEncoder.encode("novaSenha")).thenReturn("newEncoded");
        when(repository.save(user)).thenReturn(user);

        userService.alterarSenha(1L, "senhaAtual", "novaSenha");

        assertEquals("newEncoded", user.getSenha());
        verify(repository).save(user);
    }

    @Test
    void alterarSenha_quandoSenhaAtualIncorreta_deveLancarExcecao() {
        when(repository.findById(1L)).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("errada", "encoded")).thenReturn(false);

        assertThrows(IllegalArgumentException.class, () -> userService.alterarSenha(1L, "errada", "novaSenha"));
        verify(repository, never()).save(any());
    }
}
