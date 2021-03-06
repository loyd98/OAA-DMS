package com.ateneo.server.repository;

import com.ateneo.server.domain.Donor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DonorRepository extends JpaRepository<Donor, Long> {
    Donor findByAccountName(String accountName);
    List<Donor> findAllByOrderByIdAsc();
    List<Donor> findAllByOrderByAccountNameAsc();
    List<Donor> findAllByOOrderByAccountNameDesc(); // Todo
}
