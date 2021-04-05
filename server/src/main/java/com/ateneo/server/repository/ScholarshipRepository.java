package com.ateneo.server.repository;

import com.ateneo.server.domain.Scholarship;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScholarshipRepository extends JpaRepository<Scholarship, Long> {
    List<Scholarship> findAllByOrderByIdAsc();
    List<Scholarship> findAllByOrderByIdDesc();

    List<Scholarship> findAllByForeignDonationId(Long foreignDonationId);
}
