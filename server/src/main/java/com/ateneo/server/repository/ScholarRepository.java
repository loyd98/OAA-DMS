package com.ateneo.server.repository;

import com.ateneo.server.domain.Scholar;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScholarRepository extends JpaRepository<Scholar, Long> {
    List<Scholar> findAllByOrderByIdAsc();
    List<Scholar> findAllByOrderByIdDesc();
}
