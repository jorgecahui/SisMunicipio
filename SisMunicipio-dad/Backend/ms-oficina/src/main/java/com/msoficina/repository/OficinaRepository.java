package com.msoficina.repository;

import com.msoficina.entity.Oficina;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OficinaRepository extends JpaRepository<Oficina, Long> {
    Optional<Oficina> findByCodigo(String codigo);
}
