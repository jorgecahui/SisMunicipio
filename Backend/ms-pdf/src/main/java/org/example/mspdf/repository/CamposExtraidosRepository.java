package org.example.mspdf.repository;

import org.example.mspdf.entity.CamposExtraidos;
import org.example.mspdf.entity.DocumentoPDF;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CamposExtraidosRepository extends JpaRepository <CamposExtraidos,Long>{
    Optional<CamposExtraidos> findByDocumentoPDF(DocumentoPDF documentoPDF);
    @Query("SELECT c FROM CamposExtraidos c")
    List<CamposExtraidos> findAllWithDocumento();
    List<CamposExtraidos> findByPersonaId(Long personaId);

}
