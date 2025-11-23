package com.mstramite.repository;

import com.mstramite.entity.Tramite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TramiteRepository extends JpaRepository<Tramite, Long> {
    Optional<Tramite> findByNumeroExpediente(String numeroExpediente);
}