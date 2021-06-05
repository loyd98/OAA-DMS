package com.ateneo.server.repository;

import com.ateneo.server.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    public User findByUsername(String username);
    public List<User> findAllByOrderByIdAsc();
}
