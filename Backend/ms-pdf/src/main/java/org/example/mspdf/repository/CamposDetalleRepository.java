package org.example.mspdf.repository;

import org.example.mspdf.entity.CamposDetalle;
import org.example.mspdf.entity.CamposExtraidos;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CamposDetalleRepository extends JpaRepository<CamposDetalle, Long> {
    List<CamposDetalle> findByCamposExtraidos(CamposExtraidos camposExtraidos);
}
