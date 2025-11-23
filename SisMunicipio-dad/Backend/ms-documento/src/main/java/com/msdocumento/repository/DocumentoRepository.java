package com.msdocumento.repository;

import com.msdocumento.entity.Documento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentoRepository extends JpaRepository<Documento, String> {
}