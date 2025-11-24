package org.example.mspdf.repository;


import org.example.mspdf.entity.DocumentoPDF;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface DocumentoPDFRepository extends JpaRepository<DocumentoPDF, Long> {
    @Transactional(readOnly = true)
    @Query("SELECT d FROM DocumentoPDF d WHERE d.id = :id")
    Optional<DocumentoPDF> findByIdWithContent(@Param("id") Long id);

    @Transactional(readOnly = true)
    @Query("SELECT d.id, d.nombre FROM DocumentoPDF d")
    List<Object[]> findAllWithoutContent();
}
