package com.ateneo.server.repository;

import com.ateneo.server.domain.Donation;
import com.ateneo.server.domain.Donor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DonorRepository extends JpaRepository<Donor, Long> {
    Donor findByAccountName(String accountName);
    List<Donor> findAllByOrderByIdAsc();
    List<Donor> findAllByOrderByIdDesc();
    List<Donor> findAllByOrderByAccountNameAsc();
    List<Donor> findAllByOrderByAccountNameDesc();
    List<Donor> findAllByOrderByDonorNameAsc();
    List<Donor> findAllByOrderByDonorNameDesc();

    @Query(value = "SELECT * FROM donor WHERE donor.id LIKE %?1% OR donor_name LIKE %?1% OR account_number LIKE %?1% OR account_name LIKE %?1% OR email_address LIKE %?1%", nativeQuery = true)
    List<Donor> search(String keyword);
}
