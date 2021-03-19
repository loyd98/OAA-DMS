package com.ateneo.server.repository;

import com.ateneo.server.domain.Donation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface DonationRepository extends JpaRepository<Donation, Long> {
    List<Donation> findAllByOrderByIdAsc();
    List<Donation> findAllByOrderByIdDesc();
}
