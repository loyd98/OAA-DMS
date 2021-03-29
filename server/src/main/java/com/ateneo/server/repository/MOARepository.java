package com.ateneo.server.repository;

import com.ateneo.server.domain.MOA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MOARepository extends JpaRepository<MOA, Long> {
    List<MOA> findAllByOrderByIdAsc();
    List<MOA> findAllByOrderByIdDesc();
}
