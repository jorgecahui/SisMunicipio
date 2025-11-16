package com.msnotificacion.repository;

import com.msnotificacion.entity.Notificacion;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NotificacionRepository extends MongoRepository<Notificacion, String> {
}
