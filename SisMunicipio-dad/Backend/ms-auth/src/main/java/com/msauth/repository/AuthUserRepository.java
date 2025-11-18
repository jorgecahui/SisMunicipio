package com.msauth.repository;

import com.msauth.entity.AuthUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthUserRepository extends JpaRepository<AuthUser,Integer> {
    boolean existsByUserName(String userName);
    Optional<AuthUser> findByUserName(String userName);
}