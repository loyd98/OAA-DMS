package com.ateneo.server.repository;

import com.ateneo.server.domain.Donation;
import com.ateneo.server.domain.Donor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface DonationRepository extends JpaRepository<Donation, Long> {
    List<Donation> findAllByOrderByIdAsc();
    List<Donation> findAllByOrderByIdDesc();

    @Query(value = "SELECT * FROM donation WHERE donation.id LIKE %?1% OR donor_id LIKE %?1% OR account_number LIKE %?1% OR account_name LIKE %?1% OR scholarship_id LIKE %?1% OR or_number LIKE %?1%", nativeQuery = true)
    List<Donation> search(String keyword);
}
