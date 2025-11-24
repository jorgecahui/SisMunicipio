package com.msauth.entity;

public enum  Role {
    ROLE_ADMIN,      // Puede ver todos los documentos
    ROLE_USER,       // Solo ve sus documentos
    ROLE_SUPERVISOR, // Ve documentos de su área
    ROLE_GUEST
}
