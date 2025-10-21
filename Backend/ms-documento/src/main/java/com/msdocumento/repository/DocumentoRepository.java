package com.msdocumento.repository;

import com.msdocumento.entity.Documento;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DocumentoRepository extends MongoRepository<Documento, String> {
}